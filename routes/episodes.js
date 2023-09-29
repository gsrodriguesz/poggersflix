var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('episodes', { title: 'Cadastro de Conteúdo' });
});

router.post('/', async (req, res) => {

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