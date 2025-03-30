import messageModel from '../models/message.model.js';
import userModel from '../models/user.model.js';
import { getReceiverSocketId } from '../server.js';
import * as messageService from '../services/message.service.js';
import { io } from '../server.js';

// export const createMessage = async (req, res) => {
//     try {
//         await newMessage.save();
//         res.status(201).json(newMessage);
//     } catch (error) {
//         res.status(409).json({ message: error.message });
//     }
// };

// export const getMessages = async (req, res) => {
//     try {
//         const messages = await messageModel.find();
//         res.status(200).json(messages);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// };

// export const getMessageById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const message = await messageModel.findById(id);
//         res.status(200).json(message);     
//     }
//     catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }

export const sendMessage = async (req, res) => {
    try {
        const { message} = req.body;
        const {id:receiverId} = req.params;

        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const senderId = loggedInUser._id;

        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        
        // console.log('senderId:', senderId);
        // console.log('receiverId:', receiverId);

        // const profilePhoto = 'https://avatar.iran.liara.run/public/boy';
        // image: profilePhoto

        const newMessage = await messageService.createMessage({ 
            senderId, 
            receiverId, 
            message,
         });


         const receiverSocketId = getReceiverSocketId(receiverId);
         if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json({newMessage});
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: error.message});
    }
}

export const getMessages = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });
        const senderId = loggedInUser._id;
        const {id:receiverId} = req.params;
        if (!loggedInUser) {
            return res.status(401).json({ msg: 'Unauthorized user' });
        }
        
        const messages = await messageService.getAllMessages({ senderId, receiverId });
        res.status(200).json(messages);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}
