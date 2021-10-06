import { UsersDB, Token, ErrorMessage } from "../interfaces"
const express = require('express');
import e, { Request, Response } from "express"
const router = express.Router();
const path = require('path')
const app = express()
import { isValidUser, sendToken } from '../appLogic/login'
// let cookieParser = require('cookie-parser')
// app.use(cookieParser())
router.use(require('../middlewares/loginMiddleware'))

export const token: Token = {
    'token': 'token',
}

export const users: UsersDB = {
    'asergeev@flo.team': 'jgF5tn4F',
    'vkotikov@flo.team': 'po3FGas8',
    'tpupkin@flo.team': 'tpupkin@flo.team',
}

// app.use(express.static(path.join(__dirname, '../static/pages')))

router.options('/', (req: Request, res: Response) => {

    res.header('Application-Type', 'multipart/form-data');
    
    res.send();
    
})

router.get('/', function(req: Request, res: Response){
    res.sendFile(path.join(__dirname, '../static/pages/index.html'))
 });


 router.post('/', function(req: Request, res: Response){
    if (isValidUser(req)){
        res.cookie('token', 'token')
        res.status(200);
        res.send(sendToken())
    } else {
        res.status(401);
        res.send({ errorMessage: 'Invalid email or password'});
    }
 });

 module.exports = router;
