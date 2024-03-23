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


  public addContent = async (req: Request, res: Response): Promise<void> =>  {
    try {
      const { courseId, courseTitle, content } = req.body;
      const newContent = await this.model.create({
        courseTitle: courseTitle,
        content: content,
        course: courseId
      })
      res.status(201).json(newContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  initializeRoutes(): void {
    this.router.get('/:courseName', this.content);
    this.router.post('/', this.addContent);
  }
}


export default ContentRouter;
