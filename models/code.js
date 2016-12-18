const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  value: { type: String, required: true },
  redirectUrl: { type: String, required: true },
  userId: { type: String, required: true },
  clientId: { type: String, required: true },
})

module.exports = mongoose.model('code', codeSchema);
