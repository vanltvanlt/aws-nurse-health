const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Nurse = require("../models/Nurse"); // Assuming a Nurse model exists
const Patient = require("../models/Patient"); // Assuming a Patient model exists

const resolvers = {
  Query: {
    // Existing currentUser query
    currentUser: (_, __, { req }) => {
      const token = req.cookies["token"];
      if (!token) {
        return null;
      }

      try {
        const decoded = jwt.verify(token, "your_secret_key");
        return { username: decoded.username };
      } catch (error) {
        return null;
      }
    },

    // New Queries
    getNurse: async (_, { id }) => {
      const nurse = await Nurse.findById(id).populate("assignedPatients");
      if (!nurse) {
        throw new Error("Nurse not found");
      }
      return nurse;
    },
    getPatient: async (_, { id }) => {
      const patient = await Patient.findById(id).populate("nurse");
      if (!patient) {
        throw new Error("Patient not found");
      }
      return patient;
    },
    listNurses: async () => {
      return await Nurse.find().populate("assignedPatients");
    },
    listPatients: async () => {
      return await Patient.find().populate("nurse");
    },
  },

  Mutation: {
    // Existing login mutation
    login: async (_, { username, password }, { res }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ username }, "your_secret_key", {
        expiresIn: "1d",
      });
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return true;
    },

    // Existing register mutation
    register: async (_, { username, password }) => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username is already taken");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      return true;
    },

    // New Mutations
    addNurse: async (_, { name, email }) => {
      const newNurse = new Nurse({ name, email, assignedPatients: [] });
      await newNurse.save();
      return newNurse;
    },
    addPatient: async (_, { name, age }) => {
      const newPatient = new Patient({ name, age });
      await newPatient.save();
      return newPatient;
    },
    assignPatientToNurse: async (_, { patientId, nurseId }) => {
      const nurse = await Nurse.findById(nurseId);
      const patient = await Patient.findById(patientId);

      if (!nurse || !patient) {
        throw new Error("Nurse or Patient not found");
      }

      nurse.assignedPatients.push(patient._id);
      patient.nurse = nurse._id;

      await nurse.save();
      await patient.save();

      return nurse;
    },
    updatePatientInfo: async (_, { id, name, age }) => {
      const patient = await Patient.findById(id);
      if (!patient) {
        throw new Error("Patient not found");
      }

      if (name) patient.name = name;
      if (age) patient.age = age;

      await patient.save();
      return patient;
    },
  },

  // Relations resolvers for nested data
  Nurse: {
    assignedPatients: async (nurse) => {
      return await Patient.find({ nurse: nurse._id });
    },
  },
  Patient: {
    nurse: async (patient) => {
      return await Nurse.findById(patient.nurse);
    },
  },
};

module.exports = resolvers;
