import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import eLearning from './routes/api';
import { populateTransactions, dropDB } from './utils/populate.js';

dotenv.config();
const app = express();

app.use(cors());
mongoose
  .connect('mongodb://127.0.0.1:27017/eLearning', {} as ConnectOptions)
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.once('open', async function() {
  console.log('Connected to MongoDB');
  // await populateTransactions();
  // await dropDB();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', eLearning);

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
