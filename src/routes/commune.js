const express = require("express");
const router = express.Router();
const Commune = require("../classes/commune");

// Find a Commune

router.get("/", async (req, res) => {
  try {
    const commune = await Commune.find();
    res.status(200).send(commune);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Find Wilaya's Communes

router.get("/:wilaya", async (req, res) => {
  try {
    const wilaya = req.params.wilaya;
    const commune = await Commune.findWilayaCommunes(wilaya);
    res.status(200).send(commune);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// Find Commune By ID

router.get("/find/:commune_id", async (req, res) => {
  try {
    const commune_id = req.params.commune_id;
    const commune = await Commune.findById(commune_id);
    res.status(200).send(commune);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
