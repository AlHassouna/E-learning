import { User, Course, Video, DiscussionForum, DiscussionPost, Quiz, Question, QuizAttempt, Notifications, Reward, Meeting } from '../models/auth'; // Adjust the path to your models file as needed

// Function to generate dummy users
export const generateUsers = async () => {
  const users = [];

  const user1 = new User({
    username: 'student1',
    password: 'password1',
    email: 'student1@example.com',
    role: 'Student',
    profileInformation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });
  await user1.save();
  users.push(user1);

  const user2 = new User({
    username: 'teacher1',
    password: 'password1',
    email: 'teacher1@example.com',
    role: 'Teacher',
    profileInformation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  });
  await user2.save();
  users.push(user2);

  // Add more users as needed

  return users;
};

// Function to generate dummy courses
export const generateCourses = async (teachers, participants) => {
  const courses = [];

  const course1 = new Course({
    courseName: 'Mathematics 101',
    description: 'Introduction to basic mathematics concepts.',
    teacher: teachers[0]._id,
    participants: [participants[0]._id],
  });
  await course1.save();
  courses.push(course1);

  // Add more courses as needed

  return courses;
};

// Function to generate dummy videos
export const generateVideos = async (courses) => {
  const videos = [];

  const video1 = new Video({
    videoTitle: 'Introduction to Algebra',
    url: 'https://www.example.com/video1',
    duration: 120, // in seconds
    course: courses[0]._id,
  });
  await video1.save();
  videos.push(video1);
  return videos;
};


