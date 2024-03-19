import { Question } from './../models/auth';
import express, { Request, Response } from 'express';
import { Teacher } from '../types/types';
import { ParamsDictionary, Router } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

class TeacherRouter implements Teacher {
    router: Router;
    user: any;
    quiz: any;
    course: any;
    question:any;
  
    constructor(user: any,quiz: any, course:any,question:any) {
      this.router = express.Router();
      this.user = user;
      this.quiz = quiz;
      this.question= question;
      this.course= course
      this.initializeRoutes();
    }
    public addQuiz= async(req: Request, res: Response): Promise<void>=>{
      const body = req.body
      console.log(body)
        try {
            const user = await this.user.findOne
            ({ username: body.username });
            if (!user) {
              throw new Error('No user Found');
            }
            const course = await this.course.findOne
            ({ courseName: body.courseName });
            const { role} = user.toObject();
            const courseId = course.toObject()._id;
            if(role === "Teacher" && courseId){
              const questionIds = [];
              let category = '';
              const quizInfo = req.body.quiz;
              for (const quizData of req.body.quiz.questions) {
                  category = quizInfo.category;
                  const question = await this.question.create({
                      questionText: quizData.questionText,
                      type: quizData.type,
                      options: quizData.options.concat(quizData.correctOption), 
                      correctOption: quizData.correctOption,
                      level: quizInfo.difficulty
                  });
                  questionIds.push(question._id);
              }
              console.log("before create quiz")
              // const questions = await Question.find({ _id: { $in: questionIds } });
              await this.quiz.create({
                  course: courseId,
                  quizTitle: `Quiz for ${category}`,
                  description: `Quiz for ${category}`,
                  category: category,
                  level: req.body.quiz.difficulty,
                  questions: questionIds,
              });
              console.log("after create quiz")
                    res.status(200).json({message:"Quiz successfully added"});
                    
              }
              else{
                throw new Error('Not a teacher');
              }
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }
    public deleteQuiz= async(req: Request, res: Response): Promise<void>=>{
      const quizId = req.params.quizID
      try {
        const quiz = await this.quiz.findById(quizId);
        if (!quiz) {
            res.status(404).json({message:"Quiz not found"});
            return;
        }
        const questionIds = quiz.questions;
        await Question.deleteMany({ _id: { $in: questionIds } });
        await this.quiz.findByIdAndDelete(quizId);
        res.status(200).json({message:"Quiz and associated questions deleted successfully"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    }
    public  getQuizzes= async(req: Request, res: Response): Promise<void>=>{
      const courseName = req.params.courseName
      try {
        // Find the course document by course name
        const course = await this.course.findOne({ courseName: courseName });
        if (!course) {
          res.status(404).json({message:"course not found"});
          return;
        }

        // Query quizzes by course ID and populate the 'questions' field
        const quizzes = await this.quiz.find({ course: course._id }).populate('questions');
        res.status(500).json(quizzes);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
  }
  
    initializeRoutes(): void {
      this.router.post('/quizzes', this.addQuiz);
      this.router.get('/quizzes/:courseName', this.getQuizzes);
      this.router.delete('/quizzes/:quizID', this.deleteQuiz);
    }
  
  
  }
  
  export default TeacherRouter;
  