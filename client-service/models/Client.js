const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  id: {type: Number, autoIncrement: true, primaryKey: true, unique: true},
  name: {type: String, required: true},
  age: {type: Number, required: true},
  email: {type: String, required: true},
  phone: {type: String, required: true},
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;