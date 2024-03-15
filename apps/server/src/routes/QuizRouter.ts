import express, { Request, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { Quiz, Question, QuizAttempt } from '../models/auth';

const router = express.Router();

router.get('/:categoryId/:difficultyId', async (req: Request, res: Response) => {
    try {
        const { categoryId } = req.params;
        const categoryMapping: { [key: number]: string } = {
            9: 'General Knowledge',
            10: 'Entertainment: Books'
        };

        const category = categoryMapping[categoryId];
         if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const { difficultyId } = req.params;
        const difficultyMapping: { [key: string]: string } = {
            'easy': 'easy',
            'medium': 'medium',
            'hard': 'hard'
        }; 
        
        const difficulty = difficultyMapping[difficultyId];
         if (!difficulty) {
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

        for (const quizData of results) {
            const question = await Question.create({
                questionText: quizData.question,
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
            teacher: "65e8e8d2066b04954f0f8e49",
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

        const score = calculateScore(questionAttempts);

        const quizAttempt = await QuizAttempt.create({
            quiz: quizId,
            user: userId,
            questionAttempts: questionAttempts,
            score: score,
        });

        res.status(200).json({ quizAttempt });
    } catch (error) {
        console.error('Error submitting quiz:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function calculateScore(questionAttempts) {
    let totalScore = 0;
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
    }
    return totalScore;
}

  
export default router;
