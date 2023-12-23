const ClientModel = require("../models/clientModel");
const bcrypt = require("bcrypt");

class Client {
  //create a client
  static async create(client) {
    client.password = await bcrypt.hash(client.password, 10);
    const c = await ClientModel.create(client);
    return c;
  }

  //find a client
  static async find() {
    const c = await ClientModel.find().select("-password").exec();
    return c;
  }

  //find a client with his id
  static async findById(Client_id) {
    const c = await ClientModel.findById(Client_id).select("-password").exec();
    return c;
  }

  //update Client by adding an (Id) parameter to identify the client 

  static async update(id, client) {
    const c = await ClientModel.updateOne({ _id: id }, { $set: client }).exec();
    return c;
  }

  //delete Client
  static async delete(client) {
    const c = await ClientModel.deleteOne({ _id: client }).exec();
    return c;
  }

  //find a client with his email
  static async findByEmail(email) {
    const a = await ClientModel.findOne({ email }).exec();
    return a;
  }
}

module.exports = Client;
