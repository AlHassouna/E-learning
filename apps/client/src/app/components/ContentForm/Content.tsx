import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { useStore } from '../../stores/setupContext';
import {
  CourseContent,
  CourseTitle,
  QuizzButton,
  FirstIcon,
  SecondIcon,
  ContentDiv,
  CenterContainer
} from '../../styles';
import img1 from '../../../assets/elearning.png';
import img2 from '../../../assets/elearning (1).png';
import { DModel, LoadingSpin } from '../../core';
import { Button } from 'antd';
import {QuizButton} from '../../styles/index'


interface ContentProps {
  courseTitle: string;
  onDifficultySelect: (difficulty: string) => void;
}

export const Content: React.FC<ContentProps> = observer(({ courseTitle, onDifficultySelect }) => {
  const { content, main } = useStore();
  const { isLoading } = main;
  const { getContent, content: courseContent } = content;
  useEffect(() => {
    getContent(courseTitle);
  }, []);

  const handleDifficultySelection = (difficulty: string) => {
    onDifficultySelect(difficulty);
  };

  return (
    <>
      {
        isLoading ? (
            <CenterContainer>
              <LoadingSpin />
            </CenterContainer>
          ) :
          <ContentDiv>
            <CourseTitle>{courseContent.courseTitle}</CourseTitle>
            <FirstIcon src={img1}></FirstIcon>
            <CourseContent>{courseContent.content}</CourseContent>
            <SecondIcon src={img2}></SecondIcon>
            <DModel btnTitle={'Take A Quiz'} title={'Take A Quiz'} children={
              <div style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
                <QuizButton onClick={() => handleDifficultySelection('easy')}>Easy</QuizButton>
                <br></br>
                <QuizButton onClick={() => handleDifficultySelection('medium')}>Medium</QuizButton>
                <br></br>
                <QuizButton onClick={() => handleDifficultySelection('hard')}>Hard</QuizButton>
              </div>
            }></DModel>
          </ContentDiv>
      }
    </>
  );
});
