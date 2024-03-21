import { makeObservable,observable, action } from 'mobx';
import { Question } from './addQuestionStore';
import StoreBase from './StoreBase';
import { addQuiz, deleteQuiz, getQuizzes } from '../api/index';

export class Addquiz  extends StoreBase {

  constructor() {
    super();
    makeObservable(this, {
      // Observables -
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // Actions
      addQuiz: action
    });
  }
  public addQuiz = async (quiz: any): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true)
      await addQuiz(quiz);
      this.rootStore.main.setLoading(false);
    } catch (err: any) {
      this.rootStore.main.setLoading(false);
      
    }
  };
  public getQuizzes =  async (courseTitle: string): Promise<any>=>{
    try {
      this.rootStore.main.setLoading(true)
      await getQuizzes(courseTitle);
      this.rootStore.main.setLoading(false);
    } catch (err: any) {
      this.rootStore.main.setLoading(false);
      
    }
  }
  public deleteQuiz =  async (quizID: string): Promise<any>=>{
    try {
      this.rootStore.main.setLoading(true)
      await deleteQuiz(quizID);
      this.rootStore.main.setLoading(false);
    } catch (err: any) {
      this.rootStore.main.setLoading(false);
      
    }
  }
}
