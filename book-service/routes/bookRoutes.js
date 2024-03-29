const {Router} = require('express');
const bookController = require('../controllers/bookController');
const bodyParser = require('body-parser');
const router = Router();


router.get('/api/books', bookController.book_index);
router.get('/api/books/:id', bookController.book_details);
router.post('/api/books', bodyParser.json(), bookController.book_create);
router.put('/api/books/:id', bodyParser.json(), bookController.book_update);
router.delete('/api/books/:id', bookController.book_delete);
router.get('/api/books/search', bookController.book_search);

module.exports = router;

