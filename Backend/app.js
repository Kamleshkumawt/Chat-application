import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from './routes/user.routes.js'
import projectRoutes from './routes/project.routes.js';
import messageRoutes from './routes/message.routes.js';
import audioRoutes from './routes/audio.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Connect to MongoDB
connect();

const app = express();



// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming cookies into req.cookies
app.use(cookieParser());

// Log incoming requests in a tiny format using morgan
app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use('/uploads', express.static('uploads'));


// Routes
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use('/messages', messageRoutes);
app.use('/audio', audioRoutes);


app.get('/', (req, res) => {
    res.send('Hello, World!');
})

export default app;