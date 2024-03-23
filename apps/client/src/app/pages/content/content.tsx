import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Content } from '../../components/ContentForm/Content';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../stores/setupContext';


export const ContentPage: React.FC = observer(() => {
  const { navbar, auth } = useStore();
  const { courses, chosenCourse, setCourseId } = navbar;
  const navigate = useNavigate();
  const paramsTitle= useParams().courseTitle as string;
  const { isAuthenticated } = auth;

  useEffect(() => {
    const categoryMap = courses.reduce((acc, course) => {
      // @ts-ignore
      acc[course.courseName.toLowerCase()] = course._id;
      return acc;
    }, {});
    // @ts-ignore
    setCourseId(categoryMap[chosenCourse.toLowerCase() || paramsTitle.toLowerCase()]);
  }, [chosenCourse]);

  const handleDifficultySelect = (difficulty: string) => {
    if (chosenCourse.toLowerCase() !== null || paramsTitle.toLowerCase() !== null) {
      navigate(`/quiz?category=${chosenCourse.toLowerCase() || paramsTitle.toLowerCase()}&difficulty=${difficulty}`);
    } else {
      console.error('Category ID not found for course title:', chosenCourse);
    }
  };

  return (
    <>
    {isAuthenticated ? (
      <Content courseTitle={chosenCourse} onDifficultySelect={handleDifficultySelect} />
      ) : (
        <Navigate to="/auth" />
        )}
        </>
  );
});
