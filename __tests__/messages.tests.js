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

describe("getMessage", () => {
  it("should 200 retrun all users when requested", async () => {
    const { body } = await request(app)
    .get("/api/messages")
    .expect(200);

    expect(body).toHaveLength(100);
    body.forEach((user) => {
      expect(user).toMatchObject({
          _id: expect.any(String),
          body: expect.any(String),
          from: expect.any(String),
          to: "admin",
          category: 'Service',
          sentiment: "negative",
          isClosed: expect.any(Boolean),
          table: expect.any(Number),
      });
    });
  });
});
