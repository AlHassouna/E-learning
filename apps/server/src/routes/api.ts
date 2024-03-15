import express from 'express';
import { User,Reward, Content} from '../models/auth';
import AuthRouter from './AuthRouter';
import ContentRouter from './ContentRouter'
import RewardRouter from './RewardRouter';

const router = express.Router();

const authRouter = new AuthRouter(User);
const contentRouter = new ContentRouter(Content)
const rewardRouter = new RewardRouter(Reward);

router.use('/auth', authRouter.router);
router.use('/content', contentRouter.router)
router.use('/reward', rewardRouter.router);
export default router;
