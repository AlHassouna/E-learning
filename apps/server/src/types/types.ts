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
