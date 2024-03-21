import express, { Request, Response } from 'express';
import { IContent } from '../types/types';
import { Router } from 'express-serve-static-core';


class ContentRouter implements IContent {
  router: Router;
  model: any;

  constructor(model: any) {
    this.router = express.Router();
    this.model = model;
    this.initializeRoutes();
  }

  public content = async (req: Request, res: Response): Promise<void> => {
    const courseName = req.params.courseName;
    try {
      const course = await this.model.findOne({ courseTitle: courseName });
      if (!course) {
        res.status(404).send('Course not found');
        return;
      }
      res.send(course);
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error');
    }
  };


  initializeRoutes(): void {
    this.router.get('/:courseName', this.content);
  }

}


export default ContentRouter;
