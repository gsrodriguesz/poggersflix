var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    const movieID = req.query.id
    const db = require("../database");
    const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');

    const data = await Movies.findOne({ "_id": movieID ? movieID : 1 })
    res.render('movie', { data });
});

module.exports = router;
