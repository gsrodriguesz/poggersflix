const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = new Schema({
    mID: { type: Number },
    mName: { type: String },
    mSinopse: { type: String },
    mDuration: { type: Number },
    mType: { type: String },
    mGenres: { type: Array },
    mFullSizeCover: { type: String },
    mCover: { type: String },
    mLaunchDate: { type: Date },
    mEpisodes: { type: Array },
})

let Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;