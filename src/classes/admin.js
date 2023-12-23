const AdminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");

class Admin {
  // Create an admin
  static async create(admin) {
    admin.password = await bcrypt.hash(admin.password, 10);
    const a = await AdminModel.create(admin);
    return a;
  }

  //find an admin
  static async find() {
    const a = await AdminModel.find().populate("role").exec();
    return a;
  }

  //find an admin with his id
  static async findById(admin_id) {
    const a = await AdminModel.findById(admin_id).populate("role").exec();
    return a;
  }

  //update Admin en rajoutant un parametre (Id) pour identifier l'admin

  static async update(id, admin) {
    if (admin.password) admin.password = await bcrypt.hash(admin.password, 10);
    const ad = await AdminModel.updateOne({ _id: id }, { $set: admin }).exec();
    return ad;
  }

  //delete Admin
  static async delete(admin) {
    console.log(admin);
    const a = await AdminModel.deleteOne({ _id: admin }).exec();
    return a;
  }

  static async deleteManyByEmail(email) {
    const a = await AdminModel.deleteMany({ email }).exec();
    return a;
  }

  static async findByEmail(email) {
    const a = await AdminModel.findOne({ email }).populate("role").exec();
    return a;
  }
}

module.exports = Admin;
