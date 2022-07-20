const passport = require('passport');
const express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('pages/index.ejs'); // carga el archivo index.ejs
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('pages/profile.ejs', {
    useqr: re.user // obtiene el usuario de la sesion y pasa a la siguiente
  });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;