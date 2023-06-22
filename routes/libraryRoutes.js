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

module.exports = router;
