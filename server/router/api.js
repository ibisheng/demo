let fileMgr = require('../fileMgr')
let config = require('../config')

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

    function onGetEditor(req, res, suffix) {
        let docId = req.params['docId'];
        let userId = 'guest';
        let callback = Buffer.from(`${config.getConfig().editorCaller}/api/fileAcl/${docId}/${userId}`).toString('base64');
        let url = `${config.getConfig().editorHost}/apps/editor/${suffix}?callURL=${callback}`;
        res.send({
            'url': url
        });
    }

    app.get('/api/file/view/:docId', function(req, res) {
        onGetEditor(req, res, 'openPreview');
    });

    app.get('/api/file/edit/:docId', function(req, res) {
        onGetEditor(req, res, 'openEditor');
    });

    app.get('/api/fileAcl/:docId/:uid', function(req, res) {
        let docId = req.params['docId'];
        let userId = req.params['uid'];
        let fileInfo = fileMgr.queryfile(docId);
        res.send({
            doc: {
                docId: fileInfo.docId,
                title: fileInfo.title,
                mime_type: fileInfo.mime_type,
                fetchUrl: `${config.editorCaller}/api/file/${fileInfo.docId}/${userId}`
            },
            user: {
                uid: userId,
                oid: userId,
                nickName: userId,
                avatar: '',
                privilege: [
                    'FILE_READ',
                    'FILE_WRITE',
                    'FILE_DOWNLOAD',
                    'FILE_PRINT'
                ]
            }
        });
    });

    app.get('/api/file/:docId/:uid', function(req, res) {
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
                        console.log(`fetch url: ${docURL}`);
                    }
                }
                break;
            }
        }
    });
}