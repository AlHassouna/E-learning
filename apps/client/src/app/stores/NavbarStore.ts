import StoreBase from './StoreBase';

import { action, makeObservable, observable } from 'mobx';
import { getCoursesBySearch } from '../api/index';
import { ICourse } from '../api/api-types';

class NavbarStore extends StoreBase {
  public current = '';
  public courses: ICourse[] = [];
  public isLoading = false;

  constructor() {
    super();

    makeObservable(this, {
      current: observable,
      isLoading: observable,
      setCurrent: action,
      search: action,
      setCourses: action,
      setIsLoading: action
    });
  }

  public setCurrent = (current: string): void => {
    this.current = current;
  };

  public setCourses = (courses: ICourse[]): void => {
    this.courses = courses;
  };

  public setIsLoading = (isLoading: boolean): void => {
    this.isLoading = isLoading;
  };

  public search = async (search: string): Promise<void> => {
    try {
      this.setIsLoading(true);
      this.setCurrent(search);
      const courses = await getCoursesBySearch(search);
      this.setCourses(courses);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  };
}

export default NavbarStore;
