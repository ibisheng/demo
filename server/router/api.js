let fileMgr = require('../fileMgr')

module.exports = function(app) {
    app.get('/api/ping', function(req, res) {
        res.send("毕升文档 api demo server. status: ok");
    });

    app.get('/api/queryFileList', function(req, res) {
        let files = fileMgr.queryFileList();
        let fileList = [];
        for (k in files) {
            file = files[k];
            fileList.push({
                docId: file.docId,
                title: file.title,
                fetchUrl: file.fetchUrl
            });
        }
        res.send(fileList);
    });
}