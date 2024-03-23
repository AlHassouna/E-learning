import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Teacher'], required: true },
  profileInformation: { type: String }
});


const courseSchema = new Schema({
  courseName: { type: String, required: true },
  description: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  courseImage: { type: String } 
});


courseSchema.pre('save', async function(next) {
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

const contentSchema = new Schema({
  courseTitle: { type: String, required: true },
  content: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  contentType : { type: String , enum:["image","video","text"]},
});

const discussionForumSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  topic: { type: String, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const discussionPostSchema = new Schema({
  forum: {
    type: Schema.Types.ObjectId,
    ref: 'DiscussionForum',
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Quiz Schema
const quizSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  quizTitle: { type: String, required: true },
  description: { type: String },
  timestamp: { type: Date, default: Date.now },
  duration: { type: Number, default: 10 },
  category: { type: String, required: true },
  level: { type: String, enum: ['easy', 'medium', 'hard'] },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});

// Question Schema
const questionSchema = new Schema({
  questionText: { type: String, required: true },
  type: { type: String, enum: ['multiple', 'boolean'], required: true },
  options: [{ type: String }],
  correctOption: { type: String },
  level: { type: String, enum: ['easy', 'medium', 'hard'] }
});

// Quiz Attempt Schema
const quizAttemptSchema = new Schema({
  quiz: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  timestamp: { type: Date, default: Date.now },
  score: { type: Number, default: 0 },
  isPerfect: { type: Boolean, default: false },
  rewardEarned: { type: Schema.Types.ObjectId, ref: 'Reward' },
  questionAttempts: [{
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    userAnswer: { type: String },
    isCorrect: { type: Boolean },
    level: { type: String }
  }]
});

// Notification Schema
const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
});

// Reward System Schema
const rewardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});


const msgSchema = new Schema({
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  msg: { type: String, required: true },
  date: { type: String, required: true }
});

const onlineSchema = new Schema({
  username: { type: String, required: true, unique: true },
  socketID: { type: String, required: true, unique: true }
});

// Models
export const User = model('User', userSchema);
export const Course = model('Course', courseSchema);
export const Content = model('Content', contentSchema);
export const DiscussionForum = model('DiscussionForum', discussionForumSchema);
export const DiscussionPost = model('DiscussionPost', discussionPostSchema);
export const Quiz = model('Quiz', quizSchema);
export const Question = model('Question', questionSchema);
export const QuizAttempt = model('QuizAttempt', quizAttemptSchema);
export const Notifications = model('Notification', notificationSchema);
export const Reward = model('Reward', rewardSchema);
export const MsgPrivate = model('Msg', msgSchema);
export const Online = model('Online', onlineSchema);
