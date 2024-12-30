import request from "supertest";

import app from "../app";

describe("GET /todos", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/todos").expect(200, done);
  });
});

describe("GET /todos/:id", () => {
  it("should return 200 OK", (done) => {
    request(app).get("/todos/1").expect(200, done);
  });
});

describe("POST /todos", () => {
  it("should return 201 Created", (done) => {
    request(app).post("/todos").send({ title: "New Todo" }).expect(201, done);
  });
});

describe("PUT /todos/:id", () => {
  it("should return 200 OK", (done) => {
    request(app)
      .put("/todos/1")
      .send({ title: "Updated Todo" })
      .expect(200, done);
  });
});

describe("DELETE /todos/:id", () => {
  it("should return 204 No Content", (done) => {
    request(app).delete("/todos/1").expect(204, done);
  });
});
