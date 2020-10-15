var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journeys')
var userModel = require('../models/users')

const mongoose = require('mongoose');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'SNCF' });
});


router.get('/index', function(req, res, next) {
  dateDebut = Date(2018-11-20)
  dateFin = Date(2018-11-24)
//   if(req.session.user == null){
//     res.redirect('/')
//   } else 
//     {
//       if(req.session.panier == undefined){
//         req.session.panier = []
//        }
// }

    res.render('index', {dateDebut, DateFin})
  
})


router.post('/resultat', async function(req, res, next) {
  listeVoyages = await journeyModel.find();
  dateDebut = Date(2018-11-20)
  dateFin = Date(2018-11-24)
  let resultatPositif = [];
 
  for (let i=0; i<listeVoyages.length; i++){
    if (req.body.departure != listeVoyage[i].departure 
          || req.body.arrival != listeVoyage[i].arrival
            // || req.body.timeDeparture < dateDebut
            //   || req.body.timeDeparture > dateFin
            ){res.redirect('noResult', {})
          } 
            else if (listeVoyages[i].departure == req.body.departure 
               && listeVoyages[i].departure == req.body.arrival
               // && req.body.dayDeparture >= dateDebut 
                //   && req.body.dayDeparture <= dateFin
                 )
          {resultatPositif.push( listeVoyages[i] ) }
  }

  res.render('resultat', { resultatPositif });
});


router.get('/noResult', async function(req, res, next){
  res.render('noResult', {})
})



router.get('/panier', async function(req, res, next){
  panier = [];

  panier.push({
    departure : req.query.departure,
    arrival : req.query.arrival,
    price: req.query.price,
    departureTime : req.query.departureTime,
    quantity: 1
  })

  res.render('panier', {panier})
})


router.get('/delete-journeys', async function(req, res, next){
  panier.splice(req.query.position,1)
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
