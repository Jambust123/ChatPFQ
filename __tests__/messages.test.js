const app = require("../app");
const request = require("supertest");

const { connect, close } = require("../db/connection");
const { seedDB } = require("../db/seed");
const { ObjectId } = require("mongodb");

beforeEach(async () => {
  const client = await connect();
  await seedDB();
  await close(client);
});

describe.only("postMessage", () => {
  it("should 200 when a message is posted", async () => {
    const input = {
      body: `This is a test message`,
      from: "matt",
      to: "admin",
      category: "Service",
      sentiment: "negative",
      isClosed: false,
      table: 12,
      created_at: "test date string",
    };

    const { body, created_at } = await request(app)
      .post("/api/messages")
      .send(input)
      .expect(201);

    expect(body).toMatchObject({
      acknowledged: true,
    });
  });
});

describe("getAllMessages", () => {
  it("should 200 return all messages when requested", async () => {
    const { body } = await request(app).get("/api/messages").expect(200);

    expect(body).toHaveLength(100);
    body.forEach((user) => {
      expect(user).toMatchObject({
        _id: expect.any(String),
        body: expect.any(String),
        from: expect.any(String),
        to: "admin",
        category: "Service",
        sentiment: "negative",
        isClosed: expect.any(Boolean),
        table: expect.any(Number),
        created_at: expect.any(String),
      });
    });
  });
});

describe("getAllMessagesFromUser", () => {
  it("should 200 should return all messages from a specific user", async () => {
    const input = {
      body: `This is a test message`,
      from: "matt",
      to: "admin",
      category: "Service",
      sentiment: "negative",
      isClosed: false,
      table: 12,
    };

    const input2 = {
      body: `This is another test message`,
      from: "admin",
      to: "matt",
      category: "Service",
      sentiment: "negative",
      isClosed: false,
      table: 12,
    };

    await request(app).post("/api/messages").send(input);
    await request(app).post("/api/messages").send(input2);

    const { body } = await request(app)
      .get("/api/messages?username=matt")
      .expect(200);

    body.forEach((user) => {
      expect(user).toMatchObject({
        _id: expect.any(String),
        body: expect.any(String),
        from: expect.any(String),
        to: expect.any(String),
        category: "Service",
        sentiment: "negative",
        isClosed: false,
        table: 12,
      });
    });
  });
  it("should 404 return not found if user does not exist", async () => {
    const { body } = await request(app)
      .get("/api/messages?username=banana")
      .expect(404);

    expect(body.msg).toBe("No messages found for user: banana");
  });
});

describe("getAllMessagesBycategory", () => {
  it("should 200 return all messages from category", async () => {
    const { body } = await request(app)
      .get("/api/messages?category=Service")
      .expect(200);

    body.forEach((user) => {
      expect(user).toMatchObject({
        _id: expect.any(String),
        body: expect.any(String),
        from: expect.any(String),
        to: expect.any(String),
        category: "Service",
        sentiment: "negative",
        isClosed: false,
        table: expect.any(Number),
      });
    });
  });
  it("should 404 return not found if category does not exist", async () => {
    const { body } = await request(app)
      .get("/api/messages?category=banana")
      .expect(404);

    expect(body.msg).toBe("No messages found for category: banana");
  });
});
