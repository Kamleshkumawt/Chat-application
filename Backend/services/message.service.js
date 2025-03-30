import messageModel from "../models/message.model.js";

export const createMessage = async ({ message, senderId, receiverId}) => {
  if (!message  || !senderId || !receiverId) {
    throw new Error("All fields are required");
  }

  // if (
  //   !mongoose.Types.ObjectId.isValid(senderId) ||
  //   !mongoose.Types.ObjectId.isValid(receiverId)
  // ) {
  //   throw new Error("Invalid user ID");
  // }

  try {
    const newMessage = await messageModel.create({
      message,
      senderId,
      receiverId,
    });

    return newMessage;

  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export const getAllMessages = async ({ senderId, receiverId }) => {
  try {
    const messages = await messageModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    });

    // console.log(messages);

    return messages;
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
}