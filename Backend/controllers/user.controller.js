import userModel from '../models/user.model.js';
import { validationResult } from 'express-validator';
import * as userService from '../services/user.service.js';
import redisClient from '../services/redis.service.js';

export const createUserController = async (req,res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await userService.createUser(req.body);
      
        // console.log("��� User Created:", user);

        const token = await user.generateJWT();

        //console.log("🆕 Generated JWT Token:", token);

        delete user._doc.password;

        res.status(200).json({ user, token});
    } catch (err) {
        console.error(err);
        return res.status(400).json({ 
            msg: 'Invalid email or password please try again', 
            error: err.message 
         });
    }
}

export const loginUserController = async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email }).select('+password');
        

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.isValidPassword(password)

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        delete user._doc.password;

        // console.log("�� User Logged In:", user);

        const token = await user.generateJWT();
        res.status(200).json({ user, token });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ 
            msg: 'Server Error', 
            error: err.message 
         });    
    }
}

export const profileController = async (req, res) => {
    // console.log(req.user);

    res.status(200).json({ user: req.user});
}

export const logoutController = async (req, res) => {

    try {
        
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if(!token) {
            return res.status(400).json({ msg: 'You are not authorized' });
        }

        redisClient.set(token,'logout','EX',60*60*24);

        res.status(200).json({message: 'Logged out successfully' });

    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Server Error' });
    }
}


export const getAllUsersController = async (req, res) => {
    try {

        const loggedInUser = await userModel.findOne({ email: req.user.email });
        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        const userId = loggedInUser._id;
        

        const allUsers = await userService.getAllUser({userId});

        res.status(200).json({ allUsers });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ 
            msg: 'Server Error', 
            error: err.message 
         });
    }
}