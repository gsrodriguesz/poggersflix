var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    const movieID = req.query.type
    const searchQuery = req.query.query

    const db = require("../database");
    const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');
    let data

    if (movieID) {
        switch (movieID) {
            case "movies":
                searchAux = "Filme"
                break
            case "series":
                searchAux = "Série"
                break
            default:
                searchAux = null
        }
        if (searchAux == null) {
            data = await Movies.find({}).lean().exec()
        } else {
            data = await Movies.find({ "mType": searchAux ? searchAux : "Filme" }).lean().exec()
        }

    } else if (searchQuery) {
        data = await Movies.find({ "mName": { "$regex": '^' + searchQuery, $options: 'i' } })
    }
    console.log(data)
    res.render('catalog', { data, type: movieID });
});

module.exports = router;
