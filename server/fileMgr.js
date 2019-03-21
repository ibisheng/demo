let path = require('path');
let fs = require('fs');
let crc = require('crc');

let FilesMap = {};  // id, file info

function queryFileList() {
    return FilesMap
}

function queryfile(docId) {
    return FilesMap[docId];
}

function loadFiles(callback) {
    let storagePath = path.join(__dirname, '../storage');
    fs.readdir(storagePath, function(err, files) {
        if (err) {
            callback(err);
            return;
        }

        for (let i = 0; i < files.length; ++i) {
            let file = files[i];
            let filePath = path.join(storagePath, file);
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                let fileInfo = {
                    docId: crc.crc32(filePath).toString(16),
                    title: file,
                    mime_type: '',
                    storage: filePath,
                };

                FilesMap[fileInfo.docId] = fileInfo;
            }
        }
        
        callback();
    });
}

module.exports = {
    queryFileList,
    queryfile,
    loadFiles
}