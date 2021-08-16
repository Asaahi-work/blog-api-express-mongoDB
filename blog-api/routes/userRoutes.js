const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const User = require('../models/userModel.js')
const userRouter = express.Router()
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils.js')

//get users
userRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const data = await User.find({})
    res.status(200).send(data)
}))
 
//register
userRouter.post('/register', expressAsyncHandler(async (req, res) => {
    const existingUser = await User.findOne({email: req.body.email})

    if(existingUser) {
        res.status(401).send({message: 'This email already exists.'})
    }

    if(req.body.password.length < 8) {
        res.status(401).send({message: 'min 8chrs.'})
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password), 
    })

    const createdUser = await user.save()

    res.status(201).send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        token: generateToken(createdUser),
    })

}))

//login
userRouter.post('/login', expressAsyncHandler(async (req, res) => {
    const existingUser = await User.findOne({email: req.body.email})

    if(existingUser) {
            if (bcrypt.compareSync(req.body.password, existingUser.password)) {
                res.status(200).send({
                    _id: existingUser._id,
                    name: existingUser.name,
                    email: existingUser.email,
                    token: generateToken(existingUser)
                })
                return
            }
    }
    res.status(401).send({message: 'Invalid email or password.'})
}))

module.exports = userRouter