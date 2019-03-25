var crypto = require('crypto');
let config = require('./config');
module.exports = function (arg) {
    let apiKey = config.getConfig().apiKey;
    var hmac = crypto.createHmac('md5', apiKey);
    data = hmac.update(arg);
    gen_hmac= data.digest('hex');
    return gen_hmac
};
