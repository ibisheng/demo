let fileMgr = require('../fileMgr')
let config = require('../config')
let signArg = require("../signArguments")
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

    function onGetBishengApi(req, res, suffix) {
        let docId = req.params['docId'];
        let userId = 'guest'+req.params['uid'];
        let callback = Buffer.from(`${config.getConfig().editorCaller}/api/fileAcl/${docId}/${userId}`).toString('base64');
        let sign = signArg(callback);
        let url = `${config.getConfig().editorHost}/apps/editor/${suffix}?callURL=${callback}&sign=${sign}`;
        res.send({
            'url': url
        });
    }

    app.get('/api/file/view/:docId/:uid', function(req, res) {
        onGetBishengApi(req, res, 'openPreview');
    });

    app.get('/api/file/edit/:docId/:uid', function(req, res) {
        onGetBishengApi(req, res, 'openEditor');
    });

    app.get('/api/fileAcl/:docId/:uid', function(req, res) {
        let docId = req.params['docId'];
        let userId = req.params['uid'];
        let fileInfo = fileMgr.queryfile(docId);
        res.send({
            doc: {
                docId: fileInfo.docId,
                title: fileInfo.title,
                fetchUrl: `${config.getConfig().editorCaller}/api/file/${fileInfo.docId}/${userId}`,
                fromApi:true
            },
            user: {
                uid: userId,
                nickName: userId,
                avatar: '',
                privilege: [
                    'FILE_READ',
                    'FILE_WRITE',
                    'FILE_DOWNLOAD',
                    'FILE_PRINT'
                ]
            },
        });
    });

    app.get('/api/file/:docId/:uid', function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        let docId = req.params['docId'];
        let userId = req.params['uid'];
        let fileInfo = fileMgr.queryfile(docId);
        res.download(fileInfo.storage);
    });

    app.post('/api/file/saveBack', function(req, res) {
        let body = req.body
        switch (body.action) {
            case 'saveBack': {
                if (body.data) {
                    let docId = body.data.docId;
                    let docURL = body.data.docURL;
                    let fileInfo = fileMgr.queryfile(docId);
                    if (fileInfo) {
                        console.log(`${fileInfo.title} saved back.`);
                        console.log(`fetch url: ${config.getConfig().editorHost}${docURL}`);
                        res.send({status:true})
                    }
                }
                break;
            }
        }
    });
}
