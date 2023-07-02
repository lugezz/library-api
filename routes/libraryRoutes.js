const express = require('express');

const libraryController = require('../controllers/libraryController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();


// Localhost:3000/api/v1/libraries
// GENRE -----------------------------------------------------
router.route('/genre')
    .get(protect, libraryController.getAllGenres)
    .post(protect, libraryController.createGenre);

router.route('/genre/:id')
    .get(protect, libraryController.getGenre)
    .patch(protect, libraryController.updateGenre)
    .delete(protect, libraryController.deleteGenre);
// -----------------------------------------------------

// AUTHOR -----------------------------------------------------
router.route('/author')
    .get(protect, libraryController.getAllAuthors)
    .post(protect, libraryController.createAuthor);

router.route('/author/:id')
    .get(protect, libraryController.getAuthor)
    .patch(protect, libraryController.updateAuthor)
    .delete(protect, libraryController.deleteAuthor);
// -----------------------------------------------------

// BOOK -----------------------------------------------------
router.route('/book')
    .get(protect, libraryController.getAllBooks)
    .post(protect, libraryController.createBook);

router.route('/book/:id')
    .get(protect, libraryController.getBook)
    .patch(protect, libraryController.updateBook)
    .delete(protect, libraryController.deleteBook);

// Search book by title
router.route('/book/search/:title')
    .get(protect, libraryController.searchBookByTitle);

// Get all books by genre
router.route('/book/genre/:genreId')
    .get(protect, libraryController.getAllBooksByGenre);

// Get all books by author
router.route('/book/author/:authorId')
    .get(protect, libraryController.getAllBooksByAuthor);

// Get all books by genre and author
router.route('/book/genre/:genreId/author/:authorId')
    .get(protect, libraryController.getAllBooksByGenreAndAuthor);


// -----------------------------------------------------

module.exports = router;
