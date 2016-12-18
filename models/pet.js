const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const petSchema = new Schema({
  name: { type: String },
  type: { type: String },
  quantity: Number
});

module.exports = mongoose.model('pet', petSchema);