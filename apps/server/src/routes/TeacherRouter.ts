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
  question: any;

  constructor(user: any, quiz: any, course: any, question: any) {
    this.router = express.Router();
    this.user = user;
    this.quiz = quiz;
    this.question = question;
    this.course = course;
    this.initializeRoutes();
  }

  public addQuiz = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    console.log(body);
    try {
      const user = await this.user.findOne
      ({ username: body.username });
      if (!user) {
        throw new Error('No user Found');
      }
      const course = await this.course.findOne
      ({ courseName: body.courseName });
      const { role } = user.toObject();
      const courseId = course.toObject()._id;
      if (role === 'Teacher' && courseId) {
        const questionIds = [];
        let category = '';
        const quizInfo = req.body.quiz;
        for (const quiz of req.body.quiz.questions) {
          category = quizInfo.category;
          const question = await this.question.create({
            questionText: quiz.questionText,
            type: quiz.type,
            options: quiz.options.concat(quiz.correctOption),
            correctOption: quiz.correctOption,
            level: quizInfo.level
          });
          questionIds.push(question._id);
        }
        console.log('before create quiz');
        // const questions = await Question.find({ _id: { $in: questionIds } });
        await this.quiz.create({
          course: courseId,
          quizTitle: `Quiz for ${category}`,
          description: `Quiz for ${category}`,
          category: category,
          level: req.body.quiz.level,
          questions: questionIds
        });
        console.log('after create quiz');
        res.status(200).json({ message: 'Quiz successfully added' });

      } else {
        throw new Error('Not a teacher');
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  public deleteQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.quizID;
    try {
      const quiz = await this.quiz.findById(quizId);
      if (!quiz) {
        res.status(404).json({ message: 'Quiz not found' });
        return;
      }
      const questionIds = quiz.questions;
      await Question.deleteMany({ _id: { $in: questionIds } });
      await this.quiz.findByIdAndDelete(quizId);
      res.status(200).json({ message: 'Quiz and associated questions deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  public getQuizzes = async (req: Request, res: Response): Promise<void> => {
    const courseName = req.params.courseName;
    try {
      // Find the course document by course name
      const course = await this.course.findOne({ courseName: courseName });
      if (!course) {
        res.status(404).json({ message: 'course not found' });
        return;
      }

      const quizzes = await this.quiz.find({ course: course._id })
      res.send(quizzes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  public getQuiz = async (req: Request, res: Response): Promise<void> => {
    const quizId = req.params.quizId;
    try {
      // Find the course document by course name

      const quiz = await this.quiz.findById(quizId).populate("questions")
      res.send(quiz);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
public editQuiz = async (req: Request, res: Response): Promise<void> => {
  const body = req.body;
  try {
    const user = await this.user.findOne({ username: body.username });
    if (!user) {
      throw new Error('No user Found');
    }

    const { role } = user.toObject();

    if (role === 'Teacher') {
      const { quiz } = req.body; // Assuming you send quizId and updated quiz
      const existingQuiz = await this.quiz.findById(quiz._id);
      if (!existingQuiz) {
        throw new Error('Quiz not found');
      }
      existingQuiz.quizTitle = quiz.quizTitle;
      existingQuiz.category = quiz.category;
      existingQuiz.level = quiz.level;
      await existingQuiz.save();
      const questionIds = [];


      for (const questionData of quiz.questions) {
        let question;
        if (questionData._id) {
          // If question has an ID, update existing question
          question = await this.question.findById(questionData._id);
          if (!question) {
            throw new Error(`Question with ID ${questionData._id} not found`);
          }
          question.questionText = questionData.questionText;
          question.type = questionData.type;
          question.options = questionData.options.concat(questionData.correctOption);
          question.correctOption = questionData.correctOption;
          question.level = quiz.level;
          await question.save();
        } 
        questionIds.push(question._id);
      }

      // Update quiz with new set of questions
      existingQuiz.questions = questionIds;
      await existingQuiz.save();

      res.status(200).json({ message: 'Quiz successfully updated' });
    } else {
      throw new Error('Not a teacher');
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


  initializeRoutes(): void {
    this.router.post('/quizzes', this.addQuiz);
    this.router.get('/quizzes/:courseName', this.getQuizzes);
    this.router.get('/quiz/:quizId', this.getQuiz);
    this.router.delete('/quizzes/:quizID', this.deleteQuiz);
    this.router.put('/quizzes', this.editQuiz);
  }


}

export default TeacherRouter;
