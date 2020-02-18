let path = require('path');
let fs = require('fs');
let crc = require('crc');
let mimeType = {
    "doc":  "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "xls":  "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "ppt":  "application/vnd.ms-powerpoint",
    "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "pdf": "application/pdf",
    "js":"application/javascript",
    "go":"text/plain"
}
let FilesMap = {

};  // id, file info

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
            let ext = file.substring(file.lastIndexOf(".")+1)
            let stat = fs.statSync(filePath);
            if (stat.isFile()) {
                let fileInfo = {
                    docId: crc.crc32(filePath).toString(16),
                    title: file,
                    mime_type: mimeType[ext],
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