const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String!
  }

  type Query {
    currentUser: User
  }

  type Mutation {
    login(username: String!, password: String!): Boolean
    register(username: String!, password: String!): Boolean
  }
`;

module.exports = typeDefs;
