import { action, makeObservable, observable } from 'mobx';
import { QuizType } from '../types';
import StoreBase from './StoreBase';
import { getQuizzes, postQuiz, deleteQuiz } from '../api';

export class QuizStore extends StoreBase {
  quizzes: QuizType[] = [];
  public isLoading = true;
  public currentQuiz: QuizType = {} as QuizType;
  public allQuizzesByCourse:QuizType[]=[]
  

  constructor() {
    super();
    makeObservable(this, {
      quizzes: observable,
      fetchQuizzes: action,
      isLoading: observable,
      setIsLoading: action,
      currentQuiz: observable,
      setCurrentQuiz: action,
      allQuizzesByCourse:observable,
      setAllQuizzesByCourse:action,
      deleteQuizByID:action
    });
  }

  setCurrentQuiz = (quiz: QuizType) => {
    this.currentQuiz = quiz;
  };
  setIsLoading = (value: boolean) => {
    this.isLoading = value;
  };
  setAllQuizzesByCourse=(quizzes:QuizType[])=>{
    this.allQuizzesByCourse=quizzes
  }
  deleteQuizByID = async (quizID:string)=>{
    try {
      const {message }= await deleteQuiz(quizID)
      this.setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      this.setIsLoading(false);
    }
  }



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
  async getAllQuizzes(courseTitle: string) {
    try {
      const  quizzes  = await getQuizzes(courseTitle);
      // this.allQuizzesByCourse = quizzes;
      console.log(quizzes)
      this.setIsLoading(false);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      this.setIsLoading(false);
    }
  }
}

