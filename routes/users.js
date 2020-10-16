var express = require('express');
var router = express.Router();
var userModel = require('../models/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});



router.post('/sign-up', async function(req,res,next){
console.log(req.body.lastname)
  var searchUser = await userModel.findOne({
    email: req.body.email
  })
  
  if(!searchUser){
    var newUser = new userModel({
      lastName: req.body.lastName,
      firstName : req.body.name,
      email: req.body.email,
      password: req.body.password,
      journeys : []
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      email: newUserSave.email,
      id: newUserSave._id,
      journeys: newUser.journeys
    }
    console.log("apres sign up" + req.session.user )
  
    res.redirect('/index')
  } else {
    res.redirect('/login')
  }
  
})

router.post('/sign-in', async function(req,res,next){

  var searchUser = await userModel.findOne({
    email: req.body.email,
    password: req.body.password
  })

  if(searchUser!= null){
    req.session.user = {
      email: searchUser.email,
      id: searchUser._id,
      journeys: searchUser.journeys
    }
    console.log("apres sign up" + req.session.user + req.session.user.id )
    res.redirect('/index')

  } else {
    res.redirect('/index')
  }

  
})

router.get('/logout', function(req,res,next){
  req.session.user = null;
  res.redirect('/index')
})


router.get('/derniersvoyages', async function(req, res, next){
  let voyage = JSON.parse(req.query.voyage);
  userActuel= await userModel.find({email : req.session.user.email})
  let ancienVoyages = userActuel[0].journeys
   for(let i=0; i<voyage.length; i++){
    ancienVoyages.push(voyage[i])
   }
  console.log(ancienVoyages)
  await userModel.updateOne({ email: userActuel[0].email },  { journeys: ancienVoyages } )
  res.render('derniersvoyages', {ancienVoyages})
})


router.get('/lastTrip', async function(req, res, next){
  userActuel= await userModel.find({email : req.session.user.email})
  let ancienVoyages = userActuel[0].journeys
  res.render('derniersvoyages', {ancienVoyages})
})
module.exports = router;
