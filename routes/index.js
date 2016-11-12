var express = require('express');
var router = express.Router();
var article = require('../lib/articles');
var users = require('../lib/users');
var ensureLoggedIn = require('../middleware/ensureLoggedIn');

//Hérna er fyrsta route, þegar það er sótt '/' þá köllum við á fallið homePage
router.get('/', homePage);
router.get('/frett/:id', frettPage);
router.get('/groups/:article_group', groupPage);
router.get('/skrifa', ensureLoggedIn, skrifaPage);
router.post('/skrifa', ensureLoggedIn, skrifaHandler);
router.get('/user', ensureLoggedIn, userPage);
router.post('/user', ensureLoggedIn, userHandler);
//router.get('/admin', adminPage);


//Hérna er fall, það renderar pug skjalið 'index' undir möppunni views og er með json gögn, með eina breytu title sem inniheldur "Express".
//sbr. hvernig jade tekur json gögnin og notar þau í templating.
function homePage(req, res, next) {
  console.log("getting articles...");
  article.getArticles(7, function (err, result) {
    var user;
    if(req.session.user){
      user = req.session.user; 
    }
    var data = {
      frettir: result.rows,
      user: user
    };
    res.render('index', data);
  });
};

function skrifaPage(req, res, next){
  var user;
  if(req.session.user){
    user = req.session.user; 
  }
  var data = {
    user: user
  }
  res.render('skrifa', data);
};

function skrifaHandler(req, res, next){
  var headline = req.body.headline;
  var content = req.body.content;
  var article_group = req.body.article_group;
  var user = req.session.user.display_name;
  var photo = req.body.photo;
  article.createArticle(user, headline, content, article_group, photo, function(err, result){
    article.getArticleByUser(1, user, function(err, result){
      console.log(result);
      var redirPath = result.rows[0].id;
      res.redirect('/frett/'+redirPath);
    });
  });
};

function groupPage(req, res, next) {
  article.getArticleByGroup(req.params.article_group, 16, function(err, result) {
    var user;
    if(req.session.user){
      user = req.session.user; 
    }
    var data = {
      title: req.params.article_group,
      frettir: result.rows,
      user: user
    };
    res.render('index', data);
  });
};

//imgsrc er optional
//undirfrett1-3 eru optional
//imgsrc í undirfréttum eru optional
function frettPage(req, res, next) {
  
  article.getArticleByID(parseInt(req.params.id), function(err, result) {
    var user;
    if(req.session.user){
      user = req.session.user; 
    }
    var data = {
      frett: result.rows,
      user: user
    };
    res.render('frett', data);
  });
};


//posts er optional
function userPage(req, res, next) {
  var user;
  if(req.session.user){
    user = req.session.user; 
  }
  article.getArticleByUser(20, user.username, function(err, result){
    var data = {
      title: "Notendasíða",
      frettir: result.rows,
      user: user
    };
    res.render('user', data);
  });
};

function userHandler(req, res, next){
  var display_name = req.body.display_name;
  var password = req.body.password;
  var email = req.body.email;
  var updatePass = true;
  var user;
  if(req.session.user){
    user = req.session.user;
  }
  if(display_name.length == 0){
    display_name = user.display_name;
  }
  if(password.length == 0){
    password = user.password;
    updatePass = false;
  }
  if(email.length == 0){
    email = user.email;
  }
  users.updateUser(display_name, password, updatePass, email, user.id, function(err, result){
    res.redirect('/user');
  });
}

//frettir er optional
function adminPage(req, res, next) {
  res.render('admin', { title: "Admin síðan",
                        frettir: [{title: "Frétt sem á að henda", url: "#"},
                                  {title: "Önnur frétt", url: "#2"}]
  });
};

module.exports = router;
