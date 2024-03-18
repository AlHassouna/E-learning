import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import eLearning from './routes/api';
// import { populateTransactions, dropDB } from './utils/populate.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import  {IoClient} from './socket/socketIoServices'


dotenv.config();
const app = express();
app.use(cors());

// Create HTTP server
const server = createServer(app);

 const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true,
  }
});
const ioClient = new IoClient(io);
ioClient.startClient();
ioClient.getUsers();
mongoose
  .connect('mongodb://127.0.0.1:27017/eLearning', {} as ConnectOptions)
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.once('open', async function () {
  console.log('Connected to MongoDB');
  // await populateTransactions();
  // await dropDB();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', eLearning);

const port = process.env.PORT || 8000;

// Use server.listen instead of app.listen for Socket.IO
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
export {io}