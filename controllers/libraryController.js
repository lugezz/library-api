const Library = require('../models/libraryModel');


// GENRE -----------------------------------------------------
// Get all genres
exports.getAllGenres = async (req, res, next) => {
    try {
        const genres = await Library.genreModel.findAll();
        res.status(200).json({
            status: 'success',
            results: genres.length,
            data: {
                genres
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Get a genre by id
exports.getGenre = async (req, res, next) => {
    try {
        const genre = await Library.genreModel.findByPk(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                genre
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Create a genre
exports.createGenre = async (req, res, next) => {
    try {
        const genre = await Library.genreModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                genre
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Update a genre
exports.updateGenre = async (req, res, next) => {
    try {
        const genre = await Library.genreModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                genre
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Delete a genre
exports.deleteGenre = async (req, res, next) => {
    try {
        await Library.genreModel.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

// LIBRARY -----------------------------------------------------

exports.getAllLibraries = async (req, res, next) => {
    try {
        const libraries = await Library.libraryModel.find();
        res.status(200).json({
            status: 'success',
            results: libraries.length,
            data: {
                libraries
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.getLibrary = async (req, res, next) => {
    try {
        const library = await Library.libraryModel.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                library
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.createLibrary = async (req, res, next) => {
    try {
        const library = await Library.libraryModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                library
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.updateLibrary = async (req, res, next) => {
    try {
        const library = await Library.libraryModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: library
        });
        res.status(200).json({
            status: 'success',
            data: {
                library
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.deleteLibrary = async (req, res, next) => {
    try {
        await Library.libraryModel.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
}