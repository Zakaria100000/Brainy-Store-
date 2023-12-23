const ItemModel = require("../models/itemModel"); 

class Item {
  // Create an item
  static async create(item) {
    const it= await ItemModel.create(item);
    return it;
  }

  // Find all items
  static async find() {
    const it = await ItemModel.find();
    return it;
  }

  // Find an item by ID
  static async findById(itemId) {
    const it = await ItemModel.findById(itemId);
    return it;
  }

  // Update an item by its ID
  static async update(id, item) {
    const it = await ItemModel.updateOne({ _id: id }, { $set: item }).exec()
    return it;
  }

  // Delete an item by ID
  static async delete(item) {
    const it = await ItemModel.deleteOne({ _id: item }).exec();
    return it;
  }
}

module.exports = Item;
