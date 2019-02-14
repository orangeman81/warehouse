const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {
    login: function (req, res) {
        passport.authenticate('local', function (err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user
                });
            }
            req.logIn(user, function (err) {
                if (err) res.send(err);
                const token = jwt.sign(user, jwtSecret, { expiresIn: 180 * 60 });
                return res.send({
                    token,
                    message: info.message,
                    user
                });
            });
        })(req, res);
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    }
};