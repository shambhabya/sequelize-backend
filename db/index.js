/* global process */
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "postgres",
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});


const connectDb = async () => {
  console.log("Checking database connection...");

  try {
    await sequelize.authenticate();
    console.log("Database connection established.");
  } catch (e) {
    console.log("Database connection failed", e);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDb };
