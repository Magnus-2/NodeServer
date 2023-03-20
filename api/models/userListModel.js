'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ContactsSchema = new Schema({
    firstName: {
        type: String,
        Required: 'Please enter'
    },
    lastName: {
        type: String,
        Required: 'Please enter'
    },
    mobileNo: {
        type: String,
        Required: 'Please enter'
    },
    email: {
        type: String,
    },
    facebook:{
        type: String,
    },
    imageUrl: {
        type: String,
    },
    
})

module.exports = mongoose.model('Contacts', ContactsSchema)