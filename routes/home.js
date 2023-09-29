var express = require('express');
var router = express.Router();

router.get('/', async function (req, res, next) {
    const db = require("../database");
    const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');

    const data = await Movies.find({}).lean().exec()
    res.render('home', { data });
});


module.exports = router;

