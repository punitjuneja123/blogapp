const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// getting user model
const { user } = require("../model/db.model");

const userRouter = express.Router();

// ***********************Register a user********************************
userRouter.post("/register", async (req, res) => {
  // getting data from body
  const { name, email, password } = req.body;

  // checking for email if already exists
  let emailExist = await user.findOne({ where: { email } });
  if (!emailExist) {
    // if not then hashing the password and storing in DB
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        res.status(400).send({ msg: "something went wrong", error: err });
      } else {
        // storing the data in db
        try {
          const data = await user.create({
            name,
            email,
            password: hash,
          });

          res.status(201).send({ msg: "user registered successfully", data });
        } catch (error) {
          console.log(error);
          res.status(400).send({ msg: "something went wrong", error: error });
        }
      }
    });
  } else {
    // if email already exists not saving the data
    res.status(400).send({ msg: "email already exists" });
  }
});

// ***********************login user********************************
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // checking for user by email if already exists or not
  let userData = await user.findOne({ where: { email } });
  if (userData) {
    // comparing password
    bcrypt.compare(password, userData.password, (err, result) => {
      if (result) {
        // creating and sending token for authentication
        let token = jwt.sign(
          { userID: userData.id, userName: userData.name },
          process.env.secret
        );
        res.status(201).send({
          user: {
            userID: userData.id,
            userName: userData.name,
            name: userData.name,
            email: userData.email,
          },
          token: token,
        });
      } else {
        res.status(400).send("wrong credentials");
      }
    });
  } else {
    res.status(400).send("wrong credentials");
  }
});

// ***********************get all users********************************
userRouter.get("/allusers", async (req, res) => {
  let users = await user.findAll();
  res.send(users);
});

// ***********************update user's role********************************
userRouter.patch("/updateRole/:id", async (req, res) => {
  let id = req.params.id;
  let role = req.body.role;
  try {
    await user.update({ role: role }, { where: { id } });
    res.send("role updated");
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
});

module.exports = { userRouter };
