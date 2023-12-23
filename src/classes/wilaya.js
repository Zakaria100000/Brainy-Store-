const WilayaModel = require("../models/wilayaModel");

class Wilaya {
  //find a wilaya using the research bar
  static async find() {
    const w = await WilayaModel.find().exec();
    return w;
  }

  //find a wilaya using its id
  static async findById(wilaya_id) {
    const w = await WilayaModel.findById(wilaya_id).exec();
    return w;
  }
}

module.exports = Wilaya;
