import express, { Request, Response } from 'express';
import { Course } from '../models/auth';
import { dummyData } from '../data/course';
import { ICourse } from '../types/types';
import { Router } from 'express-serve-static-core';

class CourseRouter implements ICourse {
  router: Router;
  model: any;

  constructor(model: any) {
    this.router = express.Router();
    this.model = model;
    this.initializeRoutes();
  }

  public getAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.model.find();
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public getOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const course = await this.model.findById(req.params.id);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  public search = async (req: Request, res: Response): Promise<void> => {
    try {
      const courses = await this.model.find({ courseName: { $regex: req.params.search, $options: 'i' } });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  public initializeRoutes(): void {
    this.router.get('/', this.getAll);
    this.router.get('/:id', this.getOne);
    this.router.post('/search/:search', this.search);
  }

}

export default CourseRouter;
