const db = require("../database/db.js");
const DataTypes = require("sequelize");


exports.genreModel = db.define("genres",{
    "name": {"type": DataTypes.STRING},
    "description": {"type": DataTypes.STRING},
    "createdAt": {"type": DataTypes.DATE},
    "updatedAt": {"type": DataTypes.DATE}
})

exports.authorModel = db.define("authors",{
    "name": {"type": DataTypes.STRING},
    "createdAt": {"type": DataTypes.DATE},
    "updatedAt": {"type": DataTypes.DATE}
})

exports.bookModel = db.define("books",{
    "title": {"type": DataTypes.STRING},
    "authorId": {"type": DataTypes.INTEGER},
    "genreId": {"type": DataTypes.INTEGER},
    "description": {"type": DataTypes.STRING},
    "available_copies": {"type": DataTypes.INTEGER},
    "image": {"type": DataTypes.STRING},
    "createdAt": {"type": DataTypes.DATE},
    "updatedAt": {"type": DataTypes.DATE}
})

exports.orderModel = db.define("orders",{
    "bookId": {"type": DataTypes.INTEGER},
    "userId": {"type": DataTypes.INTEGER},
    "createdAt": {"type": DataTypes.DATE},
    "updatedAt": {"type": DataTypes.DATE}
})
