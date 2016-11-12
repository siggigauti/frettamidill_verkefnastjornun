var express = require('express');
var router = express.Router();
var article = require('../lib/articles');
var ensureLoggedIn = require('../middleware/ensureLoggedIn');

//Hérna er fyrsta route, þegar það er sótt '/' þá köllum við á fallið homePage
router.get('/', homePage);
router.get('/frett/:id', frettPage);
router.get('/newArticle', ensureLoggedIn, newArticleForm);
router.get('/:article_group', groupPage);
//router.get('/user', userPage);
//router.get('/admin', adminPage);


//Hérna er fall, það renderar pug skjalið 'index' undir möppunni views og er með json gögn, með eina breytu title sem inniheldur "Express".
//sbr. hvernig jade tekur json gögnin og notar þau í templating.
function homePage(req, res, next) {
  console.log("getting articles...");
  article.getArticles(7, function (err, result) {
    var data = {
      frettir: result.rows
    };
    res.render('index', data);
  });
};

function groupPage(req, res, next) {
  article.getArticleByGroup(req.params.article_group, 16, function(err, result) {
    var data = {
      title: req.params.article_group,
      frettir: result.rows
    };
    res.render('index', data);
  });
};

//imgsrc er optional
//undirfrett1-3 eru optional
//imgsrc í undirfréttum eru optional
function frettPage(req, res, next) {
  
  article.getArticleByID(parseInt(req.params.id), function(err, result) {
    var data = {
      items: result.rows
    };
    res.render('frett', data);
  });
};

function newArticleForm(req, res, next) {
  var data = {
    user: req.session.user.username,
    currURL: '/newStory'
  }
  res.render('skrifa', data);
};

//posts er optional
function userPage(req, res, next) {
  res.render('user', { title: "Notendasíðan",
                       posts: [{title: "Þetta er frétt", url: "#"},
                               {title: "Þetta er frétt 2", url: "#"},
                               {title: "Þetta er frétt 3", url: "#"}]
  });
};

//frettir er optional
function adminPage(req, res, next) {
  res.render('admin', { title: "Admin síðan",
                        frettir: [{title: "Frétt sem á að henda", url: "#"},
                                  {title: "Önnur frétt", url: "#2"}]
  });
};

module.exports = router;
