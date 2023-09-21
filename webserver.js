const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const c = require('colors')

app.use(express.static(__dirname + '/src/'));

app.get('/', function (req, res) {
    res.render('index.js');
});

app.listen(port, () => console.log(c.bgYellow('[ 🔔 Notice - Webserver]'), c.italic.red('⠀➜ '), c.yellow(`Rodando em $${port}`)))
const db = require('./src/assets/scripts/database/index')
db.start()
