const { getClient } = require("../db/connection");

exports.createUser = async (username, password, isAdmin) => {
  try {
    const client = getClient();
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const insertedUser = await collection.insertOne({
      username,
      password,
      isAdmin,
    });
    return insertedUser;
  } catch (error) {
    throw error;
  }
};

exports.fetchUsers = async () => {
  try {
    const client = getClient();
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const results = await collection.find({}).toArray();
    return results;
  } catch (error) {
    throw error;
  }
};

exports.fetchUserById = async (username) => {
  try {
    const client = getClient();
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const result = await collection.findOne({ username });

    if (!result) {
      throw { status: 404, msg: "User not found" };
    }

    return result;
  } catch (error) {
    throw error;
  }
};
