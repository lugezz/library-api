const csvtojson = require("csvtojson");
const db = require("./db.js");
const Library = require('../models/libraryModel.js');

// CSV file name
const fileName = "./database/Books.csv"


const cleanString = (input) => {
    var output = "";
    for (var i=0; i<input.length; i++) {
        if (input.charCodeAt(i) <= 127) {
            output += input.charAt(i);
        } else {
            output += "_";
        }
    }
    return output;
}


exports.fullDB = () => {
    csvtojson().fromFile(fileName).then(async source => {
        // Fetching the data from each row 
        for (var i = 120300; i < source.length; i++) {
            var title = source[i]["Title"],
                author = source[i]["Author"],
                genre = source[i]["Genre"],
                image = source[i]["Image"]
            
            if (title.length > 200) {
                title = title.slice(0, 200);
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
                    genre = cleanString(genre);
                    genre_db = await Library.genreModel.create(
                        {name: genre}
                    );
                }
                
                // Author
                let author_db = await Library.authorModel.findOne({ where: {name: author} });
                if (author_db === null) {
                    author = cleanString(author);
                    author_db = await Library.authorModel.create(
                        {id: null, name: author}
                    );
                }
                
                // Book
                const book_db = await Library.bookModel.findOne({ where: {title: title} });
                if (book_db === null) {
                    title = cleanString(title);
                    await Library.bookModel.create(
                        {title: title,
                        authorId: author_db.id,
                        genreId: genre_db.id,
                        image: image}
                    );
                };
                console.log("Item inserted successfully", i + 1);
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
