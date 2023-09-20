const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema({
    uID: { type: Number },
    uPasswd: { type: String },
    uSubusers: {
        count: { type: Number },
        username: { type: String },
    },
    uFavorites: { type: Array },
    isPremium: { type: Boolean, default: false }
})

let User = mongoose.model("User", userSchema);
module.exports = User;