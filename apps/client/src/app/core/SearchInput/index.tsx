import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useStore } from '../../stores/setupContext';
import { observer } from 'mobx-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  CenterContainer,
  CourseCard,
  CoursesDescription,
  CoursesTitle,
  NoCourses,
  SearchContainer,
  SearchOptions
} from '../../styles';
import { LoadingSpin } from '../Spin/LoadingSpin';

const { Search } = Input;

export interface SearchProps {
  search: (search: string) => void;
}

export const SearchInput: React.FC<SearchProps> = observer(({ search }) => {
  const { navbar } = useStore();
  const { current, setCurrent, isLoading, coursesBySearch, setChosenCourse } = navbar;
  const navigate = useNavigate();
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
    setInputValue(e.target.value);
  };

  useEffect(() => {
    setInputValue('');
    setCurrent('');
  }, [location.pathname]);

  return (
    <SearchContainer>
      <Search placeholder="
        Search for courses
      " onChange={onChange} value={inputValue} />

      {current === '' ? null :
        <SearchOptions>
          {
            isLoading ? <CenterContainer><LoadingSpin /></CenterContainer> : coursesBySearch.length === 0 ?
              <NoCourses>
                <h1>No courses found</h1>
              </NoCourses>
              : coursesBySearch.map((course, index) => (
                <CourseCard key={index} onClick={() => {
                  setChosenCourse(course.courseName);
                  navigate(`/courses/${course.courseName.toLowerCase()}`);
                }}>
                  <CoursesTitle>{course.courseName}:</CoursesTitle>
                  <CoursesDescription>{course.description}</CoursesDescription>
                </CourseCard>
              ))
          }
        </SearchOptions>
      }
    </SearchContainer>
  );
});
