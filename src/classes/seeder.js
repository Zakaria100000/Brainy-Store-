const WilayaModel = require("../models/wilayaModel");
const CommuneModel = require("../models/communeModel");
const { Wilaya } = require("../../mock/buncha");
const { Commune } = require("../../mock/buncha");

class Seeder {
  static async wilaya() {
    // Search Wilaya in BDD
    const wl_exist = await WilayaModel.findOne();
    if (!wl_exist) {
      const wilayaDocuments = Wilaya.map((w, index) => ({
        name: w,
        code: index + 1,
      }));
      await WilayaModel.insertMany(wilayaDocuments);
    } else {
      console.log("Wilaya documents already exist");
    }
  }

  static async commune() {
    // Do the same for Commune
    const cm_exist = await CommuneModel.findOne();
    if (!cm_exist) {
      let com = [];
      for (const c of Commune) {
        const code_w = parseInt(c.wilaya_code.replace("0", ""));
        const w = await WilayaModel.findOne({ code: code_w });

        com.push({
          name: c.commune_name_ascii,
          postcode: c.wilaya_code,
          wilaya: w._id,
        });
      }
      await CommuneModel.insertMany(com);
    }
  }
}

module.exports = Seeder;
