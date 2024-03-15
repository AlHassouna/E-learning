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
export interface IContent{
  router: Router;
  model: any;

  content(req: Request, res: Response): Promise<void>;

  initializeRoutes(): void;

}

