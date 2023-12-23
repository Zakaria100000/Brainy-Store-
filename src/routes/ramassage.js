const express = require("express");
const router = express.Router();
const Ramassage = require("../classes/ramassage");
const auth = require("./auth/auth");

router.post("/", auth, async (req, res) => {
  try {
    let ramassage = req.body;
    if (req.auth.type !== "admin" && req.auth.type !== "client")
      return res.status(403).send("You're not authorized");

    if (req.auth.type !== "admin") {
      ramassage = {
        ...ramassage,
        client: req.auth.id,
      };
    }
    const newRamassage = await Ramassage.create(ramassage);
    res.status(201).send(newRamassage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    let ramassage;
    if (req.auth.type === "admin") ramassage = await Ramassage.find();
    else if (req.auth.type === "client")
      ramassage = await Ramassage.findByClient(req.auth.id);
    res.status(200).send(ramassage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});


router.get("/find/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ramassage = await Ramassage.findById(id);
    res.status(200).send(ramassage);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const ramassage = req.body;
    const _id = ramassage._id;
    const updatedRamassage = await Ramassage.update(_id, ramassage);
    res.status(200).send(updatedRamassage);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put("/ispayed/:id", async (req, res) => {
  try {
    const { isPayed } = req.body;
    const id = req.params.id;
    const updatedRamassage = await Ramassage.updateIsPayed(id, isPayed);
    res.status(200).send(updatedRamassage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const id = req.params.id;
    const updatedRamassage = await Ramassage.updateStatus(id, status);
    res.status(200).send(updatedRamassage);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const ramassage = req.body;
    const deletedRamassage = await Ramassage.delete(ramassage);
    res.status(200).send(deletedRamassage);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
