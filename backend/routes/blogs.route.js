const express = require("express");
const { Op } = require("sequelize");

const { blog } = require("../model/db.model");

const blogRouter = express.Router();

// getting all blogs
blogRouter.get("/blog", async (req, res) => {
  try {
    const blogs = await blog.findAll();
    res.status(200).send(blogs);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong", error: error });
  }
});

// get blog by id
blogRouter.get("/blog/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const blogData = await blog.findOne({ where: { id } });
    res.status(200).send(blogData);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong", error: error });
  }
});

// search for blog
blogRouter.get("/blog/search/:search", async (req, res) => {
  let searchQuery = req.params.search;
  try {
    let searchedBlogs = await blog.findAll({
      where: {
        title: {
          [Op.like]: `%${searchQuery}%`,
        },
      },
    });
    res.send(searchedBlogs);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "something went wrong", error: error });
  }
});

module.exports = { blogRouter };
