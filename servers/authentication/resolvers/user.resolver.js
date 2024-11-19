const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const resolvers = {
  Query: {
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
  },

  Mutation: {
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
  },
};

module.exports = resolvers;
