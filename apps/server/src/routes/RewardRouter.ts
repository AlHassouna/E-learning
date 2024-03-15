import express, { Request, Response } from 'express';
import { Router } from 'express-serve-static-core';
import { calculateReward } from '../middleware/rewardMiddleware';
import { IReward } from '../types/types';


class RewardRouter implements IReward {
  router: Router;
  model: any;

  constructor(model: any) {
    this.router = express.Router();
    this.model = model;
    this.initializeRoutes();
  }

  public create = async (req: Request, res: Response): Promise<void> => {
    try {
      const { ...bodyWithoutReward } = req.body;
      if (req.body.rewardEarned) {
        res.status(400).json({ message: 'Reward already earned' });
      }
      const { user, type, timestamp } = bodyWithoutReward;
      await this.model.create({ user, type, timestamp });
      res.status(201).json({ message: 'Reward created' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const rewards = await this.model.find();
      res.status(200).json(rewards);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const reward = await this.model.findById(req.params.id);
      res.status(200).json(reward);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public update = async (req: Request, res: Response): Promise<void> => {
    try {
      const reward = await this.model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(reward);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.model.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Reward deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  initializeRoutes(): void {
    this.router.post('/', calculateReward, this.create);
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.patch('/:id', this.update);
    this.router.delete('/:id', this.delete);
  }
}

export default RewardRouter;
