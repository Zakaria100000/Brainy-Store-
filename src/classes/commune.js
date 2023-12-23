const CommuneModel = require("../models/communeModel");

class Commune {
  //Search for commune
  static async find() {
    const com = await CommuneModel.find().exec();
    return com;
  }

  //Search for commune with wilaya
  static async findWilayaCommunes(wilaya) {
    const com = await CommuneModel.find({ wilaya }).exec();
    return com;
  }

  //Search for commune by id
  static async findById(Commune_id) {
    const com = await CommuneModel.findById(Commune_id).exec();
    return com;
  }
}

module.exports = Commune;
