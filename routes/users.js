var express = require('express');
var router = express.Router();
var users = require('../lib/users');
var ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.get('/login', redirectIfLoggedIn, loginForm);
var express = require('express');
var router = express.Router();
var users = require('../lib/users');
var ensureLoggedIn = require('../middleware/ensureLoggedIn');

router.get('/login', redirectIfLoggedIn, loginForm);
router.post('/login', loginHandler);

function redirectIfLoggedIn(req, res, next) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

function loginForm(req, res, next) {
  var data = {
    title: "login"
  };
  res.render('login', data);
};

/*
function loginHandler(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  users.auth(username, password, function (err, user) {
    if (user) {
      req.session.regenerate(function (){
        req.session.user = user;
        res.redirect('/');
      });
    } 
    else {
      var data = {
        title: "login"
      };
      res.render('login', data);
    }
  });
};
*/