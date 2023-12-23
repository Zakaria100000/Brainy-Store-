const express = require("express");
const router = express.Router();
const Order = require("../classes/order"); // Replace with your actual Order class

// Create a new order
router.post("/", async (req, res) => {
    try {
        const newOrder = await Order.create(req.body);
        res.status(201).send(newOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Get an order by ID
router.get("/:id", async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        res.status(200).send(order);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Update an order by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedOrder = await Order.update(req.params.id, req.body);
        res.status(200).send(updatedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

// Delete an order by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedOrder = await Order.delete(req.params.id);
        res.status(200).send(deletedOrder);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});

module.exports = router;
