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
    })
  
    var newUserSave = await newUser.save();
  
    req.session.user = {
      email: newUserSave.email,
      id: newUserSave._id,
    }
  
    console.log(req.session.user)
  
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
      mail: searchUser.mail,
      id: searchUser._id
    }
    res.redirect('/index')

  } else {
    res.render('login')
  }

  
})

router.get('/logout', function(req,res,next){
  req.session.user = null;
  res.redirect('/login')
})


router.get('/derniersvoyages', async function(req, res, next){

  var userSessionAffichage = await UserModel.
  findById(req.query.id)
  .populate('joureys')
  .exec();

  res.render('derniersvoyages', {})
})





module.exports = router;
