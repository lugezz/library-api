const db = require("../database/db.js");
const DataTypes = require("sequelize");


exports.genreModel = db.define("genres",{
    "name": {"type": DataTypes.STRING},
    "description": {"type": DataTypes.STRING},
    "createdAt": {"type": DataTypes.DATE},
    "updatedAt": {"type": DataTypes.DATE}
})

exports.libraryModel = db.define("libraries",{
    "name": {"type": DataTypes.STRING},
    "genreId": {"type": DataTypes.INTEGER},
    "description": {"type": DataTypes.STRING},
    "createdAt": {"type": DataTypes.DATE},
    "updatedAt": {"type": DataTypes.DATE}
})
