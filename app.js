/*global process */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectDb, sequelize } = require("./db");
const { Ticket, Customer, Agent } = require("./db/models/models");
const routes = require("./routes");
const app = express();
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors());
app.use("/", routes);

const initialTickets = [
  {
    title: "Login Issue",
    description: "Cannot login to account",
    status: "open",
    priority: 1,
    customerId: 1,
    agentId: 1,
  },
  {
    title: "Payment Failure",
    description: "Payment not processed",
    status: "closed",
    priority: 2,
    customerId: 2,
    agentId: 2,
  },
  {
    title: "Bug Report",
    description: "Found a bug in the system",
    status: "open",
    priority: 3,
    customerId: 1,
    agentId: 1,
  },
];

const initialCustomers = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

const initialAgents = [
  { name: "Charlie", email: "charlie@example.com" },
  { name: "Dave", email: "dave@example.com" },
];

async function initializeDatabase() {
  try {
    // Sync all models with the database
    await sequelize.sync({ force: false });
    console.log("Database & tables created!");

    // Check if data already exists
    const ticketCount = await Ticket.count();
    const customerCount = await Customer.count();
    const agentCount = await Agent.count();

    // If no data exists, seed the database
    if (ticketCount === 0 && customerCount === 0 && agentCount === 0) {
      await Customer.bulkCreate(initialCustomers);
      await Agent.bulkCreate(initialAgents);
      await Ticket.bulkCreate(initialTickets);
      console.log("Initial data seeded successfully!");
    } else {
      console.log("Database already contains data. Skipping initial seeding.");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  }
}

(async () => {
  await connectDb().then(() => {
    initializeDatabase();
    console.log(`Attempting to run server on port ${process.env.PORT}`);

    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  });
})();
