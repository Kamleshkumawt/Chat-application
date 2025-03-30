import jwt from "jsonwebtoken";
import redisClient from "../services/redis.service.js";


export const authUser = async (req, res, next) => {


  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ msg: "UnAuthorized user" });
    }

    // Check token in redis
    const isBackListed = await redisClient.get(token);

    if (isBackListed) {
      res.cookie("token", "");
      return res.status(401).json({ message: "Unauthorized User" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized user" });
  }
};
