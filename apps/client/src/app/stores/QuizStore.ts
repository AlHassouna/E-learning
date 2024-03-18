import { action, makeObservable, observable } from 'mobx';
import { QuizType } from '../types';
import StoreBase from './StoreBase';
import { postQuiz } from '../api';

export class QuizStore extends StoreBase {
  quizzes: QuizType[] = [];
  public isLoading = true;
  public currentQuiz: QuizType = {} as QuizType;

  constructor() {
    super();
    makeObservable(this, {
      quizzes: observable,
      fetchQuizzes: action,
      isLoading: observable,
      setIsLoading: action,
      currentQuiz: observable,
      setCurrentQuiz: action
    });
  }

  setCurrentQuiz = (quiz: QuizType) => {
    this.currentQuiz = quiz;
  };
  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };

  async fetchQuizzes(categoryId: string, difficultyId: string, courseId: string) {
    try {
      const { quiz } = await postQuiz(categoryId, difficultyId, courseId);
      this.currentQuiz = quiz;
      this.setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      this.setIsLoading(false);
    }
  }
}

