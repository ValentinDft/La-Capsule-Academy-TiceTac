var mongoose = require('./connection')

var JourneysUserSchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number
})


var userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    journeys :[JourneysUserSchema],
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;