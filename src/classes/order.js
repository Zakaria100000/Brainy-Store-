const OrderModel = require("../models/orderModel"); 

class Order {
  // Create an order
  static async create(order) {
    const ord = await OrderModel.create(order);
    return ord;
  }

  // Find all orders
  static async find() {
    const ord = await OrderModel.find().populate('items.item');
    return ord;
  }

  // Fetches item for items array in order  OrderModel has a reference to ItemModel in its items array. 
  // Each item in the items array of an order contains a reference to an Item document.
  static async findById(orderId) {
    const ord = await OrderModel.findById(orderId).populate('items.item'); 
    // Replace each item reference with the actual Item document from the ItemModel.
    return ord;
  }

  // Update an order by ID
  static async update(id, order) {
    const ord = await OrderModel.updateOne({ _id: id }, { $set: order }).exec()
    return ord;
  }

  // Delete an order by ID
  static async delete(order) {
    const ord = await OrderModel.deleteOne({ _id: order }).exec(  );
    return ord;
  }
}

module.exports = Order;
