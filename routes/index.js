var express = require('express');
var router = express.Router();

var journeyModel = require('../models/journeys')

const mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'SNCF' });
});


router.get('/index', function(req, res, next) {
  if(req.session.user == null){
    res.render('login')
  } 
  else 
    {
      if(req.session.panier == undefined){
        req.session.panier = []
       }
}
    res.render('index', {})
})

 

router.post('/resultat', async function(req, res, next) {
  if(req.session.user == null){
    res.render('login')
  } 
  else 
    { console.log("page resultat c'est bon")}

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

  let listeVoyages = await journeyModel.find();
  console.log(req.body.departure)
  let listeDateDisposParVille = await journeyModel.find({ departure : capitalizeFirstLetter(req.body.departure)});
  console.log(listeDateDisposParVille)
  let dateDispos = []
  for (let i=0;i<listeDateDisposParVille.length;i++ ){
      dateDispos.push(new Date(listeVoyages[i].date).getTime())
}
//  console.log(dateDispos)
  
  let ville =[];
  for (let i=0; i<listeVoyages.length; i++){
    ville.push(listeVoyages[i].departure.toLowerCase());
    ville.push(listeVoyages[i].arrival.toLowerCase());
    ville.push(new Date(listeVoyages[i].date).getTime())
  };

  console.log(new Date(req.body.dateDeparture).getTime())
  let resultatPositif = [];
  if(!ville.includes(req.body.departure.toLowerCase())
      || !ville.includes(req.body.arrival.toLowerCase())
        || !ville.includes(new Date(req.body.dateDeparture).getTime())
          || !dateDispos.includes(new Date(req.body.dateDeparture).getTime())
      )
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
        }
        // console.log(resultatPositif) 
  }
  res.render('resultat', {resultatPositif }); 
})



router.get('/noResult', async function(req, res, next){
  res.render('noResult', {})
})



router.get('/panier', async function(req, res, next){
  
  if(req.session.user == null){
    res.render('login')
  } 
  else 
    { console.log("page panier c'est bon")}

  if(req.session.panier == undefined){
    req.session.panier = []
  }
  let panier = req.session.panier
  console.log("panier" + panier )


  panier.push({
    departure : req.query.departure,
    arrival : req.query.arrival,
    price: req.query.price,
    date: req.query.date,
    departureTime : req.query.departureTime,
    quantity: 1
  })

  console.log( "panier rempli " +  panier); 

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
