export const dummyData = [];

// import {
//   User,
//   Course,
//   Video,
//   DiscussionForum,
//   DiscussionPost,
//   Quiz,
//   Question,
//   QuizAttempt,
//   Notifications,
//   Reward,
//   Meeting,
// } from '../models/auth';

// // Connect to MongoDB
// mongoose
//   .connect('mongodb://localhost:27017/E-learning', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((error) => console.error('Error connecting to MongoDB:', error));

// // Sample data
// const sampleUserData = [
//   {
//     username: 'student1',
//     password: 'password1',
//     email: 'student1@example.com',
//     role: 'Student',
//   },
//   {
//     username: 'teacher1',
//     password: 'password1',
//     email: 'teacher1@example.com',
//     role: 'Teacher',
//   },
// ];

// const sampleCourseData = [
//   {
//     courseName: 'Course 1',
//     description: 'Description of Course 1',
//     teacher: 'teacher1',
//   },
//   {
//     courseName: 'Course 2',
//     description: 'Description of Course 2',
//     teacher: 'teacher1',
//   },
// ];

// // Insert sample data
// async function insertSampleData() {
//   try {
//     // Insert users
//     await User.insertMany(sampleUserData);

//     // Insert courses
//     await Course.insertMany(sampleCourseData);

//     console.log('Sample data inserted successfully.');
//   } catch (error) {
//     console.error('Error inserting sample data:', error);
//   }
// }

// // Query users and courses
// async function queryData() {
//   try {
//     // Query users
//     const users = await User.find();
//     console.log('Users:', users);

//     // Query courses
//     const courses = await Course.find().populate('teacher');
//     console.log('Courses:', courses);
//   } catch (error) {
//     console.error('Error querying data:', error);
//   }
// }

// // Insert sample data and query
// async function main() {
//   await insertSampleData();
//   await queryData();
//   mongoose.disconnect();
// }

// main();
