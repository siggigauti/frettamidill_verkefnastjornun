'use strict';

var query = require('./query');
var hash = require('./pass').hash;


function findUser (username, cb) {
  var values = [username];
  var q = 'SELECT * FROM users WHERE username = $1';
  
  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result.rows);
    }
  });
};
/*
module.exports.signin = function signin(username, passwordFromUser, cb) {

  var correctPassword = false;
  var password;
  qPW = 'SELECT password FROM users WHERE username = $1';
  var valuesPW = [username];

  query(qPW, valuesPW, function (err, result) {
    if (err) {
      return cb(err);
    } 
    var passwordR =  result.rows[0];

    if(passwordR){
      password = passwordR.password;
      correctPassword = passwordHash.verify(passwordFromUser, password);
    }

    if(!correctPassword){
      res.render('login', 
        {msg : 'Vitlaust notendanafn og/eða lykilorð.'}
      );  
    }
    
    var q= 'SELECT * FROM users WHERE username = $1 AND password = $2';
    var values = [username, password];

    query(q, values, function (err, result){
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      var user =  result.rows[0];

      if (user) {
        req.session.regenerate(function(){
          req.session.user = user;
          res.redirect('/wall');
        });
      }
      else {
        res.render('login');
      }
    });
  });
};*/

module.exports.auth = function auth (name, pass, fn) {

  findUser(name, function (err, result) {

    var user = result[0];

    hash(pass, user.salt, function(err, hash){
      if (err) {
        return fn(err);
      }

      if (hash === user.password) {
        return fn(null, user);
      }

      fn(new Error('invalid password'));
    });
  });
};