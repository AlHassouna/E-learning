import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import he from 'he';
import { Quiz, Question, QuizAttempt, Course } from '../models/auth';

const router = express.Router();

router.post('/:categoryId/:difficultyId', async (req: Request, res: Response) => {
  try {
    const { categoryId, difficultyId } = req.params;
    const { courseId } = req.body;
    if (!categoryId) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (!difficultyId) {
      return res.status(404).json({ error: 'difficulty not found' });
    }

    let retryCount = 0;
    const maxRetries = 3;
    let response;

    do {
      try {
        const categories = await axios.get('https://opentdb.com/api_category.php');
        const category = categories.data.trivia_categories.find((c: any) => c.name.includes(categoryId));
        response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${category.id}&difficulty=${difficultyId}`);
        break;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 429 && retryCount < maxRetries) {
          const waitTime = Math.pow(2, retryCount) * 1000;
          await new Promise(resolve => setTimeout(resolve, waitTime));
          retryCount++;
        } else {
          throw error;
        }
      }
    } while (retryCount < maxRetries);
    if (!response) {
      throw new Error('Request failed after maximum retries');
    }

    const { results } = response.data;
    const questionIds = [];
    let category = '';
    for (const quizData of results) {
      category = quizData.category;
      const decodedQuestion = he.decode(quizData.question);
      const question = await Question.create({
        questionText: decodedQuestion,
        type: quizData.type,
        options: quizData.incorrect_answers.concat(quizData.correct_answer),
        correctOption: quizData.correct_answer,
        level: quizData.difficulty
      });

      questionIds.push(question._id);
    }

    const questions = await Question.find({ _id: { $in: questionIds } });
    const quiz = await Quiz.create({
      course: courseId,
      quizTitle: `Quiz for ${category}`,
      description: `Quiz for ${category}`,
      category: category,
      level: difficultyId,
      questions: questions
    });

    res.status(200).json({ quiz });
  } catch (error) {
    console.error('Error fetching and saving quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/submit', async (req: Request, res: Response) => {
  try {
    const { quizId, userId, questionAttempts } = req.body;

    const { totalScore, isPerfect, maxScore } = calculateScore(questionAttempts);

    const quizAttempt = await QuizAttempt.create({
      quiz: quizId,
      user: userId,
      questionAttempts: questionAttempts,
      score: totalScore,
      isPerfect: isPerfect,
      maxScore: maxScore
    });

    res.status(200).json({ quizAttempt });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function calculateScore(questionAttempts) {
  let totalScore = 0;
  let maxScore = 0;
  let isPerfect = true;
  for (const attempt of questionAttempts) {
    if (attempt.isCorrect) {
      switch (attempt.level) {
        case 'easy':
          totalScore += 1;
          break;
        case 'medium':
          totalScore += 2;
          break;
        case 'hard':
          totalScore += 3;
          break;
        default:
          break;
      }
    } else {
      isPerfect = false;
    }
 
  }
  console.log('level: ', questionAttempts[0].level);
  
  switch (questionAttempts[0].level) {
    case 'easy':
      maxScore = questionAttempts.length;
      console.log('easy: ', maxScore);
      
      break;
    case 'medium':
      maxScore = questionAttempts.length*2;
      console.log('medium: ', maxScore);

      break;
    case 'hard':
      maxScore = questionAttempts.length*3;
      console.log('hard: ', maxScore);

      break;
    default:
      break;
  }
  return { totalScore, isPerfect, maxScore };
}


export default router;
