const { model, Schema } = require('mongoose')

const ItemModel = new Schema({

  photo: {
    type: String,
    required: true,
  },

  reference: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  }, 

  sellingPrice: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = model('Item', ItemModel, 'items');