const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Corrected data with ObjectId values
export const users = [
  {
    username: 'student1',
    password: 'password1',
    email: 'student1@example.com',
    role: 'Student',
    profileInformation: "This is student 1's profile information.",
  },
  {
    username: 'teacher1',
    password: 'password1',
    email: 'teacher1@example.com',
    role: 'Teacher',
    profileInformation: "This is teacher 1's profile information.",
  },
];

export const courses = [
  {
    courseName: 'Mathematics',
    description: 'Introduction to mathematics',
    teacher: new ObjectId(), // Replace 'teacher1' with ObjectId()
    participants: [new ObjectId()], // Replace 'student1' with ObjectId()
  },
  {
    courseName: 'Physics',
    description: 'Introduction to physics',
    teacher: new ObjectId(), // Replace 'teacher1' with ObjectId()
    participants: [],
  },
];

export const contents = [
  {
    courseTitle: 'Introduction to Algebra',
    content: 'This is an introduction to algebra.',
    course: new ObjectId(), // Replace 'Mathematics' with ObjectId()
  },
  {
    courseTitle: "Newton's Laws of Motion",
    content: "This is an introduction to Newton's laws of motion.",
    course: new ObjectId(), // Replace 'Physics' with ObjectId()
  },
];

export const discussionForums = [
  {
    course: new ObjectId(), // Replace 'Mathematics' with ObjectId()
    topic: 'Algebra Discussion',
    description: 'Discussion forum for algebra related topics.',
  },
  {
    course: new ObjectId(), // Replace 'Physics' with ObjectId()
    topic: 'Physics Discussion',
    description: 'Discussion forum for physics related topics.',
  },
];

export const discussionPosts = [
  {
    forum: new ObjectId(), // Use ObjectId() instead of 'Algebra Discussion'
    user: new ObjectId(), // Replace 'student1' with ObjectId()
    content: 'I have a question about algebra.',
  },
  {
    forum: new ObjectId(), // Use ObjectId() instead of 'Algebra Discussion'
    user: new ObjectId(), // Replace 'teacher1' with ObjectId()
    content: 'Sure, feel free to ask.',
  },
];

export const quizzes = [
  {
    course: new ObjectId(), // Replace 'Mathematics' with ObjectId()
    teacher: new ObjectId(), // Replace 'teacher1' with ObjectId()
    quizTitle: 'Algebra Quiz',
    description: 'Test your knowledge of algebra.',
    category: 'Mathematics',
    level: 'medium',
    questions: [new ObjectId(), new ObjectId()], // Assuming questions are ObjectIds
  },
  {
    course: new ObjectId(), // Replace 'Physics' with ObjectId()
    teacher: new ObjectId(), // Replace 'teacher1' with ObjectId()
    quizTitle: 'Physics Quiz',
    description: 'Test your knowledge of physics.',
    category: 'Physics',
    level: 'easy',
    questions: [new ObjectId(), new ObjectId()], // Assuming questions are ObjectIds
  },
];

export const quizAttempts = [
  {
    quiz: new ObjectId(), // Use new ObjectId() instead of ObjectId()
    user: new ObjectId(), // Replace 'student1' with ObjectId()
    score: 80,
    questionIDs: [new ObjectId(), new ObjectId()], // Assuming question IDs are ObjectIds
  },
];

export const notifications = [
  {
    user: new ObjectId(), // Replace 'student1' with ObjectId()
    content: 'You have a new message.',
  },
  {
    user: new ObjectId(), // Replace 'teacher1' with ObjectId()
    content: 'New student joined the course.',
  },
];

export const rewards = [
  {
    user: new ObjectId(), // Replace 'student1' with ObjectId()
    type: 'Achievement Unlocked',
  },
];

export const meetings = [
  {
    course: new ObjectId(), // Replace 'Mathematics' with ObjectId()
    teacher: new ObjectId(), // Replace 'teacher1' with ObjectId()
    dateTime: new Date('2024-03-15T10:00:00'),
    meetingURL: 'https://zoom.us/meetingid123',
    description: 'Introduction to the course meeting.',
  },
];
