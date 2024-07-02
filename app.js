const express = require("express");
const {
  postUser,
  getUsers,
  getUserById,
} = require("./controllers/users.controllers");
const { postMessage } = require("./controllers/messages.controllers");
const { errorMonitor } = require("supertest/lib/test");

const app = express();

app.use(express.json());

app.get("/api/users", getUsers);

app.get("/api/users/:username", getUserById);

app.post("/api/users", postUser);

app.post(`/api/messages`, postMessage);

// error handler for MongoDB
app.use((error, req, res, next) => {
  if (error.errorResponse) {
    const { errorResponse } = error;

    if (errorResponse.code === 11000) {
      res.status(400).send("Username already taken");
    }
  }

  next(error);
});

// custom error handler
app.use((error, req, res, next) => {
  if (error.status && error.msg) {
    res.status(error.status).send(error.msg);
  }

  next(error);
});

module.exports = app;
