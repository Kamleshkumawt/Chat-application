import mongoose from 'mongoose';


const audioSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    audioFile: {
        type: String,
    }
},{
    timestamps: true
});

const Audio = mongoose.model('audio', audioSchema);

export default Audio;
