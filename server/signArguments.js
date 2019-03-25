var crypto = require('crypto');
var apiKey = '45ae1f8b5d50ea9322a3d8e3326ca0f9';

module.exports = function (arg) {
    var hmac = crypto.createHmac('md5', apiKey);
    data = hmac.update(arg);
    gen_hmac= data.digest('hex');
    return gen_hmac
};