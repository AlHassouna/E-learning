import React, { useState, useEffect } from 'react';
import { Button, Input, Popconfirm } from 'antd';
import { useStore } from '../../stores/setupContext';
import { observer } from 'mobx-react';
import { useLocation, useNavigate } from 'react-router-dom';
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


  const userId = JSON.parse(token as string)?._id;
  const navigate = useNavigate();
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
                <div>
                  <Popconfirm
                    placement="right"
                    title={'Do You Want To Join The Course?'}
                    okText="Yes"
                    cancelText="No"
                    onConfirm={async () => {
                      await addParticipant(course._id, userId);
                      await getAll();
                      setCurrent('');
                      setInputValue('');
                    }}
                  >
                    <CourseCard key={index}
                                onClick={async () => {
                                  setChosenCourse(course.courseName);
                                  course.participants.includes(userId) ?
                                    navigate(`/courses/${course.courseName}`)
                                    :
                                    null;
                                }}>

                      <CoursesTitle>{course.courseName}:</CoursesTitle>
                      <CoursesDescription>{course.description}</CoursesDescription>

                    </CourseCard>
                  </Popconfirm>
                </div>
              ))
          }
        </SearchOptions>
      }
    </SearchContainer>
  );
});
