const express = require("express");

const { comment } = require("../model/db.model");
// const { authentication } = require("../middleware/authentication.midleware");

const commentRouter = express.Router();

// get comments of a post
commentRouter.get("/:blogID", async (req, res) => {
  let blog_id = req.params.blogID;
  try {
    let comments = await comment.findAll({ where: { blog_id } });
    res.send(comments);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong", error: error });
  }
});

commentRouter.post("/postComment/:blogID", async (req, res) => {
  let blog_id = req.params.blogID;
  let user_id = req.body.userID;
  let user_name = req.body.userName;
  try {
    const data = await comment.create({
      user_id,
      user_name,
      blog_id,
      comment: req.body.comment,
    });
    res.status(201).send({ msg: "blog posted", data });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong", error: error });
  }
});

module.exports = { commentRouter };
