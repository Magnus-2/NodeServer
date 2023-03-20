'use strict'
var mongoose = require('mongoose')
User = mongoose.model('Contacts')
const jwt = require('jsonwebtoken');
    const secretkey = "egci427";


// exports.listAllUsers = function(req, res){
//     var query = { sort: { firstName: 1 } }
//     User.find({}, null, query, function(err, user){
//         if(err) throw err
//         //console.log(user)
//         res.json(user)
//     })
// }

exports.listAllUsers = function(req,res) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secretkey, function (err) {
            if (err) {
                res.sendStatus(403);
            } else {
                var query = { sort: { firstName: 1 } }
                User.find({}, null, query, function(err, user){
                    if(err) throw err
                    res.json(user)
                })
            }
        });
    } else {
        res.sendStatus(403);
    }
    
}

exports.createAUser = function(req, res){
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secretkey, function (err) {
            if (err) {
                res.sendStatus(403);
            } else {
                var newUser = new User(req.body)
                console.log(req.body)
                newUser.save(function(err, user){
                    if(err) throw err
                    res.json(user)
                })
            }
        });
    } else {
        res.sendStatus(403);
    }
    
}

exports.readAUser = function(req, res){
    //console.log(req.params.userId)
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secretkey, function (err) {
            if (err) {
                res.sendStatus(403);
            } else {
                User.findById(req.params.userId, function(err, user){
                    if(err) throw err
                    res.json(user)
                })
            }
        });
    } else {
        res.sendStatus(403);
    }
   
}

exports.deleteAUser = function(req, res){
    //console.log(req.params.userId)
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secretkey, function (err) {
            if (err) {
                res.sendStatus(403);
            } else {
                User.findByIdAndRemove(req.params.userId, function(err, user){
                    if(err) throw err
                    const response = {
                        message: "Delete user id: "+ req.params.userId +" successfully",
                        id: user._id
                    }
                    res.json(response)
                })
            }
        });
    } else {
        res.sendStatus(403);
    }
    // User.findByIdAndRemove(req.params.userId, function(err, user){
    //     if(err) throw err
    //     const response = {
    //         message: "Delete user id: "+ req.params.userId +" successfully",
    //         id: user._id
    //     }
    //     res.json(response)
    // })
}

exports.updateAUser = function(req, res){
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token, secretkey, function (err) {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(req.params.userId)
                var newUser = {}
                newUser = req.body
                console.log(newUser)
                User.findByIdAndUpdate(req.params.userId, newUser, {new: true}, function(err, user){
                    if(err) throw err
                    console.log(user)
                    res.json(user)
                })
            }
        });
    } else {
        res.sendStatus(403);
    }
    
}

// exports.ensureToken = function(req, res, next) {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }
