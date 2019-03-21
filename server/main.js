let express = require('express');
let favicon = require('serve-favicon')
let bodyParser = require('body-parser');
let ejs = require('ejs');
let path = require('path')

// load config file
require('./config').load();

// create express
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set html template
app.engine('.html', ejs.__express);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client/views'));

// favicon.ico
app.use(favicon(path.join(__dirname, '../favicon.ico')));

// set static resource
app.use('/dist', express.static(path.join(__dirname, '../dist')));

// set router
require('./router/drive')(app);
require('./router/api')(app);

// load files
require('./fileMgr').loadFiles(function(err) {
    if (err) {
        console.log(`read files error: ${err}`);
        console.log(`shutdown server`);
        return;
    }

    // start server
    let port = 8080;
    app.listen(port, function () {
        console.log(`in browser access: http://localhost:${port}`);
    });
});
