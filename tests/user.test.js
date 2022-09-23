const request = require("supertest");
const { app } = require("../src/app");
const User = require("../src/models/user");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userOneID = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneID,
  name: "gerga",
  email: "gerga@gmail.com",
  password: "gargari123",
  tokens: [
    {
      token: jwt.sign({ _id: userOneID }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany();
  await new User(userOne).save();
});

afterEach(() => {
  console.log("after each");
});

test("should sign up for new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "bacho",
      email: "khachvanis@gmail.com",
      password: "asx1234",
    })
    .expect(201);
});

test("should log in existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("shouldn't log in user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "zanzi",
      password: "bari@gmail.com",
    })
    .expect(400);
});

test("should get user profile", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not get profile for non authonticated user", async () => {
  request(app).get("/users/me").send().expect(401);
});

// test("should delete account for user", async () => {
//   request(app)
//     .delete("/users/me")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200);
// });

test("should not delete users without Auth", async () => {
  request(app).delete("/users/me").send().expect(401);
});

test("should Upload avatar image", async () => {
  request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "")
    .expect(200);

  const user = await User.findById(userOneID);
  console.log("user", user);
  // expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update user name", async () => {
  request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "bachia",
    })
    .expect(200);
  const user = await User.findById(userOneID);
  expect(user.name).toBe("bachia");
});
