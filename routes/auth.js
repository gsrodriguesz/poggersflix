var express = require('express');
var router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs')
const db = require("../database");
const authFile = require('../authenticator')

router.get('/login', (req, res, next) => {
    if (req.query.fail == "error")
        res.render('login', { msg: 'Usuário e/ou senha incorretos!' });
    else if (req.query.fail == "notLogged") {
        res.render('login', { msg: 'Você precisa entrar em sua conta para acessar esta página' })
    }
    else
        res.render('login', { msg: null });
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: `/user/choose?id=0`,
        failureRedirect: '/auth/login?fail=error'
    })
);

router.get('/register', (req, res, next) => {
    if (req.query.fail)
        res.render('register', { msg: 'Usuário e/ou senha incorretos!' });
    else
        res.render('register', { msg: null });
});

router.post('/register', async (req, res) => {

    const mail = req.body.email
    let passwd = req.body.password
    const cPasswd = req.body.confirm

    console.log(passwd)
    console.log(cPasswd)


    if (passwd != cPasswd || !passwd) {
        res.render('register', { msg: "As senhas não coincidem" })
    } else {

        passwd = await bcrypt.hash(passwd, 10)
        console.log(passwd)


        const Users = db.Mongoose.model('users', db.UserSchema, 'users');

        let lastID = await Users.findOne().sort({ _id: -1 })
        lastID = Number(lastID._id + 1)

        localStorage.setItem("cuID", lastID)

        console.log(lastID)
        try {
            await Users.create({
                _id: lastID,
                uMail: mail,
                uPasswd: passwd,
                uSubusers: [{
                    nickname: "Usuário padrão",
                    favorites: [],
                    avatarURL: "https://avatar.iran.liara.run/public/35",
                    theme: 0
                }],
                subUsersCount: 1,
                isPremium: false,
                isAdmin: false
            })
            res.redirect(`/user/choose?id=${lastID}`);
        } catch (err) {
            console.log(err);
        }
    }
});

module.exports = router;