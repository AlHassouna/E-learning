import { Schema, model } from 'mongoose';

// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Teacher'], required: true },
  profileInformation: { type: String },
});

// Course Schema
const courseSchema = new Schema({
  courseName: { type: String, required: true },
  courseId: {type: String, required: true},
  description: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

// Custom validation to limit participants per course
courseSchema.pre('save', async function (next) {
  try {
    const participantCount = this.participants.length;
    if (participantCount > 5) {
      throw new Error(
        'Maximum limit of 5 participants reached for this course.'
      );
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Video Schema
const videoSchema = new Schema({
  videoTitle: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number },
  uploadDate: { type: Date, default: Date.now },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

// Discussion Forum Schema
const discussionForumSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  topic: { type: String, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
});

// Discussion Post Schema
const discussionPostSchema = new Schema({
  forum: {
    type: Schema.Types.ObjectId,
    ref: 'DiscussionForum',
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Quiz Schema
const quizSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  quizTitle: { type: String, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number, default: 10 },
  category: { type: String, required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'] },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

// Question Schema
const questionSchema = new Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ['multiple', 'boolean'], required: true },
  options: [{ type: String }],
  correctOption: { type: String },
  level: { type: String, enum: ['easy', 'medium', 'hard'] },
});

// Quiz Attempt Schema
const quizAttemptSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  rewardEarned: { type: Schema.Types.ObjectId, ref: 'Reward' },
  questionAttempts: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    userAnswer: { type: String },
    isCorrect: { type: Boolean },
    level: { type: String },
  }],
});

// Notification Schema
const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

// Reward System Schema
const rewardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Meeting Schema
const meetingSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  dateTime: { type: Date, required: true },
  meetingURL: { type: String },
  description: { type: String },
});

// Models
export const User = model('User', userSchema);
export const Course = model('Course', courseSchema);
export const Video = model('Video', videoSchema);
export const DiscussionForum = model('DiscussionForum', discussionForumSchema);
export const DiscussionPost = model('DiscussionPost', discussionPostSchema);
export const Quiz = model('Quiz', quizSchema);
export const Question = model('Question', questionSchema);
export const QuizAttempt = model('QuizAttempt', quizAttemptSchema);
export const Notifications = model('Notification', notificationSchema);
export const Reward = model('Reward', rewardSchema);
export const Meeting = model('Meeting', meetingSchema);
