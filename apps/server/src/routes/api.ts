import express from 'express';
import AuthRouter from './AuthRouter';
import { User } from '../models/auth';
import quizRouter from './QuizRouter';
import CourseRouter from './CourseRouter';
const mongoose = require('mongoose');
const router = express.Router();

const authRouter = new AuthRouter(User);
const courseRouter = new CourseRouter();

router.use('/courses', courseRouter.router);
router.use('/auth', authRouter.router);
router.use('/quizzes', quizRouter);

export default router;
