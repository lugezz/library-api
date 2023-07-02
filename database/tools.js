const csvtojson = require("csvtojson");
const dbConfig = require("../config/config.js");
const db = require("./db.js");
const Library = require('../models/libraryModel.js');
const mysql = require("mysql");

// CSV file name
const fileName = "./database/Books.csv"

exports.fullDB = () => {
    csvtojson().fromFile(fileName).then(async source => {
        // Fetching the data from each row 
        for (var i = 119300; i < source.length; i++) {
            var title = source[i]["Title"],
                author = source[i]["Author"],
                genre = source[i]["Genre"],
                image = source[i]["Image"]
            
            // Skip if book exists
            if (title.length > 200) {
                title = title.slice(0, 200);
            }
            const book_db = await Library.bookModel.findOne({ where: {title: title} });
            if (book_db !== null) {
                console.log(`Book ${title.slice(0, 50)} already exists`, i + 1);
                continue;
            }
            
            if (author.length > 120) {
                author = author.slice(0, 120);
            }
            if (genre.length > 120) {
                genre = genre.slice(0, 120);
            }

            try {
                // Genre            
                let genre_db = await Library.genreModel.findOne({ where: { name: genre } });
                if (genre_db === null) {
                    genre_db = await Library.genreModel.create(
                        {name: genre}
                    );
                }
                
                // Author
                let author_db = await Library.authorModel.findOne({ where: {name: author} });
                if (author_db === null) {
                    author_db = await Library.authorModel.create(
                        {id: null, name: author}
                    );
                }
                
                // Book already checked doesn't exist
                await Library.bookModel.create(
                    {title: title,
                    authorId: author_db.id,
                    genreId: genre_db.id,
                    image: image});
                console.log(`Book ${title.slice(0, 50)} inserted successfully`, i + 1);
            } catch (err) {
                console.log("Unable to insert item at row ", i + 1);
                console.log("Error on:", 'title', title, 'author', author, 'genre', genre, 'image', image);
                return console.log(err);
            }
        }        
    console.log(
        "All items stored into database successfully");
    })
};

// Import authors, genre and books from CSV file
// Using SQL queries

// connect to the database
let con = mysql.createConnection({
    host: dbConfig.DB_HOST,
    user: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME
});
  

exports.fullDB2 = () => {
    let authorId
    let genreId
    let insertStatementAuthor
    let insertStatementGenre
    let valuesAuthor
    let valuesGenre
    
    // Connecting to the database
    con.connect((err) => {
        if (err) return console.error('error: ' + err.message);
    });

    csvtojson().fromFile(fileName).then(source => {

        // Fetching the data from each row and inserting to the table "products"
        for (var i = 0; i < source.length; i++) {
            var title = source[i]["Title"],
                author = source[i]["Author"],
                genre = source[i]["Genre"],
                image = source[i]["Image"]
            
            insertStatementAuthor = "INSERT IGNORE INTO authors (name)"
            valuesAuthor = [author]
            insertStatementGenre = "INSERT IGNORE INTO genres (name)"
            valuesGenre = [genre]

            // Inserting data of current row into database for authors and genres
            con.query(insertStatementAuthor, valuesAuthor, 
                (err, results, fields) => {
                if (err) {
                    console.log("Unable to insert Author at row ", i + 1);
                    return console.log(err);
                } else {
                    console.log(`Author ${author.slice(0, 50)} inserted successfully`, i + 1);
                }
            });
            con.query(insertStatementGenre, valuesGenre, 
                (err, results, fields) => {
                if (err) {
                    console.log("Unable to insert Genre at row ", i + 1);
                    return console.log(err);
                } else {
                    console.log(`Genre ${genre.slice(0, 50)} inserted successfully`, i + 1);
                }
            });
            authorId = "SELECT id FROM authors WHERE name = '" + author + "'"
            genreId = "SELECT id FROM genres WHERE name = '" + genre + "'"
            // Inserting data of current row into database for books
            con.query(authorId, (err, results, fields) => {
                if (err) {
                    console.log("Unable to get Author ID at row ", i + 1);
                    return console.log(err);
                }
                authorId = results[0].id;
                con.query(genreId, (err, results, fields) => {
                    if (err) {
                        console.log("Unable to get Genre ID at row ", i + 1);
                        return console.log(err);
                    }
                    genreId = results[0].id;
                    let insertStatementBook = "INSERT IGNORE INTO books (title, authorId, genreId, image)"
                    let valuesBook = [title, authorId, genreId, image]
                    con.query(insertStatementBook, valuesBook, 
                        (err, results, fields) => {
                        if (err) {
                            console.log("Unable to insert Book at row ", i + 1);
                            return console.log(err);
                        } else {
                            console.log(`Book ${title.slice(0, 50)} inserted successfully`, i + 1);
                        }
                    });
                });
            });
        }
        console.log("Records inserted into database successfully...!!");
    });
};