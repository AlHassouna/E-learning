import express from 'express';
import AuthRouter from './AuthRouter';
import ContentRouter from './ContentRouter'
import { User,  Content} from '../models/auth';
const mongoose = require('mongoose');
const router = express.Router();

const authRouter = new AuthRouter(User);
const contentRouter = new ContentRouter(Content)

router.use('/auth', authRouter.router);
router.use('/content', contentRouter.router)

export default router;
