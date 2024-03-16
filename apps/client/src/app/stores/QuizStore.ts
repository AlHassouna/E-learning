import { action, makeObservable, observable } from 'mobx';
import { QuizType } from '../types';
import StoreBase from './StoreBase';

export class QuizStore extends StoreBase {
  quizzes: QuizType[] = [];

  constructor() {
    super();
    makeObservable(this, {
      quizzes: observable,
      fetchQuizzes: action
    });
  }

  async fetchQuizzes(categoryId: number, difficultyId: string) {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/quizzes/${categoryId}/${difficultyId}`);
      const { quiz } = await response.json();
      this.quizzes.push(quiz)
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }
}

export default new QuizStore();
