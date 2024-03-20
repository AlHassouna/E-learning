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
import { addParticipant } from '../../api';
import { getItem } from '../../utils/localStorage';

const { Search } = Input;

export interface SearchProps {
  search: (search: string) => void;
}

export const SearchInput: React.FC<SearchProps> = observer(({ search }) => {
  const { navbar } = useStore();
  const { current, setCurrent, loadingSearch, coursesBySearch, setChosenCourse, getAll } = navbar;
  const location = useLocation();
  const [inputValue, setInputValue] = useState('');
  const token = getItem('token');


  //@ts-ignore
  const userId = JSON.parse(token)._id;

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
            loadingSearch ? <CenterContainer><LoadingSpin /></CenterContainer> : coursesBySearch.length === 0 ?
              <NoCourses>
                <h1>No courses found</h1>
              </NoCourses>
              : coursesBySearch.map((course, index) => (
                <CourseCard key={index} onClick={async () => {
                  setChosenCourse(course.courseName);
                  await addParticipant(course._id, userId);
                  await getAll();
                  setCurrent('');
                  setInputValue('');
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
