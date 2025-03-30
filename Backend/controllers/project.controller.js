import projectModel from '../models/project.model.js';
import userModel from '../models/user.model.js';
import * as projectService from '../services/project.service.js';
import {validationResult} from 'express-validator'

export const createProjectController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const {name} = req.body;

        const loggedInUser = await userModel.findOne({ email: req.user.email}); 

        console.log('loggedInUser',loggedInUser)
        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        } 
        const userId = loggedInUser._id;

        const groupPhoto = 'https://avatar.iran.liara.run/public';

        const newProject = await projectService.createProject({
            name,
            image: groupPhoto,
            userId
        });

        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Server Error',
            error: err.message 
         });
    }
}

export const getAllProjectsController = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        const userId = loggedInUser._id;

        const Project = await projectService.getAllProjects({userId});
        
        res.status(200).json({Project});
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Server Error',
            error: err.message
         });
    }
}


export const addUserToProjectController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { users, projectId} = req.body;

        const loggedInUser = await userModel.findOne({ email: req.user.email });
        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        const userId = loggedInUser._id;

        const project = await projectService.addUserToProject({
            projectId,
            users,
            userId
        });
        res.status(200).json({project});

    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: 'Server Error',
            error: err.message
         });
        }
}

export const getProjectByIdController = async (req, res) => {
    try {
        const { projectId } = req.params;

        console.log('projectId:',projectId);
        const project = await projectService.getProjectById({projectId});
        res.status(200).json({project});
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: 'Server Error',
                error: err.message
             });
        }
}