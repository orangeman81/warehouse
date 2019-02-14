const jwtSecret = sails.config.secrets.jwtSecret;
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    let token;

    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0],
                credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        } else {
            return json(401, res, "Format is Authorization: Bearer [token]");
        }
    } else if (req.param('token')) {
        token = req.param('token');

        delete req.query.token;
    } else {
        return json(401, res, "No authorization header was found");
    }

    verify(token, function (err, decoded) {
        if (err) return json(401, res, "Invalid Token!");
        req.token = token;
        User.findOne({ id: decoded.id }).then(function (user) {
            req.current_user = user;
            next();
        })
    });

}

function verify(token, callback) {
    return jwt.verify(token, jwtSecret, callback);
}

function json(status, res, message, data, meta) {
    var response = {
        response: {
            message: message
        }
    };
    if (typeof data !== 'undefined') {
        response.response.data = data;
    }
    if (typeof meta !== 'undefined') {
        response.response.meta = meta;
    }
    return res.status(status).json(response);
}