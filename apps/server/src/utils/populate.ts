import { User } from '../models/auth';
import { Course } from '../models/auth';
import { Content } from '../models/auth';
import { DiscussionForum } from '../models/auth';
import { DiscussionPost } from '../models/auth';
import { Quiz } from '../models/auth';
import { Question } from '../models/auth';
import { QuizAttempt } from '../models/auth';
import { Notifications } from '../models/auth';
import { Reward } from '../models/auth';
import { content } from '../data/content';
import { dummyData as courses } from '../data/course';

const dropAllDb = async () => {
  try {
    await User.deleteMany();
    await Course.deleteMany();
    await Content.deleteMany();
    await DiscussionForum.deleteMany();
    await DiscussionPost.deleteMany();
    await Quiz.deleteMany();
    await Question.deleteMany();
    await QuizAttempt.deleteMany();
    await Notifications.deleteMany();
    await Reward.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

};
const populateContent = async () => {
  try {
    await Content.insertMany(content);
    console.log('Content Imported');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const populateCourses = async () => {
  try {
    await Course.insertMany(courses);
    console.log('Courses Imported');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

};

const dropContent = async () => {
  try {
    await Content.deleteMany();
    console.log('Content Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

};

const dropCourses = async () => {
  try {
    await Course.deleteMany();
    console.log('Courses Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }


};


export {
  populateContent,
  dropAllDb,
  populateCourses,
  dropCourses,
  dropContent
};
