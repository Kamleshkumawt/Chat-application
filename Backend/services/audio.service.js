import audioModel from '../models/audio.model.js'
import mongoose from 'mongoose'

export const createAudio = async ({
    senderId,
    receiverId,
    audioFile,
}) => {
    if (!senderId ||!receiverId ||!audioFile) {
        throw new Error('All fields are required')
    }
    if (!mongoose.Types.ObjectId.isValid(senderId) ||!mongoose.Types.ObjectId.isValid(receiverId)) {
        throw new Error('Invalid user ID')
    }
    try { 
        const audio = await audioModel.create({
            senderId,
            receiverId,
            audioFile : `${audioFile.filename}`,
        })
        return audio;
    } catch (err) {
        throw new Error('Error creating audio: ', err)
    }
    
}

export const getAllAudios = async ({ senderId, receiverId }) => {
    if (!senderId ||!receiverId) {
        throw new Error('All fields are required')
    }
    if (!mongoose.Types.ObjectId.isValid(senderId) ||!mongoose.Types.ObjectId.isValid(receiverId)) {
        throw new Error('Invalid user ID')
    }
    
    try {
        const audios = await audioModel.find({
            $or: [
                { senderId, receiverId },
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId },
            ],
        })
        return audios;
    } catch (err) {
        throw new Error('Error getting audios: ', err)
    }
}