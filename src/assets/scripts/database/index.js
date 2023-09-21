const mongoose = require("mongoose");
const c = require("colors")

module.exports = {
    start() {
        try {
            mongoose.connect("mongodb+srv://admin:ZEH5ZPIVGxgEtCWh@cluster1.ayz6m.mongodb.net/poggersData?retryWrites=true&w=majority", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useFindAndModify: true,
            });

            console.log(c.bgCyan('[ 🏦 DataBase ]'), c.cyan("Conectado ao banco de dados"))

        } catch (err) {
            if (err) return console.log(c.bgRed('[ ❌ Error - DB ]'), c.red(err))
        }
    },
};