const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db");
const typeDefs = require("./schemas/user.schema");
const resolvers = require("./resolvers/user.resolver");

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("REQUEST Body:", req.body);

  console.log("RESPONSE Body: ", res.body);
  next();
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://studio.apollographql.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

server.start().then(() => {
  server.applyMiddleware({ app, cors: false });

  app.listen({ port: 4001 }, () =>
    console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
  );
});
