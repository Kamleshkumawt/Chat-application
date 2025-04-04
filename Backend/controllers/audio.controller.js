import audioModel from "../models/audio.model.js";
import userModel from "../models/user.model.js";
import { validationResult } from "express-validator";
import * as audioService from "../services/audio.service.js"
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getReceiverSocketId } from '../server.js';

import { io } from '../server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



export const createAudioController = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // const { audioFile } = req.body;
        const audioFile = req.file;

        // console.log('AudioFiles',audioFile);

        const {receiverId} = req.params;

        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const senderId = loggedInUser._id;

        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }

        const audio = await audioService.createAudio({
            senderId,
            receiverId,
            audioFile
        });

         const receiverSocketId = getReceiverSocketId(receiverId);
                 if (receiverSocketId) {
                    io.to(receiverSocketId).emit('newAudio', audio);
                }
        

        res.status(201).json({audio});
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Server Error" });
    }

}

export const getAudioController = async (req, res) => {
    try { 
        
        const loggedInUser = await userModel.findOne({email: req.user.email});
        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        const senderId = loggedInUser._id;
        const { receiverId } = req.params;

        const audio = await audioService.getAllAudios({ senderId,receiverId });

        if (audio.length === 0) {
            return res.status(404).json({ msg: 'No audio files found.' });
        }
        // const audioFile = path.join(__dirname, 'uploads', audio.audioFile);
        
        // Send the first audio file (or handle multiple)
        const audioFile = path.join(__dirname, '..', 'uploads', audio[0].audioFile);
    

        console.log('AudioFile:',audioFile);
        
        // res.status(200).json(audioFile);
        res.sendFile(audioFile, (err) => {
            if (err) {
              console.error('Error sending file:', err);
              res.status(500).json({ error: 'Failed to send audio file.' });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Server Error" });
    }
}