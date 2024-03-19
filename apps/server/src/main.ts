import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import eLearning from './routes/api';
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


mongoose
  .connect('mongodb+srv://hhasona:rtK3ZWCyNEZmifHG@cluster0.32yucli.mongodb.net/Elearning', {} as ConnectOptions)
  .catch((err) => console.log(err));

const db = mongoose.connection;
db.once('open', async function() {
  console.log('Connected to MongoDB');
  //await dropAllDb();
  // await populateContent();
  //await populateCourses();
  // await dropContent();
   //await dropCourses();
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api/v1', eLearning);

const port = process.env.PORT || 8000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
