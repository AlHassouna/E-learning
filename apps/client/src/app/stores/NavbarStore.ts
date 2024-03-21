import StoreBase from './StoreBase';

import { action, makeObservable, observable } from 'mobx';
import { getCoursesBySearch, getAllCourses } from '../api/index';
import { ICourse } from '../api/api-types';

class NavbarStore extends StoreBase {
  public current = '';
  public courses: ICourse[] = [];
  public isLoading = false;
  public coursesBySearch: ICourse[] = [];
  public chosenCourse = '';
  public courseId = '';
  public loadingSearch = false;

  constructor() {
    super();

    makeObservable(this, {
      current: observable,
      isLoading: observable,
      setCurrent: action,
      search: action,
      getAll: action,
      chosenCourse: observable,
      setLoadingSearch: action,
      loadingSearch: observable,
      setChosenCourse: action,
      coursesBySearch: observable,
      setCourses: action,
      setIsLoading: action,
      courseId: observable,
      setCourseId: action
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

  public setChosenCourse = (course: string): void => {
    this.chosenCourse = course;
  };

  public setCourseId = (id: string): void => {
    this.courseId = id;
  };

  public setLoadingSearch = (loadingSearch: boolean): void => {
    this.loadingSearch = loadingSearch;
  };

  public search = async (search: string): Promise<void> => {
    try {
      this.setLoadingSearch(true);
      this.setCurrent(search);
      const courses = await getCoursesBySearch(search);
      this.coursesBySearch = courses;
      this.setLoadingSearch(false);
    } catch (error) {
      console.error(error);
      this.setLoadingSearch(false);
    }
  };

  public getAll = async (): Promise<void> => {
    try {
      this.setIsLoading(true);
      const courses = await getAllCourses();
      this.setCourses(courses);
      this.setIsLoading(false);
    } catch (error) {
      console.error(error);
      this.setIsLoading(false);
    }
  };
}

export default NavbarStore;
