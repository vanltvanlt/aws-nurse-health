const tf = require("@tensorflow/tfjs-node");
const fs = require("fs");
const path = require("path");

const dataset = require("../dataset.json");
const datasetTesting = require("../dataset-testing.json");

const modelDir = path.join(__dirname, "../models");
const modelPath = path.join(modelDir, "tensorflow", "model.json");

async function trainModel() {
  console.log("training data: ");

  // Step 1: Extract unique symptoms
  const allSymptoms = [
    ...new Set(
      dataset.flatMap((item) =>
        item.symptoms.split(",").map((symptom) => symptom.trim())
      )
    ),
  ];

  console.log("allSymptoms: ", allSymptoms);

  // Step 2: Create training data as binary vectors
  const trainingData = tf.tensor2d(
    dataset.map((item) =>
      allSymptoms.map((symptom) => (item.symptoms.includes(symptom) ? 1 : 0))
    )
  );

  // Generate a list of risk levels
  const riskLevels = ["low", "medium", "high"];

  const cleanRiskLevel = (dataset) => {
    return dataset.map((item) => {
      if (item["risk level"].includes("low")) {
        item["risk level"] = "low";
      } else if (item["risk level"].includes("high")) {
        item["risk level"] = "high";
      } else {
        item["risk level"] = "medium";
      }
      return item;
    });
  };

  cleanRiskLevel(dataset);

  // Map each disease to its one-hot encoded vector
  const outputData = tf.tensor2d(
    dataset.map((item) =>
      riskLevels.map((risk) => (item["risk level"] === risk ? 1 : 0))
    )
  );

  // Build the model
  const model = tf.sequential();

  // Input layer
  model.add(
    tf.layers.dense({
      inputShape: [trainingData.shape[1]], // Number of symptoms (e.g., 289)
      units: 64,
      activation: "relu",
    })
  );

  // Hidden layers
  model.add(
    tf.layers.dense({
      units: 128,
      activation: "relu",
    })
  );

  // Output layer
  model.add(
    tf.layers.dense({
      units: outputData.shape[1], // Number of diseases (e.g., 88)
      activation: "softmax",
    })
  );

  let learning_rate = 0.06;

  // Compile the model
  model.compile({
    optimizer: tf.train.adam(learning_rate),
    loss: "categoricalCrossentropy",
    metrics: ["accuracy"],
  });

  console.log(model.summary());

  const startTime = Date.now();

  // Train the model
  await model.fit(trainingData, outputData, {
    epochs: 100, // Experiment with the number of epochs
    callbacks: {
      // Callbacks for monitoring training progress
      onEpochEnd: async (epoch, log) => {
        const elapsedTime = Date.now() - startTime;
        console.log(
          `Epoch ${epoch}: loss = ${log.loss}, elapsed time = ${elapsedTime}ms`
        );
      },
    },
  });

  // Ensure the model directory exists
  if (!fs.existsSync(modelDir)) {
    fs.mkdirSync(modelDir);
  }

  // Save the model
  await model.save(`file://${modelPath}`);
  console.log("Model saved to", modelPath);
}

async function loadModel() {
  if (fs.existsSync(modelPath)) {
    const model = await tf.loadLayersModel(`file://${modelPath}`);
    console.log("Model loaded from", modelPath);
    return model;
  } else {
    console.log("Model not found, training a new one...");
    await trainModel();
    return await tf.loadLayersModel(`file://${modelPath}`);
  }
}

exports.predictRisk = async function (req, res) {
  console.log("req.body: ", req.body);

  const providedSymptoms = req?.body?.symptoms;

  if (!providedSymptoms) {
    return res.status(400).send("Symptoms are required");
  }

  const model = await loadModel();

  // Ensure testing data is in the correct format
  const allSymptoms = [
    ...new Set(
      dataset.flatMap((item) =>
        item.symptoms.split(",").map((symptom) => symptom.trim())
      )
    ),
  ];

  console.log("allSymptoms: ", allSymptoms);

  const testingData = tf.tensor2d(
    datasetTesting.map((item) =>
      allSymptoms.map((symptom) => (item.symptoms.includes(symptom) ? 1 : 0))
    )
  );

  // Predict using test data
  const results = model.predict(testingData);

  // Process prediction results
  const predictionArray = await results.array();
  console.log("row: ", predictionArray);

  const riskLevels = ["low", "medium", "high"];
  const predictions = predictionArray.map((row) => {
    const highestProbIndex = row.findIndex((val) => val === Math.max(...row));
    return riskLevels[highestProbIndex]; // Map index to disease name
  });

  // Log and send predictions (adjust output based on your needs)
  console.log("Predicted diseases:", predictions);

  // Optionally send predictions to a client (if part of a server-side API)
  res.status(200).send({ predictions });
};

// Check if the model file exists before training
if (!fs.existsSync(modelPath)) {
  trainModel();
}
