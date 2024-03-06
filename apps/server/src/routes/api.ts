import express from 'express';
import AuthRouter from './AuthRouter';
import { User } from '../models/auth';
const mongoose = require('mongoose');
const router = express.Router();

const authRouter = new AuthRouter(User);

router.use('/auth', authRouter.router);

export default router;
