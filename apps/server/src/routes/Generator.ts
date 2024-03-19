import { generateUsers, generateCourses, generateVideos } from '../data/dummyData'; 

import express, { Request, Response } from 'express';
import { IGenerator } from '../types/types';
import { Router } from 'express-serve-static-core';

class Generator implements IGenerator {
  router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
        const users = await generateUsers();
        const courses = await generateCourses(users.filter(user => user.role === 'Teacher'), users.filter(user => user.role === 'Student'));
        const videos = await generateVideos(courses);
    
        res.status(200).json({ users, courses, videos });
      } catch (error) {
        console.error('Error generating dummy data:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
  }

 

  initializeRoutes() {
    this.router.get('/', this.getAll);
   
  }
}

export default Generator;
