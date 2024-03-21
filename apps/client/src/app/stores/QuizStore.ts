import { action, makeObservable, observable } from 'mobx';
import { QuizType } from '../types';
import StoreBase from './StoreBase';
import { getQuizzes, postQuiz, deleteQuiz } from '../api';

export class QuizStore extends StoreBase {
  quizzes: QuizType[] = [];
  public isLoading = true;
  public currentQuiz: QuizType = {} as QuizType;
  allQuizzesByCourse: QuizType[] = [];


  constructor() {
    super();
    makeObservable(this, {
      quizzes: observable,
      fetchQuizzes: action,
      isLoading: observable,
      setIsLoading: action,
      currentQuiz: observable,
      setCurrentQuiz: action,
      allQuizzesByCourse: observable,
      deleteQuizByID: action,
      getAllQuizzesByCourse: action
    });
  }

  setCurrentQuiz = (quiz: QuizType) => {
    this.currentQuiz = quiz;
  };
  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };

  deleteQuizByID = async (quizID: string) => {
    try {
      const { message } = await deleteQuiz(quizID);
      this.setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      this.setIsLoading(false);
    }
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

  async getAllQuizzesByCourse(courseName: string) {
    try {
      const quizzes = await getQuizzes(courseName);
      console.log('quizzes', quizzes);
      this.allQuizzesByCourse = quizzes;
      this.setIsLoading(false);
    } catch (error) {
      console.log('Error fetching quizzes:', error);
      this.setIsLoading(false);
    }
  }
}
