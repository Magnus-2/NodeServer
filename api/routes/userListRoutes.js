'use strict'
module.exports = function(app){
    var userList = require('../controllers/userListController')
    // const jwt = require('jsonwebtoken');
    // const secretkey = "egci427";

    app.route('/users')
        .get(userList.listAllUsers)
        .post(userList.createAUser)

    app.route('/users/:userId')
        .get(userList.readAUser)
        .delete(userList.deleteAUser)
        .post(userList.updateAUser)

        
}

