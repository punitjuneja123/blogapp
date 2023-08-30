const Sequelize = require("sequelize");
require("dotenv").config();

// connecting to DB
const sequelize = new Sequelize(
  process.env.database,
  process.env.user,
  process.env.password,
  {
    host: process.env.host,
    dialect: "mysql",
    dialectOptions: {
      ssl: "Amazon RDS",
    },
  }
);

// user schema
const user = sequelize.define("users", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("admin", "user"),
    defaultValue: "user",
  },
});

// blogs schema
const blog = sequelize.define("blogs", {
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  author_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// comments schema
const comment = sequelize.define("comments", {
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  blog_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  user_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { sequelize, user, blog, comment };
