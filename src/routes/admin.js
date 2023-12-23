const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../classes/admin");
const auth = require("./auth/auth");

// Find an admin

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Create an admin

router.post("/", async (req, res) => {
  try {
    const admin = req.body;
    const newAdmin = await Admin.create(admin);
    res.status(201).send(newAdmin);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Find an admin by Id

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    res.status(200).send(admin);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an admin
router.put("/:id", async (req, res) => {
  try {
    const admin = req.body;
    const _id = req.params.id;

    const result = await Admin.update(_id, admin);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Delete an admin
router.delete("/:id", async (req, res) => {
  try {
    const admin = req.params.id;
    const deletedAdmin = await Admin.delete(admin);
    res.status(200).send(deletedAdmin);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if an admin with the given email exists
    const admin = await Admin.findByEmail(email);

    if (!admin) {
      return res.status(401).json({ message: "Invalid email " });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate a token for the authenticated admin
    const token = jwt.sign(
      { id: admin._id, type: "admin" },
      process.env.JWT_SECRET
    );

    res.status(200).json({ token, admin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/token", auth, (req, res) => {
  res.status(200).json(req.auth);
});
module.exports = router;
