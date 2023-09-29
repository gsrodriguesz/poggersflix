var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('admin', { title: 'Cadastro de Conteúdo' });
});

router.post('/', async (req, res) => {

    const id = req.body.movieID
    const name = req.body.movieName
    const sinopse = req.body.movieSinopse
    const duration = req.body.movieDuration
    const type = req.body.movieType
    const genres = req.body.movieGenre
    const fullCover = req.body.movieFullCover
    const cover = req.body.movieCover
    const background = req.body.movieBackground


    const db = require("../database");
    const Movies = db.Mongoose.model('movies', db.MovieSchema, 'movies');

    try {
        await Movies.create({
            _id: id,
            mName: name,
            mSinopse: sinopse,
            mDuration: duration,
            mType: type,
            mGenres: genres,
            mFullSizeCover: fullCover,
            mCover: cover,
            mBackground: background,
            mLaunchDate: null,
            mEpisodes: Array
        })
        res.redirect("/admin");
    } catch (err) {
        console.log(err);
    }
});

router.post('/movieManager', async (req, res) => {

    const mID = req.body.movieID
    const name = req.body.epName
    const url = req.body.epURL
    const thumbnail = req.body.epThumbnail



    const db = require("../database");
    const Movies = await db.Mongoose.model('movies', db.MovieSchema, 'movies')


    try {
        await Movies.updateOne(
            { _id: mID },
            {
                $push: {
                    mEpisodes: {
                        epName: name,
                        epThumbnail: thumbnail,
                        epURL: url
                    }
                }
            })
        res.redirect("/epManager");
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;