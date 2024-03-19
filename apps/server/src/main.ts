import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import eLearning from './routes/api';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { IoClient } from './socket/socketIoServices'; // Adjusted import path
import {
  populateContent,
  dropAllDb,
  populateCourses,
  dropContent,
  dropCourses
} from './utils/populate.js';

dotenv.config();

const app = express();
app.use(cors());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:4200', // Adjust CORS origin as per your frontend URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const ioClient = new IoClient(io);
ioClient.startClient();

mongoose.connect('mongodb+srv://hhasona:rtK3ZWCyNEZmifHG@cluster0.32yucli.mongodb.net/Elearning', {} as ConnectOptions)
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.once('open', async function() {
  console.log('Connected to MongoDB');
  // await dropAllDb();
  // await populateContent();
  // await populateCourses();
  // await dropContent();
  // await dropCourses();
});

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', eLearning);

const port = process.env.PORT || 8000;

server.listen(port, () => console.log(`Server running on port ${port}`));

export { io };
