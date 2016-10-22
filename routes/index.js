var express = require('express');
var router = express.Router();

//Hérna er fyrsta route, þegar það er sótt '/' þá köllum við á fallið homePage
router.get('/', homePage);

//Hérna er fall, það renderar jade skjalið 'index' undir möppunni views og er með json gögn, með eina breytu title sem inniheldur "Express".
//sbr. hvernig jade tekur json gögnin og notar þau í templating.
function homePage(req, res, next) {
  res.render('index', { title: 'Express' });
};

module.exports = router;
