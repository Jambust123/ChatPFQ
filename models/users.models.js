const { client } = require("../db/connection");

exports.createUser = async (username, password, isAdmin) => {
  try {
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const insertedUser = await collection.insertOne({
      username,
      password,
      isAdmin,
    });
    return insertedUser;
  } catch (error) {
    return Promise.reject(error)
  }
};

exports.fetchUsers = async () => {
  try {
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const results = collection.find({});
    return await results.toArray();
  } catch (error) {
    return Promise.reject(error)
  }
};

exports.fetchUserById = async (username) => {
  try {
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const result = await collection
      .find({
        username: username,
      })
      .toArray();
    if (result.length === 0) {
      return Promise.reject({
        status: 404,
        msg: "User not found"
      });
    }
    return result[0];
  } catch (error) {
    return Promise.reject(error)
  }
};
