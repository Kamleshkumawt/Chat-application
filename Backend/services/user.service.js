import userModel from "../models/user.model.js";

export const createUser = async ({ fullname, email, password }) => {
  if (!email || !password || !fullname) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await userModel.hashPassword(password);

  const profilePhoto = 'https://avatar.iran.liara.run/public/boy';

  const user = await userModel.create({
    fullname,
    email,
    password: hashedPassword,
    image:profilePhoto,
  });

  return user;
};

export const getAllUser = async ({ userId }) => {
  const users = await userModel.find(
    { _id: { $ne: userId } 
 }, 
    { password: 0 });
  return users;
};
