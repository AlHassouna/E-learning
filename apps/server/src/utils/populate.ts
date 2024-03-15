import { User, Content } from '../models/auth';
import { auth } from '../data/auth';
import { content } from '../data/content'

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

const populateContent = async () => {
  try{
    await Content.insertMany(content)
    console.log('Content Imported');
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

export { populateTransactions, populateContent, dropDB };
