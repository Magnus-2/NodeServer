
const express = require('express');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const secretkey = "egci427";

mongoose.connect('mongodb+srv://cloud:bPKDrNLTOX7v1BKz@contactlist.kogzfoe.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Failed to connect to MongoDB', err))

const Account = mongoose.model('accounts', {
    username: String,
    password: String
});

app.get('/', function (req, res) {
    res.json({description: 'Login API'});
});

app.post('/', async (req, res) => {

    var user = req.body;
    console.log(user.username, user.password)
    var account = await Account.findOne({username: user.username, password: md5(user.password)})

    if (account) {
        const token = jwt.sign({
            user: user.username
        }, secretkey);
        res.json({message: 'Authenticated! Use this token in the "Authorization" header', token: token});
    } else {
        res.json({message: 'username or password is invalid',  "user": {
            "username": user.username,
            "password": user.password
        }})
    }
});

app.get('/protected', ensureToken, (req, res) => {
    jwt.verify(req.token, secretkey, function (err, data) {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({description: 'Protected information. Congrats!', data: data});
        }
    });
})

function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = app;
