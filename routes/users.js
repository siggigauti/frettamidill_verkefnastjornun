var express = require('express');
var router = express.Router();
var users = require('../lib/users');
var ensureLoggedIn = require('../middleware/ensureLoggedIn');
var userAuth = require('../lib/userAuthentication');

router.get('/login', redirectIfLoggedIn, loginForm);
router.post('/login', loginIfExists, loginHandler);
router.get('/signup', redirectIfLoggedIn, signupForm);
router.post('/signup', checkIfExists, signupHandler);

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

function signupForm(req, res, next) {
  var data = {
    post: false,
    exists: false
  }
  res.render('signup', data);
}

function checkIfExists(req, res, next) {
  var username = req.body.username;
  users.finnaNotanda(username, function (err, result){
    if(result.length === 1){
      var data = {
        exists: true,
        post: true,
        success: false
      };
      res.render('signup', data);
    }
    else{
      next();
    }
  });
};


function signupHandler(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var display_name = req.body.displayname;
  var email = req.body.email;
  users.createUser(display_name, username, password, email, function (err, status) {
    if (err) {
      console.error(err);
    }

    var success = true;
    var user = "";

    if (err || !status) {
      success = false;
    }

    var data = {
      exists: false,
      post: true,
      success: success,
    };
    res.render('signup', data);
  });
};

function loginIfExists(req, res, next) {
  var username = req.body.username;
  users.finnaNotanda(username, function (err, result){
    if(result.length === 1){

      next();
    }
    else{
      var data = {
        exists: false, 
        post: true, 
        success: false, 
        wrongPass: false
      };
      res.render('login', data);
    }
  });
};


function loginHandler(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  
  userAuth.auth(username, password, function (err, user) {

    if (user) {
      req.session.regenerate(function (){
        req.session.user = user;
        res.redirect('/');
      });
    } 
    else {
      var data = {
        exists: true,
        post: true, 
        success: false, 
        wrongPass: true, 
      };
      res.render('login', data);
    }
  });
};


module.exports = router;