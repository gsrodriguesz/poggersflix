const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const db = require("./database")

module.exports = function (passport) {
    //configuraremos o passport aqui
    function findUser(username) {
        return db.Mongoose.model('users', db.UserSchema, 'users').findOne({ "uMail": username })
    }

    async function findUserById(id) {
        return await db.Mongoose.model('users', db.UserSchema, 'users').findOne({ "_id": id })
    }

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
        async (username, password, done) => {
            try {
                const user = await db.Mongoose.model('users', db.UserSchema, 'users').findOne({ "uMail": username })
                console.log(user)
                const logID = user._id
                console.log(logID)

                this.exports = logID

                // usuário inexistente
                if (!user) { return done(null, false) }

                // comparando as senhas
                const isValid = bcrypt.compareSync(password, user.uPasswd);
                if (!isValid) return done(null, false)

                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}