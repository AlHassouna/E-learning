import express from 'express';
import AuthRouter from './AuthRouter';
import { User, Reward, Course, Quiz, Question } from '../models/auth';
import ProfileRouter from './ProfileRouter';
import Generator from './Generator';
import TeacherRouter from './TeacherRouter';

const router = express.Router();
const authRouter = new AuthRouter(User);
const generator = new Generator();
const teacher = new TeacherRouter(User,Quiz,Course,Question);
const profRouter = new ProfileRouter(User, Reward, Course);

router.use('/teacher',teacher.router)
router.use('/auth', authRouter.router);
router.use('/profile',profRouter.router)
router.use('/generate',generator.router)

export default router;
