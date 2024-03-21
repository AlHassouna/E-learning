import express, { Request, Response } from 'express';
import { Profile } from '../types/types';
import { ParamsDictionary, Router } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ParsedQs } from 'qs';
import mongoose from 'mongoose';

class ProfileRouter implements Profile {
    router: Router;
    user: any;
    reward: any;
    course: any;
  
    constructor(user: any,reward: any, course:any) {
      this.router = express.Router();
      this.user = user;
      this.reward = reward;
      this.course = course;
      this.initializeRoutes();
    }
    public findProfileDetails= async(req: Request, res: Response): Promise<void>=>{
        try {
            const user = await this.user.findOne
            ({ username: req.params.username });
            if (!user) {
              throw new Error('No user Found');
            }
            const { role, username } = user;
            const idString = user._id.toString()
            if(role === "Teacher"){
              const numRewards = await this.reward.countDocuments({"user":idString})
              const courses = await this.course.find({ "teacher":idString})
              res.status(200).json({id:idString, role, username ,courses,numRewards });
            }
            else{
              const numRewards = await this.reward.countDocuments({user:idString})
              const courses = await this.course.find({ "participants": { $in: [idString] } })
              const ranking=18;
              res.status(200).json({ id:idString,role, username , numRewards,courses,ranking });
            }
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }
  
    
  
   
  
    initializeRoutes(): void {
      this.router.get('/user/:username', this.findProfileDetails);
    }
  
  
  }
  
  export default ProfileRouter;
  