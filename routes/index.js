const { Router } = require("express");
const { Ticket } = require("../db/models/models");
const router = Router();

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tickets/sort-by-priority", async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      order: [["priority", "ASC"]],
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tickets/status/:status", async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { status: req.params.status },
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tickets/customer/:customerId", async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { customerId: req.params.customerId },
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tickets/agent/:agentId", async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { agentId: req.params.agentId },
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      where: { ticketId: req.params.id },
    });

    if (ticket) res.json(ticket);
    else {
      res.status(404).json({ messsage: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/tickets", async (req, res) => {
  try {
    const newTicket = await Ticket.create(req.body);
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/tickets/update/:id", async (req, res) => {
  try {
    const [updated] = await Ticket.update(req.body, {
      where: { ticketId: req.params.id },
    });
    if (updated) {
      const updatedTicket = await Ticket.findOne({
        where: { ticketId: req.params.id },
      });
      res.json(updatedTicket);
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/tickets/delete", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Ticket ID is required" });
    }

    const deleted = await Ticket.destroy({
      where: { ticketId: id },
    });

    if (deleted) {
      res
        .status(200)
        .json({ message: "Ticket with ID " + id + "successfully deleted" });
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.all("*", (req, res) => {
  res.status(404).send("Not found");
});

module.exports = router;
