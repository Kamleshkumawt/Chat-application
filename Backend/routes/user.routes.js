import { Router } from "express";
import * as userControllers from '../controllers/user.controller.js'
import {body} from 'express-validator'
import * as authMiddleware from '../middlewares/user.middleware.js';


const router = Router();

// Define endpoints
router.post('/register',
    body('fullname').isLength({ min: 3 }).withMessage('fullname must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 4 }).withMessage('Password must be at least 6 characters long'),
    userControllers.createUserController
)

router.post('/login',
    userControllers.loginUserController
)

router.get('/profile',
    authMiddleware.authUser,
    userControllers.profileController
)

router.get('/logout',
    authMiddleware.authUser,
    userControllers.logoutController
);

router.get('/all-users',
    authMiddleware.authUser,
    userControllers.getAllUsersController
)

export default router;