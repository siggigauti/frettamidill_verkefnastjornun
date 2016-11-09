'use strict';

var query = require('./query');
var passwordHash = require('password-hash');
var hash = require('./pass');

/*
module.exports.createUser = function createUser(display_name, username, password, email, cb) {
  
  var hashedpassword = passwordHash.generate(password);
  
  var values = [display_name, username, hashedpassword, email],
   q = 'INSERT INTO users (display_name, username, password, email) VALUES($1, $2, $3, $4)';

  query(q, values, function (err) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, true);
    }
  });
};*/

function createUserWithHashAndSalt (display_name, username, salt, hash, email, cb) {
  var values = [display_name, username, hash, email, salt],
   q = 'INSERT INTO users (display_name, username, password, email, salt) VALUES($1, $2, $3, $4, $5)';

  query(q, values, function (err) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, true);
    }
  });
};

module.exports.createUser = function createUser (display_name, username, password, email cb) {
  hash(password, function (err, salt, hash) {
    if (err) {
      console.log('Villa við að hasha pass');
      return cb(err);
    }

    createUserWithHashAndSalt(username, salt, hash, cb);
  });
};

module.exports.getUser = function getUser (userId, cb){
  var values = [userId];
  var q = 'SELECT * ' +
          'FROM users ' +
          'WHERE id = $1';

  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};
