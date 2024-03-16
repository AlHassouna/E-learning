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
import { Meeting } from '../models/auth';
import { content } from '../data/content';
import { auth } from '../data/auth';
import {
  users,
  courses,
  contents,
  discussionForums,
  discussionPosts,
  quizzes,
  quizAttempts,
  notifications,
  rewards,
  meetings
} from '../data/dummyData-Test';

// const populateTransactions = async () => {
//   try {
//     await User.insertMany(auth);
//     console.log('Data Imported!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// const dropDB = async () => {
//   try {
//     await User.deleteMany();
//     console.log('Data Destroyed!');
//     process.exit();
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };


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
    await Meeting.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }

};
// const checkUsersSchema = async () => {
//   try {
//     // Create instances of users
//     const createdUsers = await User.insertMany(users);
//     console.log('Users:', createdUsers);
//   } catch (error) {
//     console.error('Error checking users schema:', error.message);
//   }
// };
//
// const checkCoursesSchema = async () => {
//   try {
//     // Create instances of courses
//     const createdCourses = await Course.insertMany(courses);
//     console.log('Courses:', createdCourses);
//   } catch (error) {
//     console.error('Error checking courses schema:', error.message);
//   }
// };
//
// const checkContentsSchema = async () => {
//   try {
//     // Create instances of contents
//     const createdContents = await Content.insertMany(contents);
//     console.log('Contents:', createdContents);
//   } catch (error) {
//     console.error('Error checking contents schema:', error.message);
//   }
// };
//
// const checkDiscussionForumsSchema = async () => {
//   try {
//     // Create instances of discussion forums
//     const createdDiscussionForums = await DiscussionForum.insertMany(
//       discussionForums
//     );
//     console.log('Discussion Forums:', createdDiscussionForums);
//   } catch (error) {
//     console.error('Error checking discussion forums schema:', error.message);
//   }
// };
//
// const checkDiscussionPostsSchema = async () => {
//   try {
//     // Create instances of discussion posts
//     const createdDiscussionPosts = await DiscussionPost.insertMany(
//       discussionPosts
//     );
//     console.log('Discussion Posts:', createdDiscussionPosts);
//   } catch (error) {
//     console.error('Error checking discussion posts schema:', error.message);
//   }
// };

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
//
// const checkQuizzesSchema = async () => {
//   try {
//     // Create instances of quizzes
//     const createdQuizzes = await Quiz.insertMany(quizzes);
//     console.log('Quizzes:', createdQuizzes);
//   } catch (error) {
//     console.error('Error checking quizzes schema:', error.message);
//   }
// };
//
// const checkQuizAttemptsSchema = async () => {
//   try {
//     // Create instances of quiz attempts
//     const createdQuizAttempts = await QuizAttempt.insertMany(quizAttempts);
//     console.log('Quiz Attempts:', createdQuizAttempts);
//   } catch (error) {
//     console.error('Error checking quiz attempts schema:', error.message);
//   }
// };
//
// const checkNotificationsSchema = async () => {
//   try {
//     // Create instances of notifications
//     const createdNotifications = await Notifications.insertMany(notifications);
//     console.log('Notifications:', createdNotifications);
//   } catch (error) {
//     console.error('Error checking notifications schema:', error.message);
//   }
// };
//
// const checkRewardsSchema = async () => {
//   try {
//     // Create instances of rewards
//     const createdRewards = await Reward.insertMany(rewards);
//     console.log('Rewards:', createdRewards);
//   } catch (error) {
//     console.error('Error checking rewards schema:', error.message);
//   }
// };
//
// const checkMeetingsSchema = async () => {
//   try {
//     // Create instances of meetings
//     const createdMeetings = await Meeting.insertMany(meetings);
//     console.log('Meetings:', createdMeetings);
//   } catch (error) {
//     console.error('Error checking meetings schema:', error.message);
//   }
// };

export {
  populateContent,
  dropAllDb
};
