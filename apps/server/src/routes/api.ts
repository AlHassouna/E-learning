import express from 'express';
import AuthRouter from './AuthRouter';
import { User, Reward,Content, Course, Quiz, Question,MsgPrivate, QuizAttempt } from '../models/auth';
import ProfileRouter from './ProfileRouter';
import Generator from './Generator';
import TeacherRouter from './TeacherRouter';
import quizRouter from './QuizRouter';
import CourseRouter from './CourseRouter';
import ContentRouter from './ContentRouter';
import RewardRouter from './RewardRouter';
import MsgsRouter from './MsgsRouter';

const router = express.Router();
const authRouter = new AuthRouter(User);
const generator = new Generator();
const teacher = new TeacherRouter(User,Quiz,Course,Question);
const profRouter = new ProfileRouter(User, Reward, Course, QuizAttempt);
const courseRouter = new CourseRouter(Course);
const contentRouter = new ContentRouter(Content);
const rewardRouter = new RewardRouter(Reward);
const msgRouter = new MsgsRouter(MsgPrivate, User);

router.use('/courses', courseRouter.router);
router.use('/auth', authRouter.router);
router.use('/quizzes', quizRouter);
router.use('/messages', msgRouter.router);
router.use('/content', contentRouter.router);
router.use('/reward', rewardRouter.router);
router.use('/teacher',teacher.router)
router.use('/profile',profRouter.router)
router.use('/generate',generator.router)

export default router;
