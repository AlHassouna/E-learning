import express, { Request, Response } from 'express';
import { IMsgs } from '../types/types';
import { Router } from 'express-serve-static-core';

class MsgsRouter implements IMsgs {
  router: Router;
  msgs: any;
  user: any;

  constructor(msgs: any, user: any) {
    this.router = express.Router();
    this.msgs = msgs;
    this.user = user;
    this.initializeRoutes();
  }


  public async getAllPrivateMsgsByTwoUsers(req: Request, res: Response): Promise<void> {
    const { data } = req.body;
    const { user1, user2 } = data;
    try {
      const msgs = await this.msgs.find({
        $or: [
          { $and: [{ sender: user1 }, { receiver: user2 }] },
          { $and: [{ sender: user2 }, { receiver: user1 }] }
        ]
      });
      res.status(200).json(msgs);
    } catch (err) {
      res.status(500).json({ err });
    }
  }


  initializeRoutes(): void {
    this.router.post('/', this.getAllPrivateMsgsByTwoUsers.bind(this));
  }
}

export default MsgsRouter;
