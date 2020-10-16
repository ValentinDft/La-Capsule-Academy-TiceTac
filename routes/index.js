var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journeys')


const mongoose = require('mongoose');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'SNCF' });
});


router.get('/index', function(req, res, next) {
//   if(req.session.user == null){
//     res.render('login')
//   } 
//   else 
//     {
//       if(req.session.panier == undefined){
//         req.session.panier = []
//        }
// }
    res.render('index', {})
})

 

router.post('/resultat', async function(req, res, next) {
  let listeVoyages = await journeyModel.find();
  let resultatPositif = [];
  let ville =[];

  for (let i=0; i<listeVoyages.length; i++){
    ville.push(listeVoyages[i].departure.toLowerCase());
    ville.push(listeVoyages[i].arrival.toLowerCase());
  };


  if(!ville.includes(req.body.departure.toLowerCase())
      || !ville.includes(req.body.arrival.toLowerCase())  )
  {
    res.redirect('/noResult')
  } else {

    for (let i=0; i<listeVoyages.length; i++){
            if(  req.body.departure.toLowerCase() == listeVoyages[i].departure.toLowerCase()
                && req.body.arrival.toLowerCase()==listeVoyages[i].arrival.toLowerCase()
                   && new Date (req.body.dateDeparture).getTime() == new Date(listeVoyages[i].date).getTime()
                )
        {
           resultatPositif.push(listeVoyages[i] );      
           } 
        }console.log(resultatPositif) 
  }
  res.render('resultat', {resultatPositif }); 
})



router.get('/noResult', async function(req, res, next){
  res.render('noResult', {})
})



router.get('/panier', async function(req, res, next){
  
  // if(req.session.panier == undefined){
  //   req.session.panier = []
  // }

  // let dejaDansLepanier = false;

  // for(var i = 0; i< req.session.panier.length; i++){
  //   if(req.session.panier[i].id == req.query.id){
  //     req.session.panier[i].quantity = Number(req.session.panier[i].quantity) + 1;
  //     dejaDansLepanier = true;
  //   }
  // }

  // if(dejaDansLepanier == false){
  //     req.session.panier.push({
  //     departure: req.query.req.query.departure,
  //     arrival: req.query.arrival,
  //     price: req.query.bikePriceFromFront,
  //     id: req.query.bikePriceFromFront,
  //     quantity: 1
  //   })
  // }
  // console.log(req.session.panier)
  panier = [];

  panier.push({
    departure : req.query.departure,
    arrival : req.query.arrival,
    price: req.query.price,
    departureTime : req.query.departureTime,
    // id : req.query.id,
    quantity: 1
  })

  console.log(panier);

  res.render('panier', {panier})
})


router.get('/delete-journeys', async function(req, res, next){
  panier.splice(req.query.position,1);
  // req.session.panier.splice(req.query.id,1);
  res.render('panier', {})
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
