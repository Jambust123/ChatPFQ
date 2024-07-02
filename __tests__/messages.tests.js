const { client, close } = require("../db/connection");
const app = require("../app");
const request = require("supertest");
const { seedDB } = require("../db/seed");

beforeEach(async () => {
  await seedDB();
});

afterAll(async () => {
  await close();
});

describe("postMessage", () => {
  it("should 200 when a message is posted", async () => {
    const input = {
      message: {
        body: `This is a test message`,
        from: "matt",
        to: "admin",
        category: "Service",
        sentiment: "negative",
        isClosed: false,
        table: 12,
      },
    };

    const { body } = await request(app)
      .post("/api/messages")
      .send(input)
      .expect(201);

    expect(body).toMatchObject({
      acknowledged: true,
    });
  });
});

describe("getAllMessages", () => {
  it("should 200 retrun all messages when requested", async () => {
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
      });
    });
  });
});

describe("getAllMessagesFromUser", () => {
  it("should 200 should return all messages from a specific user", async () => {
    const input = {
      message: {
        body: `This is a test message`,
        from: "matt",
        to: "admin",
        category: "Service",
        sentiment: "negative",
        isClosed: false,
        table: 12,
      },
    };

    const input2 = {
      message: {
        body: `This is another test message`,
        from: "admin",
        to: "matt",
        category: "Service",
        sentiment: "negative",
        isClosed: false,
        table: 12,
      },
    };

    await request(app).post("/api/messages").send(input);
    await request(app).post("/api/messages").send(input2);

    const { body } = await request(app).get("/api/messages?username=matt").expect(200);

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
});


