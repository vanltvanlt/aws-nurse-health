const index = require("../controllers/index.server.controller");

// Define the routes module' method
module.exports = function (app) {
  app.get("/", index.trainAndPredict);

  app.get("/run", index.trainAndPredict);
  //   app.post("/run", index.trainAndPredict);
};
