import express, { Request, Response } from 'express';
import { IBaseRouter } from '../types/types';
import { Router } from 'express-serve-static-core';

class BaseRouter implements IBaseRouter {
  router: Router;
  model: any;

  constructor(model: any) {
    this.router = express.Router();
    this.model = model;
    this.initializeRoutes();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.model.find({});
      res.send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    const newItem = req.body;
    try {
      await this.model.create(newItem);
      const items = await this.model.find({});
      res.send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      const item = await this.model.findById(id);
      res.send(item);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async getMany(req: Request, res: Response): Promise<void> {
    const category = req.params.category;
    try {
      const items = await this.model.find({ category: category });
      res.send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    try {
      await this.model.findByIdAndDelete(id);
      const items = await this.model.find({});
      res.send(items);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  }

  initializeRoutes() {
    this.router.get('/', this.getAll.bind(this));
    this.router.post('/', this.create.bind(this));
    this.router.delete('/:id', this.delete.bind(this));

  }
}

export default BaseRouter;
