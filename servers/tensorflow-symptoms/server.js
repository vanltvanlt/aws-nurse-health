const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const routes = require("./routes/index.server.route");

const app = express();

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("REQUEST Body:", req.body);
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

// app.use(routes);
require("./routes/index.server.route")(app);

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: ({ req, res }) => ({ req, res }),
// });

// server.start().then(() => {
//   server.applyMiddleware({ app, cors: false });

app.listen({ port: 4002 }, () =>
  console.log(`🚀 Server ready at http://localhost:4002`)
);
// });
