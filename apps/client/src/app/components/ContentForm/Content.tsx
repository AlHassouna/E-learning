import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../stores/setupContext';
import {
  CourseContent,
  CourseTitle,
  QuizzButton,
  FirstIcon,
  SecondIcon,
  ContentDiv,
  CenterContainer,
} from '../../styles';
import img1 from '../../../assets/elearning.png';
import img2 from '../../../assets/elearning (1).png';
import { DModel, LoadingSpin } from '../../core';
import { BackTop, Button, message } from 'antd';
import { QuizButton } from '../../styles/index';
import { getItem } from '../../utils/localStorage';
import { Link, useParams } from 'react-router-dom';
import { AddContentModal, ContentFormValues } from './addContent';
import { addContent } from '../../api';

interface ContentProps {
  courseTitle: string;
  onDifficultySelect: (difficulty: string) => void;
}

export const Content: React.FC<ContentProps> = observer(
  ({ courseTitle, onDifficultySelect }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'The content was successfully added',
      });
    };

    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'Failed to add content',
      });
    };
    const { content, main } = useStore();
    const [showModal, setShowModal] = useState(false);
    const { isLoading } = main;
    const { getContent, content: courseContent } = content;
    const token = getItem('token');
    const paramsTitle = useParams().courseTitle as string;
    //@ts-ignore
    const role = JSON.parse(token).role;
    const fetchContent = async () => {
      await getContent(courseTitle || paramsTitle);
    };
    useEffect(() => {
      fetchContent();
    }, [courseTitle]);
    const handleDifficultySelection = (difficulty: string) => {
      onDifficultySelect(difficulty);
    };
    const createContent = async (value: any) => {
      const courseId = courseContent[0].course;
      const newContent = {
        courseId,
        courseTitle: courseContent[0].courseTitle,
        content: value.content,
        contentType: value.contentType,
        file: value.file,
      };
      try {
        await addContent(newContent);
        success();
        setShowModal(false);
        fetchContent();
      } catch (err) {
        error();
      }
    };

    return (
      <>
        {isLoading ? (
          <CenterContainer>
            <LoadingSpin />
          </CenterContainer>
        ) : (
          <ContentDiv>
            {contextHolder}
            <div>
              <BackTop />
              <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
            </div>
            <CourseTitle>{courseContent[0].courseTitle}</CourseTitle>
            <FirstIcon src={img1}></FirstIcon>
            {courseContent.map((course, index) =>
              course.contentType !== 'video' &&
              course.contentType !== 'image' ? (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CourseContent>{course.content}</CourseContent>
                </div>
              ) : course.contentType === 'image' ? (
                <CourseContent>
                  <img src={course.content}></img>
                </CourseContent>
              ) : (
                <CourseContent>
                  <video width="400" controls>
                    <source src={course.content}></source>
                    Your browser does not support HTML video.
                  </video>
                </CourseContent>
              )
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '50px',
              }}
            >
              {role === 'Teacher' ? (
                <Link to={'/quizzes/' + courseTitle}>
                  <Button>Quizzes Management</Button>
                </Link>
              ) : (
                <DModel
                  btnTitle={'Take A Quiz'}
                  title={'Take A Quiz'}
                  children={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <QuizButton
                        onClick={() => handleDifficultySelection('easy')}
                      >
                        Easy
                      </QuizButton>
                      <br></br>
                      <QuizButton
                        onClick={() => handleDifficultySelection('medium')}
                      >
                        Medium
                      </QuizButton>
                      <br></br>
                      <QuizButton
                        onClick={() => handleDifficultySelection('hard')}
                      >
                        Hard
                      </QuizButton>
                    </div>
                  }
                ></DModel>
              )}
              <AddContentModal
                visible={showModal}
                onCreate={createContent}
                onCancel={() => {
                  setShowModal(false);
                }}
              ></AddContentModal>
              <Button
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                Add Content
              </Button>
            </div>

            <SecondIcon src={img2}></SecondIcon>
          </ContentDiv>
        )}
      </>
    );
  }
);
