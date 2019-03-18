let express = require('express');
var favicon = require('serve-favicon')
let app = express();
let ejs = require('ejs');
let path = require('path')

// set html template
app.engine('.html', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

// favicon.ico
app.use(favicon(path.join(__dirname, '../favicon.ico')));

// set static resource
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// set router
app.get('/', function (req, res) {
    res.render('index');
});

// start server
let port = 8080;
app.listen(port, function () {
    console.log(`in browser access: http://localhost:${port}`);
});