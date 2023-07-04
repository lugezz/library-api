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
        if (!genre) {
            return res.status(404).json({
                status: 'fail',
                message: 'No genre found with that ID'
            });
        }
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
};


// AUTHORS -----------------------------------------------------
// Get all Authors
// If there is a query string, use pagination
// If not it returns 100 books
exports.getAllAuthors = async (req, res, next) => {
    page = req.query.page || 1;
    limit = req.query.limit || 20;
    authors_count = await Library.authorModel.count();

    return getPaginateAuthors(res, page, limit, authors_count);
};


// Get an author by id
exports.getAuthor = async (req, res, next) => {
    try {
        const author = await Library.authorModel.findByPk(req.params.id);
        if (!author) {
            return res.status(404).json({
                status: 'fail',
                message: 'No author found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                author
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Create an author
exports.createAuthor = async (req, res, next) => {
    try {
        const author = await Library.authorModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                author
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Update an author
exports.updateAuthor = async (req, res, next) => {
    try {
        const author = await Library.authorModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                author
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Delete an Author
exports.deleteAuthor = async (req, res, next) => {
    try {
        await Library.authorModel.destroy({
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
};



// BOOKS -----------------------------------------------------
// Get all Books
// If there is a query string, use pagination
// If not it returns 100 books
exports.getAllBooks = async (req, res, next) => {
    page = req.query.page || 1;
    limit = req.query.limit || 20;
    books_count = await Library.bookModel.count();

    return getPaginateBooks(res, page, limit, books_count);
};

// Get a Book by id
exports.getBook = async (req, res, next) => {
    try {
        const book = await Library.bookModel.findByPk(req.params.id);
        if (!book) {
            return res.status(404).json({
                status: 'fail',
                message: 'No book found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Create a Book
exports.createBook = async (req, res, next) => {
    try {
        const book = await Library.bookModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Update a Book
exports.updateBook = async (req, res, next) => {
    try {
        const book = await Library.bookModel.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Delete an Book
exports.deleteBook = async (req, res, next) => {
    try {
        await Library.bookModel.destroy({
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


// PAGINATION -----------------------------------------------------
const getPaginateBooks = async (res, page, limit, books_count = 0) => {
    try {
        const skip = (page - 1) * limit;

        const books = await Library.bookModel.findAll({
            limit,
            offset: skip
        });

        res.status(200).json({
            status: 'success',
            results: Math.max(books.length, books_count),
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

const getPaginateAuthors = async (res, page, limit, authors_count = 0) => {
    try {
        const skip = (page - 1) * limit;

        const authors = await Library.authorModel.findAll({
            limit,
            offset: skip
        });

        res.status(200).json({
            status: 'success',
            results: Math.max(authors.length, authors_count),
            data: {
                authors
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
};

// Special routes -----------------------------------------------------

// Books by Author
exports.getBooksByAuthor = async (req, res, next) => {
    try {
        const books = await Library.bookModel.findAll({
            where: {
                authorId: req.params.authorId
            }
        });

        if (!books) {
            return res.status(404).json({
                status: 'fail',
                message: 'No books found with that author ID'
            });
        }

        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

// Books by Genre
exports.getBooksByGenre = async (req, res, next) => {
    try {
        const books = await Library.bookModel.findAll({
            where: {
                genreId: req.params.genreId
            }
        });
        if (!books) {
            return res.status(404).json({
                status: 'fail',
                message: 'No books found with that genre ID'
            });
        }

        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

// Books by Author and Genre
exports.getBooksByAuthorAndGenre = async (req, res, next) => {
    try {
        const books = await Library.bookModel.findAll({
            where: {
                authorId: req.params.authorId,
                genreId: req.params.genreId
            }
        });
        if (!books) {
            return res.status(404).json({
                status: 'fail',
                message: 'No books found with that author and genre ID'
            });
        }

        res.status(200).json({
            status: 'success',
            results: books.length,
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

// Search books by title
exports.searchBooksByTitle = async (req, res, next) => {
    try {
        const books = await Library.bookModel.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.params.title}%`
                }
            }
        });
        if (!books) {
            return res.status(404).json({
                status: 'fail',
                message: 'No books found with that title'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                books
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail'
        });
    }
}

// Borrow a book
exports.borrowBook = async (req, res, next) => {
    try {
        const book = await Library.bookModel.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                status: 'fail',
                message: 'No book found with that ID'
            });
        }

        if (book.available_copies <= 0) {
            return res.status(400).json({
                status: 'fail',
                message: 'No available copies'
            });
        }

        // Decrement available copies
        book.available_copies -= 1;
        await book.save();

        // Save order to database. Should be a session to get userId
        const order = await Library.orderModel.create({
            bookId: req.params.bookId,
            userId: req.session.user.id
        });

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'An error occurred'
        });
    }
}

// Return a book
exports.returnBook = async (req, res, next) => {
    try {
        const book = await Library.bookModel.findByPk(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                status: 'fail',
                message: 'No book found with that ID'
            });
        }

        const order = await Library.orderModel.findOne({
            where: {
                bookId: req.params.bookId,
                userId: req.session.user.id
            }
        });

        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'No order found with that book ID and user ID'
            });
        }

        // Increment available copies
        book.available_copies += 1;
        await book.save();

        // Delete order
        order.destroy();
        // await Library.orderModel.destroy(order);

        res.status(200).json({
            status: 'success',
            data: {
                book
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'An error occurred'
        });
    }
}


// ORDER -----------------------------------------------------
// Get all orders
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Library.orderModel.findAll();
        res.status(200).json({
            status: 'success',
            results: orders.length,
            data: {
                orders
            }
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: 'An error occurred'
        });
    }
}

// Get an order by id
exports.getOrder = async (req, res, next) => {
    try {
        const order = await Library.orderModel.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({
                status: 'fail',
                message: 'No order found with that ID'
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'An error occurred'
        });
    }
}
