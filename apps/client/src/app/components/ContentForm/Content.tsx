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
import { BackTop, Button } from 'antd';
import { QuizButton } from '../../styles/index';
import { getItem } from '../../utils/localStorage';
import { Link, useParams } from 'react-router-dom';


interface ContentProps {
  courseTitle: string;
  onDifficultySelect: (difficulty: string) => void;
}

export const Content: React.FC<ContentProps> = observer(({ courseTitle, onDifficultySelect }) => {
  const { content, main } = useStore();
  const { isLoading } = main;
  const { getContent, content: courseContent } = content;
  const token = getItem('token');
  const paramsTitle= useParams().courseTitle as string
  //@ts-ignore
  const role = JSON.parse(token).role;
  useEffect(() => {
    const fetchContent = async () => {
      await getContent(courseTitle || paramsTitle);
    };
    fetchContent();
  }, [courseTitle]);
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
            <div>
              <BackTop />
              <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
            </div>
            <CourseTitle>{courseContent.courseTitle}</CourseTitle>
            <FirstIcon src={img1}></FirstIcon>
            <div style={{ display: 'flex', justifyContent: 'center' }}>

              <CourseContent>{courseContent.content}</CourseContent>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            {role === "Teacher"?
            <Link to={"/quizzes/"+courseTitle}>
<Button>
Quizzes Management
</Button>
</Link>
            :
              <DModel btnTitle={'Take A Quiz'} title={'Take A Quiz'} children={
                <div style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <QuizButton onClick={() => handleDifficultySelection('easy')}>Easy</QuizButton>
                  <br></br>
                  <QuizButton onClick={() => handleDifficultySelection('medium')}>Medium</QuizButton>
                  <br></br>
                  <QuizButton onClick={() => handleDifficultySelection('hard')}>Hard</QuizButton>
                </div>
              }>
              </DModel>
}
            </div>
            <SecondIcon src={img2}></SecondIcon>
          </ContentDiv>
      }
    </>
  );
});
