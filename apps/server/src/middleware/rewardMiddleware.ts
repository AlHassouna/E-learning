import { Request, Response, NextFunction } from 'express';

export const calculateReward = async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const score = req.body.score;

    if (req.body.rewardEarned) {
      return next();
    }

    let rewardId = null;
    if (score >= 80) {
      rewardId = 'High_Score';
    } else if (score >= 50) {
      rewardId = 'Medium_Score';
    } else {
      rewardId = 'Low_Score';
    }

    const rewardData = {
      user: '65e70dbd8f6d6c25bdb6ff58',
      type: rewardId,
      timestamp: new Date()
    };

    req.body = { ...req.body, rewardEarned: true, ...rewardData };
    next();
  } catch (error) {
    next(error);
  }

};
