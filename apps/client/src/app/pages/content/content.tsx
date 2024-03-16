import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Content } from '../../components/ContentForm/Content';
import { useNavigate } from 'react-router-dom';

interface ContentProps {
  courseTitle: string;
}

export const ContentPage: React.FC<ContentProps> = observer(({ courseTitle }) => {
  const navigate = useNavigate();
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    const categoryMap: { [key: string]: number } = {
      math: 19, 
      art: 25
    };
    setCategoryId(categoryMap[courseTitle.toLowerCase()]);
  }, [courseTitle]);

  const handleDifficultySelect = (difficulty: string) => {
    if (categoryId !== null) {
      navigate(`/quiz?category=${categoryId}&difficulty=${difficulty}`);
    } else {
      console.error('Category ID not found for course title:', courseTitle);
    }
  };

  return (
    <Content courseTitle={courseTitle} onDifficultySelect={handleDifficultySelect} />
  );
});
