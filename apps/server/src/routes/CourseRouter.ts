import express, { Request, Response } from 'express';
import { Course } from '../models/auth';
import { dummyData } from '../data/course';

class CourseRouter {
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/initialize', this.initializeCourses.bind(this));
  }

  private async initializeCourses(req: Request, res: Response) {
    try {
      await Course.deleteMany({});
      await Course.insertMany(dummyData);
      res.status(201).send('Dummy data saved successfully.');
    } catch (error) {
      console.error('Error saving dummy data:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default CourseRouter;
