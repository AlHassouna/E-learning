import { IContent } from '../api/api-types';
import StoreBase from './StoreBase';
import { action, makeObservable, observable } from 'mobx';
import { getContentByCourse } from '../api/index';


export class ContentStore extends StoreBase {
  content: IContent = {
    courseTitle: '',
    content: '',
    course: {
      _id: '',
      courseName: '',
      description: '',
      teacher: {
        data: {
          id: '',
          username: '',
          email: '',
          role: '',
          status: false
        }
      },
      participants: [{
        data: {
          id: '',
          username: '',
          email: '',
          role: '',
          status: false
        }
      }],
      title: '',
      courseImage: ''
    }
  };

  constructor() {
    super();

    makeObservable(this, {
      content: observable,
      setContent: action,
      getContent: action
    });
  }

  public setContent = (content: IContent): void => {
    this.content = content;
  };

  public getContent = async (courseTitle: string): Promise<void> => {
    try {
      this.rootStore.main.setLoading(true);
      const contentByCourse = await getContentByCourse(courseTitle);
      this.setContent(contentByCourse);
      this.rootStore.main.setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
}
