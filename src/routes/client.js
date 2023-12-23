const express = require("express");
const router = express.Router();
const Client = require("../classes/client");
const auth = require("./auth/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Add a Client
router.post("/", async (req, res) => {
  try {
    const client = req.body;
    const newClient = await Client.create(client);
    res.status(201).send(newClient);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Find a Client
router.get("/", async (req, res) => {
  try {
    const client = await Client.find();
    res.status(200).send(client);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Find Client by ID
router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    console.log("client :");
    console.log(client);
    res.status(200).send(client);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Update a Client
router.put("/:id", async (req, res) => {
  try {
    const client = req.body;
    const _id = req.params.id;

    const result = await Client.update(_id, client);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//Delete a Client
router.delete("/:id", async (req, res) => {
  try {
    const client = req.params.id;
    const deletedClient = await Client.delete(client);
    res.status(200).send(deletedClient);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

//Add a Client

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if an admin with the given email exists
    const client = await Client.findByEmail(email);

    if (!client) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, client.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    delete client.password;

    // Generate a token for the authenticated client
    const token = jwt.sign(
      { id: client._id, type: "client" },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/token", auth, (req, res) => {
  res.status(200).json(req.auth);
});
module.exports = router;
