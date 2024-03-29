const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  id: {type: Number, autoIncrement: true, primaryKey: true, unique: true},
  name: {type: String},
  age: {type: Number},
  email: {type: String},
  phone: {type: String},
  loans: [
    {
      loanId: {type: Number, required: true},
      loanDate: {type: Date, required: true},
      returnDate: {type: Date, required: true},
      bookId: {type: Number, required: true},
      bookName: {type: String, required: true}
    }
  ]
});

const Client = mongoose.model('client', clientSchema);

module.exports = Client;