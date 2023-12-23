const express = require("express");
const router = express.Router();
const Item = require("../classes/item"); // Replace with your actual Item class

// Create a new item
router.post("/", async (req, res) => {
    try {
        const newItem = await Item.create(req.body);
        res.status(201).send(newItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).send(items);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get an item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        res.status(200).send(item);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Update an item by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedItem = await Item.update(req.params.id, req.body);
        res.status(200).send(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Delete an item by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedItem = await Item.delete(req.params.id);
        res.status(200).send(deletedItem);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
