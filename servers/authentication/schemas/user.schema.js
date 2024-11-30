const { gql } = require("apollo-server-express");

const typeDefs = gql`
  # Updated User Type to consolidate Nurse and Patient for simplicity
  type User {
    id: ID!
    name: String!
    email: String!
    role: String! # 'nurse' or 'patient'
    assignedPatients: [User] # Only for nurses
    assignedNurse: User      # Only for patients
    vitalSigns: [VitalSign]
    motivationalTips: [MotivationalTip]
  }

  type VitalSign {
    id: ID!
    bodyTemperature: Float!
    heartRate: Int!
    bloodPressure: String!
    respiratoryRate: Int!
    date: String!
  }

  type MotivationalTip {
    id: ID!
    content: String!
    createdAt: String!
  }

  type Query {
    currentUser: User
    getUser(id: ID!): User
    listUsers(role: String): [User] # Filter by role
  }

  type Mutation {
    login(email: String!, password: String!): Boolean
    register(name: String!, email: String!, password: String!, role: String!): User
    assignPatientToNurse(patientId: ID!, nurseId: ID!): User
    addVitalSign(userId: ID!, bodyTemperature: Float!, heartRate: Int!, bloodPressure: String!, respiratoryRate: Int!): VitalSign
    addMotivationalTip(userId: ID!, content: String!): MotivationalTip
    updateUser(
    id: ID!,
    name: String,
    email: String,
    password: String,
    role: String,
    assignedNurse: ID,
    assignedPatients: [ID!]
    ): User
  }
`;

module.exports = typeDefs;
