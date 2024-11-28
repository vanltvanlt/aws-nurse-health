const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Existing User Type
  type User {
    username: String!
  }

  # New Types for Nurse and Patient
  type Nurse {
    id: ID!
    name: String!
    email: String!
    assignedPatients: [Patient!]
  }

  type Patient {
    id: ID!
    name: String!
    age: Int!
    medicalHistory: [String!]
    nurse: Nurse
  }

  # Extend Query Type
  type Query {
    currentUser: User
    getNurse(id: ID!): Nurse
    getPatient(id: ID!): Patient
    listNurses: [Nurse!]
    listPatients: [Patient!]
  }

  # Extend Mutation Type
  type Mutation {
    login(username: String!, password: String!): Boolean
    register(username: String!, password: String!): Boolean
    addNurse(name: String!, email: String!): Nurse
    addPatient(name: String!, age: Int!): Patient
    assignPatientToNurse(patientId: ID!, nurseId: ID!): Nurse
    updatePatientInfo(id: ID!, name: String, age: Int): Patient
  }
`;

module.exports = typeDefs;
