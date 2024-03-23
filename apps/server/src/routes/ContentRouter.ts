import express, { Request, Response } from 'express';
import { IContent } from '../types/types';
import { Router } from 'express-serve-static-core';
import { upload, uploadHandler } from '../upload/upload';


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
      const course = await this.model.find({ courseTitle: courseName });
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
      console.log(req, req.body);
      //@ts-ignore
      const file = req.file
      const { courseId, courseTitle, content, contentType } = req.body;
      if(contentType ==="text"){
      const newContent = await this.model.create({
        courseTitle: courseTitle,
        content: content,
        course: courseId,
        contentType:contentType
      })
      res.status(201).json(newContent);
    }
    else{
      const up = await uploadHandler(file)
      const newContent = await this.model.create({
        courseTitle: courseTitle,
        content: up.url,
        course: courseId,
        contentType:up.resource_type
      })
      res.status(201).json(newContent);
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  initializeRoutes(): void {
    this.router.get('/:courseName', this.content);
    this.router.post('/',upload.single("file"), this.addContent);
  }

}


export default ContentRouter;
