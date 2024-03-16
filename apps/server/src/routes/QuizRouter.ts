import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import he from 'he';
import { Quiz, Question, QuizAttempt, Course } from '../models/auth';

const router = express.Router();

router.get('/:categoryId/:difficultyId', async (req: Request, res: Response) => {
    try {
        const { categoryId, difficultyId } = req.params;

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
                response = await axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&difficulty=${difficultyId}`);
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
                level: quizData.difficulty,
            });

            questionIds.push(question._id);
        }

        const questions = await Question.find({ _id: { $in: questionIds } });
        const quiz = await Quiz.create({
            course: "65e8f7237e4c40e2ac2cc5a3",
            quizTitle: `Quiz for ${category}`,
            description: `Quiz for ${category}`,
            category: category,
            level: difficultyId,
            questions: questions,
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
        console.log(userId);
        
        const {totalScore, isPerfect} = calculateScore(questionAttempts);

        const quizAttempt = await QuizAttempt.create({
            quiz: quizId,
            user: userId,
            questionAttempts: questionAttempts,
            score: totalScore,
            isPerfect: isPerfect
        });

        res.status(200).json({ quizAttempt });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function calculateScore(questionAttempts) {
    let totalScore = 0;
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
        }
        else{
            isPerfect = false;
        }
    }
    return {totalScore, isPerfect};
}

  
export default router;
