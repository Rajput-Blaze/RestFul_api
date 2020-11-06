const mongoose = require('mongoose');

const students = new mongoose.Schema({
  name: { type: String, trim: true },
  degree: { type: String, trim: true },
  sex: { type: String, trim: true },
});
module.exports = mongoose.model('modeldata', students);
