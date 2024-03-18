import { Request, Response, NextFunction } from 'express';

export const calculateReward = async function(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const isPerfect = req.body.isPerfect;

    if (req.body.rewardEarned) {
      return next();
    }

    let rewardId = null;
    let rewardEarned = true;
    if (isPerfect === true) {
      rewardId = 'received reward';
    } else {
      rewardEarned = false;
    }

    const rewardData = {
      user: req.body.user,
      type: rewardId,
      timestamp: new Date()
    };

    req.body = { ...req.body, rewardEarned: rewardEarned, ...rewardData };
    next();
  } catch (error) {
    next(error);
  }

};
