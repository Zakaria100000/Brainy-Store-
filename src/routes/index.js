const express = require("express");
const admin = require("./admin");
const client = require("./client");
const livreur = require("./livreur");
const envoi = require("./envoi");
const wilaya = require("./wilaya");
const paiement = require("./paiement");
const commune = require("./commune");
const parameters = require("./parameters");
const ramassage = require("./ramassage");
const role = require("./role");
const tarif = require("./tarif");
const etat = require("./etat");
const sousetat = require("./sousetat");
// const seeder = require("../classes/seeder");

const router = express.Router();

router.use("/admin", admin);
router.use("/client", client);
router.use("/livreur", livreur);
router.use("/envoi", envoi);
router.use("/wilaya", wilaya);
router.use("/paiement", paiement);
router.use("/commune", commune);
router.use("/parameters", parameters);
router.use("/ramassage", ramassage);
router.use("/role", role);
router.use("/tarif", tarif);
router.use("/etat", etat);
router.use("/sousetat", sousetat);
// router.use('/seeder', seeder)

module.exports = router;
