const Book = require("../models/Book");

module.exports.book_index = async (req, res) => {
  try {
    const books = await Book.find({});
    console.log(books)
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.book_details = async (req, res) => {
  try {
    const book = await Book.find({id: req.params.id});
    res.status(200).json(book);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.book_create = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publicationDate: req.body.publicationDate,
    genre: req.body.genre,
    ISBN: req.body.ISBN
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.book_update = async (req, res) => {
  try {
    const updatedBook = await Book.find({id: req.params.id});
    updatedBook.title = req.body.title || updatedBook.title;
    updatedBook.author = req.body.author || updatedBook.author;
    updatedBook.publicationDate = req.body.publicationDate || updatedBook.publicationDate;
    updatedBook.genre = req.body.genre || updatedBook.genre;
    updatedBook.ISBN = req.body.ISBN || updatedBook.ISBN;
    await updatedBook.save();
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
};

module.exports.book_delete = async (req, res) => {
  try {
    await Book.findOneAndDelete({id: req.params.id});
    res.status(204).json({message: 'Book deleted'});
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}

module.exports.book_search = async (req, res) => {
  const searchField = req.query.field;
  const searchString = req.query.string;

  if (searchField !== 'title' && searchField !== 'author') {
    return res.status(400).json({message: 'Invalid search field. You can only search by title or author.'});
  }

  try {
    const query = {};
    query[searchField] = {$regex: searchString, $options: 'i'}; // 'i' option makes the search case-insensitive
    const books = await Book.find(query);
    res.status(200).json(books);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
}


