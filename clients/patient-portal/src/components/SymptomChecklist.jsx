import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/SymptomChecklist.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

// GraphQL mutation to save symptoms
const SAVE_SYMPTOMS_MUTATION = gql`
  mutation SaveSymptoms($patientId: ID!, $symptoms: [String!]!) {
    saveSymptoms(patientId: $patientId, symptoms: $symptoms) {
      id
      symptoms
    }
  }
`;
export default function SymptomChecklist({ patientId }) {
  const symptoms = [
    "Fever",
    "Cough",
    "Sore Throat",
    "Runny or Stuffy Nose",
    "Muscle Aches",
    "Headache",
    "Fatigue",
    "Mucus Production",
    "Shortness of Breath",
    "Chest Pain",
    "Nausea",
    "Vomiting",
    "Lightheadedness",
    "Sweating",
    "Changes in Bowel or Bladder Habits",
    "Numbness on One Side of the Body",
    "Confusion",
    "Difficulty Speaking",
    "Trouble Seeing in One Eye",
    "Severe Headache",
    "Lump",
    "Unexplained Weight Loss",
    "Sudden Weakness",
    "Persistent Cough",
    "Unexplained Bleeding or Discharge",
    "Cuts that are Slow to Heal",
    "Indigestion",
    "Increased Thirst",
    "Frequent Urination",
    "Blurred Vision",
  ];

  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [message, setMessage] = useState("");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setSelectedSymptoms((prev) =>
      checked ? [...prev, value] : prev.filter((symptom) => symptom !== value)
    );
  };

  useEffect(() => {
    console.log(selectedSymptoms);
  }, [selectedSymptoms]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure patientId is passed for the mutation
    if (!patientId) {
      setMessage("Patient ID is missing.");
      return;
    }

    try {
      // Save symptoms to the backend
      const { data } = await saveSymptoms({
        variables: {
          patientId,
          symptoms: selectedSymptoms,
        },
      });

      // Display success message
      setMessage("Symptoms saved successfully!");

      // Optionally, you can log the response or handle the data further
      console.log("Saved Symptoms:", data.saveSymptoms);
    } catch (error) {
      console.error("Error saving symptoms:", error);
      setMessage("Failed to save symptoms. Please try again.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className='form-options mb-4'>
        {symptoms.map((symptom) => (
          <Form.Check
            key={symptom}
            label={symptom}
            value={symptom}
            onChange={handleCheckboxChange}
          />
        ))}
      </div>
      <Button type='submit' className='button'>
        Submit Symptoms
      </Button>
      {message && <p>{message}</p>}
    </Form>
  );
}
