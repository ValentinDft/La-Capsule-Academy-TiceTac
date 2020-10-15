var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'SNCF' });
});


router.get('/index', function(req, res, next) {
//   if(req.session.user == null){
//     res.redirect('/')
//   } else 
//     {
//       if(req.session.panier == undefined){
//         req.session.panier = []
//        }
// }
    res.render('index', {})
  
})


router.post('/resultat', function(req, res, next) {
  res.render('resultat', { title: 'SNCF' });
});

router.get('/noresult', async function(req, res, next){
  res.render('noresult', {})
})


router.get('/panier', async function(req, res, next){
  res.render('panier', {})
})


router.get('/delete-journeys', async function(req, res, next){
  res.render('panier', {})
})


router.get('/derniersvoyages', async function(req, res, next){
  res.render('derniersvoyages', {})
})









// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

  // Permet de savoir combien de trajets il y a par ville en base
  for(i=0; i<city.length; i++){

    journeyModel.find( 
      { departure: city[i] } , //filtre
  
      function (err, journey) {

          console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
      }
    )

  }


  res.render('index', { title: 'Express' });
});

module.exports = router;
