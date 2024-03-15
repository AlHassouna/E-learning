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


interface ContentProps {
  courseTitle: string;
}

export const Content: React.FC<ContentProps> = observer(({ courseTitle }) => {
  const { content, main } = useStore();
  const { isLoading } = main;
  const { getContent, content: courseContent } = content;
  useEffect(() => {
    getContent(courseTitle);
  }, []);

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
                flexDirection: 'column'
              }}>
                <div>Easy</div>
                <div>Meduiem</div>
                <div>Hard</div>
              </div>
            }></DModel>
          </ContentDiv>
      }
    </>
  );
});
