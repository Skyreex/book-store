const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  id: {type: Number, autoIncrement: true, primaryKey: true, unique: true},
  title: {type: String, required: true},
  author: {type: String, required: true},
  publicationDate: {type: Date, required: true},
  genre: {type: String, required: true},
  ISBN: {type: String, required: true, unique: true}
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;