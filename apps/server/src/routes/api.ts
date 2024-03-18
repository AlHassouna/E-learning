import express from 'express';
import { User, Reward, Content, Course } from '../models/auth';
import AuthRouter from './AuthRouter';
import quizRouter from './QuizRouter';
import CourseRouter from './CourseRouter';
import ContentRouter from './ContentRouter';
import RewardRouter from './RewardRouter';

const router = express.Router();

const authRouter = new AuthRouter(User);
const courseRouter = new CourseRouter(Course);
const contentRouter = new ContentRouter(Content);
const rewardRouter = new RewardRouter(Reward);


router.use('/courses', courseRouter.router);
router.use('/auth', authRouter.router);
router.use('/quizzes', quizRouter);

router.use('/content', contentRouter.router);
router.use('/reward', rewardRouter.router);
export default router;
