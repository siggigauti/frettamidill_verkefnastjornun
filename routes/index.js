var express = require('express');
var router = express.Router();

//Hérna er fyrsta route, þegar það er sótt '/' þá köllum við á fallið homePage
router.get('/', homePage);
router.get('/frett', frettPage);
router.get('/skrifa', skrifaPage);
router.get('/user', userPage);
router.get('/admin', adminPage);

//Hérna er fall, það renderar jade skjalið 'index' undir möppunni views og er með json gögn, með eina breytu title sem inniheldur "Express".
//sbr. hvernig jade tekur json gögnin og notar þau í templating.
function homePage(req, res, next) {
  res.render('index', { title: 'Express' });
};

//imgsrc er optional
//undirfrett1-3 eru optional
//imgsrc í undirfréttum eru optional
function frettPage(req, res, next) {
  res.render('frett', { rithofundur: "Jón Jónsson",
                        undirfrett1: {url: "#", imgsrc: "banner.png", title: "Frétt 1"},
                        undirfrett2: {url: "#", imgsrc: "banner.png", title: "Frétt 2"},
                        undirfrett3: {url: "#", imgsrc: "banner.png", title: "Frétt 3"},
                        dags: "20 Apríl 2016",
                        groups: [{url: "#", text: "Íþróttir"}, {url: "#", text: "Pólitík"}],
                        title: "Titill",
                        imgsrc: 'banner.png',
                        texti: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  });
};

function skrifaPage(req, res, next) {
  res.render('skrifa', { title: "Hér skrifar maður nýja fréttir"
  });
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
