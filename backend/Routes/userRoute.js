const routerUser = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const { User } = require('../models/User')
const {signupCtrl,loginCtrl} = require('../controllers/authControllers')




routerUser.post('/signup',signupCtrl)


routerUser.post('/login',loginCtrl)



    

    module.exports = routerUser;
