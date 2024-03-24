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
  CenterContainer
} from '../../styles';
import { DeleteOutlined } from '@ant-design/icons';
import img1 from '../../../assets/elearning.png';
import img2 from '../../../assets/elearning (1).png';
import { DModel, LoadingSpin } from '../../core';
import { BackTop, Button, Popconfirm, message } from 'antd';
import { QuizButton } from '../../styles/index';
import { getItem } from '../../utils/localStorage';
import { Link, useParams } from 'react-router-dom';
import { AddContentModal, ContentFormValues } from './addContent';
import { addContent, deleteContent } from '../../api';

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
        content: 'The content was successfully added'
      });
    };

    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'Failed to add content'
      });
    };
    const { content, main } = useStore();
    const [showModal, setShowModal] = useState(false);
    const { isLoading } = main;
    const { getContent, content: courseContent, setContent } = content;
    const token = getItem('token');
    const paramsTitle = useParams().courseTitle as string;
    const role = JSON.parse(token as string)?.role;
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
        file: value.file
      };

      const data = new FormData();
      //@ts-ignore
      data.append('courseId', courseId);
      data.append('courseTitle', newContent.courseTitle);
      data.append('content', newContent.content);
      data.append('contentType', newContent.contentType);
      data.append('file', newContent.file);
      try {
        await addContent(data);
        success();
        setShowModal(false);
        fetchContent();
      } catch (err) {
        error();
      }
    };

    async function handleDeleteContent(contentId: string) {
      try {
        await deleteContent(contentId);
        success();
        fetchContent();

      } catch (err) {
        error();
      }
    }

    const handleDragStart = (e: any, index: any) => {
      e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e: any) => {
      e.preventDefault();
    };

    const handleDrop = (e: any, newIndex: any) => {
      e.preventDefault();
      const oldIndex = e.dataTransfer.getData('text/plain');
      // Rearrange the courseContent array
      const updatedContent = [...courseContent];
      const itemToMove = updatedContent[oldIndex];
      updatedContent.splice(oldIndex, 1);
      updatedContent.splice(newIndex, 0, itemToMove);
      setContent(updatedContent); // Assuming you have a state variable and setter function to update the courseContent
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
                <div key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}
                     draggable="true"
                     onDragStart={(e) => handleDragStart(e, index)}
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, index)}>

                  <CourseContent>
                    {role === 'Teacher' ? (
                      <Popconfirm
                        placement="left"
                        title={'Do You Want To Delete This Text?'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteContent(course._id)}
                      >
                        <Button danger
                                type="text"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                title="Delete question"
                        />{' '}
                      </Popconfirm>
                    ) : null}
                    {course.content}</CourseContent>
                </div>
              ) : course.contentType === 'image' ? (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}
                     draggable="true"
                     onDragStart={(e) => handleDragStart(e, index)}
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, index)}>

                  <CourseContent>
                    {role === 'Teacher' ? (
                      <Popconfirm
                        placement="left"
                        title={'Do You Want To Delete This Image?'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteContent(course._id)}
                      >
                        <Button danger
                                type="text"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                title="Delete question"
                        />{' '}
                      </Popconfirm>
                    ) : null}
                    <img width="90%" src={course.content}></img>
                  </CourseContent>
                </div>
              ) : (
                <div key={index} style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}
                     draggable="true"
                     onDragStart={(e) => handleDragStart(e, index)}
                     onDragOver={handleDragOver}
                     onDrop={(e) => handleDrop(e, index)}>

                  <CourseContent>

                    {role === 'Teacher' ? (
                      <Popconfirm
                        placement="left"
                        title={'Do You Want To Delete This Video?'}
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDeleteContent(course._id)}
                      >
                        <Button danger
                                type="text"
                                shape="circle"
                                icon={<DeleteOutlined />}
                                title="Delete question"
                        />{' '}
                      </Popconfirm>
                    ) : null}
                    <video width="80%" controls>
                      <source src={course.content}></source>
                      Your browser does not support HTML video.
                    </video>
                  </CourseContent>
                </div>
              )
            )}

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '50px'
              }}
            >
              {role === 'Teacher' ? (
                <Link to={'/quizzes/' + courseTitle}>
                  <Button type="primary"
                          style={{ backgroundColor: '#786283' }}>Quizzes Management</Button>
                </Link>
              ) : (
                <DModel
                  btnTitle={'Take A Quiz'}
                  title={'Take A Quiz'}
                  children={
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column'
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
              <br></br>
              <AddContentModal
                visible={showModal}
                onCreate={createContent}
                onCancel={() => {
                  setShowModal(false);
                }}
              ></AddContentModal>
              <br></br>
              {role === 'Teacher' ? (
                <Button type="primary"
                        onClick={() => {
                          setShowModal(!showModal);
                        }}
                >
                  Add Content
                </Button>
              ) : null}
            </div>
            <SecondIcon src={img2}></SecondIcon>
          </ContentDiv>

        )}
      </>
    );
  }
);
