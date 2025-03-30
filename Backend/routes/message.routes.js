import {Router} from 'express';
import * as authMiddleware from '../middlewares/user.middleware.js';
import * as messageController from '../controllers/message.controller.js';


const router = Router();

// Define endpoints
router.get("/user",
    authMiddleware.authUser,
);

router.get('/:id',
    authMiddleware.authUser,
    messageController.getMessages
);

router.post('/send/:id',
    authMiddleware.authUser,
    messageController.sendMessage
);



export default router;