import { Router } from 'express'
import * as projectControllers from '../controllers/project.controller.js';
import {body} from 'express-validator'
import * as authMiddleware from '../middlewares/user.middleware.js';

const router = Router()


// Define endpoints
router.post('/create', 
    body('name').notEmpty().withMessage('Project name is required'),
    authMiddleware.authUser,
    projectControllers.createProjectController);

router.get('/get-all', 
    authMiddleware.authUser,
    projectControllers.getAllProjectsController);


router.put('/add-user', authMiddleware.authUser,
    body('projectId').isString().withMessage('Project id is required'),
    body('users').isArray({min: 1}).withMessage('user must be an array of strings').bail()
    .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
    projectControllers.addUserToProjectController);


router.get('/get-project/:projectId', authMiddleware.authUser,
    projectControllers.getProjectByIdController);

export default router