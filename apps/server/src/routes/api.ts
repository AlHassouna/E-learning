import express from 'express';
import AuthRouter from './AuthRouter';
import Auth from '../models/auth';

const router = express.Router();
const authRouter = new AuthRouter(Auth);

router.use('/auth', authRouter.router);

export default router;
