import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Content } from '../../components/ContentForm/Content';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../stores/setupContext';


export const ContentPage: React.FC = observer(() => {
  const { navbar } = useStore();
  const { courses, chosenCourse, setCourseId } = navbar;
  const navigate = useNavigate();
  useEffect(() => {
    const categoryMap = courses.reduce((acc, course) => {
      // @ts-ignore
      acc[course.courseName.toLowerCase()] = course._id;
      return acc;
    }, {});
    // @ts-ignore
    setCourseId(categoryMap[chosenCourse.toLowerCase()]);
  }, [chosenCourse]);

  const handleDifficultySelect = (difficulty: string) => {
    if (chosenCourse.toLowerCase() !== null) {
      navigate(`/quiz?category=${chosenCourse.toLowerCase()}&difficulty=${difficulty}`);
    } else {
      console.error('Category ID not found for course title:', chosenCourse);
    }
  };

  return (
    <Content courseTitle={chosenCourse} onDifficultySelect={handleDifficultySelect} />
  );
});
