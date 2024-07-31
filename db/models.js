const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Ticket = sequelize.define("Ticket", {
  ticketId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("open", "closed"),
    allowNull: false,
  },
  priority: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const Customer = sequelize.define("Customer", {
  customerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

const Agent = sequelize.define("Agent", {
  agentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

// Define associations
Ticket.belongsTo(Customer, { foreignKey: "customerId" });
Ticket.belongsTo(Agent, { foreignKey: "agentId" });
Customer.hasMany(Ticket, { foreignKey: "customerId" });
Agent.hasMany(Ticket, { foreignKey: "agentId" });

module.exports = { Ticket, Customer, Agent };
