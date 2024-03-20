import express from 'express';
import { User, Reward, Content, Course, MsgPrivate } from '../models/auth';
import AuthRouter from './AuthRouter';
import quizRouter from './QuizRouter';
import CourseRouter from './CourseRouter';
import ContentRouter from './ContentRouter';
import RewardRouter from './RewardRouter';
import MsgsRouter from './MsgsRouter';

const router = express.Router();

const authRouter = new AuthRouter(User);
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
export default router;
