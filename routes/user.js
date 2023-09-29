var express = require('express');
var router = express.Router();


router.get('/choose', async (req, res) => {

    const id = req.query.id

    const db = require("../database");
    const Users = db.Mongoose.model('users', db.UserSchema, 'users');

    let data = await Users.findOne({ "_id": id }).lean().exec()
    console.log(data)
    data = data.uSubusers
    console.log(data)
    res.render('users', { data })

});

router.get('/account', async (req, res) => {

    res.render('account')

});


module.exports = router;