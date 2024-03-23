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
    quiz: any;
  
    constructor(user: any,reward: any, course:any, quiz: any) {
      this.router = express.Router();
      this.user = user;
      this.reward = reward;
      this.course = course;
      this.quiz = quiz
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
              const courses = await this.course.find({ "participants": { $in: [idString] } })
              res.status(200).json({id:idString, role, username ,courses });
            }
            else{
              const numRewards = await this.reward.countDocuments({user:idString})
              const courses = await this.course.find({ "participants": { $in: [idString] } })
              const ranking= await this.calculateAverageScore(idString);
              res.status(200).json({ id:idString,role, username , numRewards,courses,ranking });
            }
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }

    public  calculateAverageScore = async (userId: string): Promise<Number> => {
      try {
        const quizAttempts = await this.quiz.find({ user: userId });
    
        let totalScore = 0;
        let totalMaxScore = 0;
    
        quizAttempts.forEach(attempt => {
          totalScore += attempt.score;
          totalMaxScore += attempt.maxScore;
        });
    
        const averageScoreString = totalMaxScore > 0 ? ((totalScore / totalMaxScore) * 100).toFixed(2) : 0;
        const averageScore = Number(averageScoreString)
        return averageScore;
      } catch (error) {
        console.error('Error calculating average score:', error);
        throw error;
      }
    }
    
  
   
  
    initializeRoutes(): void {
      this.router.get('/user/:username', this.findProfileDetails);
    }
  
  
  }
  
  export default ProfileRouter;
  