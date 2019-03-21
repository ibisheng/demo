let path = require('path');
let fs = require('fs');

let config = null;

module.exports = {
    load() {
        let configFile = path.join(__dirname, '../config.json');
        config = JSON.parse(fs.readFileSync(configFile, 'utf8'));
    },
    getConfig() {
        return config;
    }
}