'use strict';

var query = require('./query');

module.exports.createArticle = function createArticle(username, headline, content, article_group, photo, cb) {
  
  var values = [username, headline, content, article_group, photo, new Date()],
   q = 'INSERT INTO articles ("user", headline, content, article_group, photo, date) VALUES($1, $2, $3, $4, $5, $6)';

  query(q, values, function (err) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, true);
    }
  });
};

module.exports.getArticles = function getArticles (limit, cb){
  var values = [limit];
  var q = 'SELECT * ' +
          'FROM articles ' +
          'ORDER BY date DESC LIMIT $1';
  console.log("runnign the get articles query");
  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};

module.exports.getArticleByGroup = function getArticleByGroup(article_group, limit, cb){
  var values = [article_group, limit];
  var q = 'SELECT * FROM articles WHERE article_group = $1 ORDER BY date DESC LIMIT $2';
  query(q, values, function(err, result){
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};

//Til að birta fréttir inná heimasvæði notanda, eins og teiknað var upps
module.exports.getArticleByUser = function getArticlesByUsers (limit, username, cb){
  var values = [limit, username];
  var q = 'SELECT * ' +
          'FROM articles ' +
          'WHERE "user" = $2' +
          'ORDER BY date DESC LIMIT $1';

  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};


//Til að birta einstaka frétt eftir ID
module.exports.getArticleByID = function getArticleByID (id, cb){
  var values = [id];
  var q = 'SELECT * FROM articles WHERE id = $1';

  query(q, values, function (err, result) {
    if (err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};

module.exports.deleteArticle = function deleteArticle(articleId, cb){
  var values = [articleId];
  var q = 'DELETE FROM articles WHERE id = $1';

  query(q, values, function(err, result){
    if(err) {
      return cb(err);
    } else {
      return cb(null, result);
    }
  });
};