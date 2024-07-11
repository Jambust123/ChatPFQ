const {
  createMessage,
  fetchAllMessages,
} = require("../models/messages.models");

exports.postMessage = async (req, res, next) => {
  try {
    const { body, from, to, category, sentiment, isClosed, table, created_at } =
      req.body;
    const createdMessage = await createMessage(
      body,
      from,
      to,
      category,
      sentiment,
      isClosed,
      table,
      created_at
    );

    res.status(201).send(createdMessage);
  } catch (error) {
    next(error);
  }
};

exports.getAllMessages = async (req, res, next) => {
  try {
    const { username, category } = req.query;
    const messages = await fetchAllMessages(username, category);

    res.status(200).send(messages);
  } catch (error) {
    if (error.status && error.msg) {
      res.status(error.status).send({ msg: error.msg });
    } else {
      next(error);
    }
  }
};
