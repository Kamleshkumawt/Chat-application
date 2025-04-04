import { Router } from "express";
import * as audioController from "../controllers/audio.controller.js"
import * as authUser from "../middlewares/user.middleware.js"
import multer from "multer";

const router = Router();

// Multer Setup for File Upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}.mp3`);
    },
  });
  
  const upload = multer({ storage: storage });

// Define endpoints

router.post("/uploads/:receiverId",
    upload.single('audioFile'),
    authUser.authUser,
    audioController.createAudioController);

router.get("/get/:receiverId", 
    authUser.authUser,
    audioController.getAudioController);

// router.delete("/:id", audioController.deleteAudio);

export default router;  