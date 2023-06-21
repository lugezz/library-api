const Library = require('../models/libraryModel');


// GENRE -----------------------------------------------------
exports.getAllGenres = async (req, res, next) => {
    try {
        const genres = await Library.genreModel.find();
        res.status(200).json({
            status: 'success',
            results: genres.length,
            data: {
                genres
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

exports.getGenre = async (req, res, next) => {
    try {
        const genre = await Library.genreModel.findById(req.params.id);
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

exports.updateGenre = async (req, res, next) => {
    try {
        const genre = await Library.genreModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: genre
        });
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

exports.deleteGenre = async (req, res, next) => {
    try {
        await Library.genreModel.findByIdAndDelete(req.params.id);
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