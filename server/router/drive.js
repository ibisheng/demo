module.exports = function(app) {
    app.get('/', function (req, res) {
        res.redirect('/files');
    });

    app.get('/files', function(req, res) {
        res.render('index');
    });
}
