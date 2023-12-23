const express = require("express");
const router = express.Router();
const Wilaya = require("../classes/wilaya");

//Search for wilaya
router.get("/", async (req, res) => {
  try {
    const wilaya = await Wilaya.find();
    res.status(200).send(wilaya);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Search for wilaya using its id

router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const wilaya = await Wilaya.findById(id);
    res.status(200).send(wilaya);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const wilaya = await Wilaya.updatePring(id, req.body.tarifs);
    res.status(200).send(wilaya);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
