const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = process.env;
const authCtrl = {};
const Answers = require('../classes/Answers');

authCtrl.signUp = async (req, res, next) => {
    const admin = await User.find({})
    if (admin.length === 1) {
        const answer = await new Answers((message = 'There is one admin. Please Login.'));
        return res.status(401).json(answer)
    } else {
        const { username, password} = req.body;
        const user = new User({
            username,
            password
        });
        user.password = await user.encryptPassword(user.password)
        await user.save();
        const token = jwt.sign({id: user._id}, JWTSECRET, {
            expiresIn: 60 * 60 * 1
        })
        const answer = await new Answers((message = {auth: true, token}));
        return res.status(201).json(answer)
    };
};
authCtrl.logIn = async (req, res, next) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username})
    if (!user) {
        const answer = await new Answers((message = 'The Username doesn´t exist'));
        return res.status(401).json(answer)
    } 
    const validPassword = await user.validatePassword(password);
    if (!validPassword) {
        const answer = await new Answers((message = {auth: false, token: null}));
        return res.status(401).json(answer)
    }
    const token = jwt.sign({id: user._id}, JWTSECRET, {
        expiresIn: 60 * 60 * 1
    })
    const answer = await new Answers((message = {auth: true, token}));
    return res.status(201).json(answer)
};
module.exports = authCtrl;