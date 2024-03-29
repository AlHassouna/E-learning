import { Router } from 'express-serve-static-core';
import { Request, Response } from 'express';

export interface IBaseRouter {
  router: Router;
  model: any;

  getAll(req: Request, res: Response): Promise<void>;

  create(req: Request, res: Response): Promise<void>;

  getOne(req: Request, res: Response): Promise<void>;

  getMany(req: Request, res: Response): Promise<void>;

  initializeRoutes(): void;
}


export interface IAuth {
  router: Router;
  model: any;

  register(req: Request, res: Response): Promise<void>;

  login(req: Request, res: Response): Promise<void>;

  initializeRoutes(): void;
}

export interface IGenerator {
  router: Router;

  getAll(req: Request, res: Response): Promise<void>;
}

export interface Profile{
  router: Router;
  user: any;
  reward: any;
  course:any;
  findProfileDetails(req: Request, res: Response): Promise<void>;
}
export interface Teacher{
  router: Router;
  user: any;
  course: any;
  quiz:any;
  addQuiz(req: Request, res: Response): Promise<void>;
}


export interface IReward {
  router: Router;
  model: any;

  initializeRoutes(): void;

  create(req: Request, res: Response): Promise<void>;

  getAll(req: Request, res: Response): Promise<void>;

  getOne(req: Request, res: Response): Promise<void>;

  update(req: Request, res: Response): Promise<void>;

  delete(req: Request, res: Response): Promise<void>;

}

export interface IContent {
  router: Router;
  model: any;

  content(req: Request, res: Response): Promise<void>;

  initializeRoutes(): void;

}


export interface ICourse {
  router: Router;
  model: any;

  initializeRoutes(): void;

  getAll(req: Request, res: Response): Promise<void>;

  getOne(req: Request, res: Response): Promise<void>;

  search(req: Request, res: Response): Promise<void>;

  addParticipant(req: Request, res: Response): Promise<void>;
}


export interface IMsgs {
  router: Router;
  msgs: any;
  user: any;

  initializeRoutes(): void;

  getAllPrivateMsgsByTwoUsers(req: Request, res: Response): Promise<void>;

}
