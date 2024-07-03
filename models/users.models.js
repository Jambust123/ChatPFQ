const { getClient, close, connect } = require("../db/connection");

exports.createUser = async (username, password, isAdmin) => {
  try {
    console.log('createUser invoked')
    const client = await connect()
    console.log(client, '<<< client')
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const insertedUser = await collection.insertOne({
      username,
      password,
      isAdmin,
    });
    console.log(insertedUser, '<<<< insertedUser')
    return insertedUser;
  } catch (error) {
    throw error;
  } finally {
    const client = getClient()
    close(client)
  }

};

exports.fetchUsers = async () => {
  try {
    const client = await connect()
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const results = await collection.find({}).toArray();
    return results;
  } catch (error) {
    throw error;
  } finally {
    const client = getClient()
    close(client)
  }
};

exports.fetchUserById = async (username) => {
  try {
    const client = await connect()
    const db = client.db("ChatPFQ");
    const collection = db.collection("users");
    const result = await collection.findOne({ username });

    if (!result) {
      throw { status: 404, msg: "User not found" };
    }

    return result;
  } catch (error) {
    throw error;
  } finally {
    const client = getClient()
    close(client)
  }
};
