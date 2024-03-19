import {User} from '../models/auth';
import { auth } from '../data/auth';

const populateTransactions = async () => {
  try {
    await User.insertMany(auth);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};


const dropDB = async () => {
  try {
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { populateTransactions, dropDB };
