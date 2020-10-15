var mongoose = require('./connection')

var userSchema = mongoose.Schema({
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    journeys :{ type:mongoose.Schema.Types.ObjectId, ref: 'journeys'},
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel;