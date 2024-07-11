const { ObjectId } = require("mongodb");
const { connect, getClient, close } = require("../db/connection");

exports.createMessage = async (
  body,
  from,
  to,
  category,
  sentiment,
  isClosed,
  table,
  created_at
) => {
  try {
    const client = await connect();
    const db = client.db("ChatPFQ");
    const collection = db.collection("messages");
    const insertedMessage = await collection.insertOne({
      body,
      from,
      to,
      category,
      sentiment,
      isClosed,
      table,
      created_at,
    });
    return insertedMessage;
  } catch (error) {
    throw error;
  } finally {
    const client = getClient();
    close(client);
  }
};

exports.fetchAllMessages = async (username, category) => {
  try {
    const client = await connect();
    const db = client.db("ChatPFQ");
    const collection = db.collection("messages");
    let query = {};

    if (username) {
      query = { $or: [{ to: username }, { from: username }] };
    } else if (category) {
      query = { category: category };
    }

    const allMessages = await collection.find(query).toArray();

    const formattedMessages = allMessages.map((message) => {
      return {
        _id: message._id,
        body: message.body,
        from: message.from,
        to: message.to,
        category: message.category,
        sentiment: message.sentiment,
        isClosed: message.isClosed,
        table: message.table,
        created_at: message.created_at,
      };
    });

    if ((username || category) && formattedMessages.length === 0) {
      throw {
        status: 404,
        msg: `No messages found for ${
          username ? `user: ${username}` : `category: ${category}`
        }`,
      };
    }

    return formattedMessages;
  } catch (error) {
    throw error;
  } finally {
    console.log('going to get the client')
    const client = getClient();
    console.log(client, 'client from fetch all')
    close(client);
  }
};
