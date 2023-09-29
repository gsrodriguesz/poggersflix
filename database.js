const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/poggersFlix');

mongoose.connect("mongodb+srv://admin:pFFyGKpgdiea8IQO@cluster.s4yfeqj.mongodb.net/poggersData?retryWrites=true&w=majority")

const movieSchema = new mongoose.Schema({
    _id: { type: Number },
    mName: { type: String },
    mSinopse: { type: String },
    mDuration: { type: String },
    mType: { type: String },
    mGenres: { type: Array },
    mFullSizeCover: { type: String },
    mCover: { type: String },
    mBackground: { type: String },
    mLaunchDate: { type: Date },
    mEpisodes: { type: Array }

}, { collection: 'movies' }
);

const userSchema = new mongoose.Schema({
    _id: { type: Number },
    uMail: { type: String },
    uPasswd: { type: String },
    uSubusers: [{
        nickname: { type: String },
        favorites: { type: Array },
        avatarURL: { type: String },
        theme: { type: Number }
    }
    ],
    subUserCount: { type: Number },
    isPremium: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
}, { collection: 'users' }
);


module.exports = { Mongoose: mongoose, MovieSchema: movieSchema, UserSchema: userSchema }

mongoose.connection.on('connected', () => {
    console.log('GET /database callback')
})
