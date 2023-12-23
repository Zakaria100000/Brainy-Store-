const { model, Schema } = require("mongoose");

const CommuneModel = new Schema({
  
  name: {
    type: String,
    required: true,
  },

  postcode: {
    type: String,
    required: true,
  },

  wilaya: {
    type: Schema.Types.ObjectId,
    ref: "Wilaya",
    required: true,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Commune", CommuneModel, "communes");
