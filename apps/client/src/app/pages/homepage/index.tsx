import React, { useEffect, useState } from 'react';
import { useStore } from '../../stores/setupContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { LoadingSpin } from '../../core';
import { CenterContainer } from '../../styles';
import { Card, Col, Row, BackTop, Button, Typography, Popconfirm } from 'antd';
import {
  FlexHomePageContainer, CustomCarousel, SlideContainer, SlideContent,
  SlideText, SlideParagraph, SlideSecondHeader, SlideImg, CustomCoursesCarousel,
  CustomUserCoursesCarousel, HeaderLine, LeftContainer, CardsContainer, CustomUserCoursesCards,
  CustomCoursesCards, CourseImage, JoinButton, CustomFooter, CustomDiv
} from '../../styles/index';
import { EllipsisOutlined, DeleteOutlined, ArrowRightOutlined, PlusOutlined } from '@ant-design/icons';

import image1 from '../../images/elearning.png';
import image2 from '../../images/elearning-2.png';
import image3 from '../../images/elearning-3.png';
import { getItem } from '../../utils/localStorage';
import { addParticipant, removeParticipant } from '../../api';


export const HomePage: React.FC = observer(() => {
  const { auth, navbar, main } = useStore();
  const { isAuthenticated } = auth;
  const { courses: Courses, getAll, isLoading, setChosenCourse } = navbar;
  const token = getItem('token');
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const userId = JSON.parse(token as string)?._id;

  const calculateHowMany = () => {
    let counter = 0;
    Courses.forEach(course => {
      if (course.participants.includes(userId)) {
        counter++;
      }
    });
    return counter;
  };

  const howMany = calculateHowMany();

  const calculateRecommendedCount = () => {
    let counter = 0;
    Courses.forEach(course => {
      if (!course.participants.includes(userId)) {
        counter++;
      }
    });
    return counter;
  };

  const howManyReco = calculateRecommendedCount();

  const onJoinCourse = async (courseId: string, userId: string) => {
    await addParticipant(courseId, userId);
    await getAll();
  };

  const onRemoveCourse = async (courseId: string, userId: string) => {
    await removeParticipant(courseId, userId);
    await getAll();
  };

  const userPart = () => {
    const userCourses = Courses.filter(course => course.participants.includes(userId));

    return userCourses.map(course => (
      <div className="test" key={course._id} style={{
        display: 'flex', justifyContent: 'center', width: '40%'


      }}>
        <CustomCoursesCards
          key={course._id}
          style={{
            ...(howMany === 1 ? {
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              margin: '1em'
            } : { display: 'flex', flexDirection: 'column', margin: '1em' })
          }}
          hoverable
          cover={<CourseImage alt={course.courseName} src={course.courseImage} />}
          actions={[
            <Popconfirm
              placement="bottom"
              title={'Do You Want To UnJoin The Course?'}
              okText="Yes"
              cancelText="No"
              onConfirm={
                () => {
                  onRemoveCourse(course._id, userId);
                }}
            >
              <DeleteOutlined style={{ color: 'red', flex: '1' }} key="delete">
              </DeleteOutlined>
            </Popconfirm>
            ,
            <ArrowRightOutlined style={{ color: '#03565B', flex: '1' }} key="ellipsis" onClick={() => {
              setChosenCourse(course.courseName);
              navigate(`/courses/${course.courseName}`);
            }} />
          ]}
        >
          {/* @ts-ignore */}
          <Card.Meta title={course.courseName} description={<Typography.Paragraph
            ellipsis={{ rows: 3, expandable: false }}>{course.description}</Typography.Paragraph>}
                     style={{ height: '7em' }} />
        </CustomCoursesCards>
      </div>
    ));
  };
  return (
    <>
      {isLoading ? (
        <CenterContainer>
          <LoadingSpin />
        </CenterContainer>
      ) : (
        <>
          {isAuthenticated ? (
            <FlexHomePageContainer>
              <div>
                <BackTop />
                <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
              </div>
              <CustomCarousel autoplay>
                <SlideContainer>
                  <SlideContent>
                    <SlideText>
                      <h1>ONLINE</h1>
                      <SlideSecondHeader>E-LEARNING</SlideSecondHeader>
                      <SlideParagraph>Empower your learning journey with Online E-learning's expert-curated courses,
                        accessible anytime, anywhere.</SlideParagraph>
                    </SlideText>
                    <SlideImg src={image1} alt="Slide 1" />
                  </SlideContent>
                </SlideContainer>
                <SlideContainer>
                  <SlideContent>
                    <SlideText>
                      <h1>STUDY</h1>
                      <SlideSecondHeader>TOGETHER</SlideSecondHeader>
                      <SlideParagraph>Boost collaboration with Study Together's chat, promoting real-time interaction
                        and knowledge exchange among peers.</SlideParagraph>
                    </SlideText>
                    <SlideImg src={image2} alt="Slide 2" />
                  </SlideContent>
                </SlideContainer>
                <SlideContainer>
                  <SlideContent>
                    <SlideText>
                      <h1>COURSES</h1>
                      <SlideSecondHeader>& QUIZZES</SlideSecondHeader>
                      <SlideParagraph>Explore interactive learning with engaging courses and quizzes to enrich your
                        academic journey.</SlideParagraph>
                    </SlideText>
                    <SlideImg src={image3} alt="Slide 3" />
                  </SlideContent>
                </SlideContainer>
              </CustomCarousel>

              <CardsContainer>
                <LeftContainer>
                  <h2 style={{ fontWeight: 'bold' }}>Your Courses</h2>
                </LeftContainer>
                <HeaderLine />
                {/* @ts-ignore */}
                <style jsx>{`:where(.css-dev-only-do-not-override-1fm67j).ant-carousel .slick-dots-bottom {
                  bottom: -15px;
                }`}</style>
                {howMany === 0 ? <h4 style={{ color: '#786283' }}>You have no courses yet!</h4> :
                  <CustomUserCoursesCarousel dots infinite slidesToShow={howMany < 2 ? 1 : 2} slidesToScroll={1}
                                             responsive={[
                                               {
                                                 breakpoint: 768,
                                                 settings: {
                                                   slidesToShow: 1,
                                                   slidesToScroll: 1
                                                 }
                                               }
                                             ]}>
                    {userPart()}


                  </CustomUserCoursesCarousel>

                }
              </CardsContainer>


              {/*Reco*/}
              {howManyReco === 0 ? <></> :
                <CardsContainer>
                  <LeftContainer>
                    <h2 style={{ fontWeight: 'bold' }}>Recommended For You</h2>
                  </LeftContainer>
                  <HeaderLine />
                  {/* @ts-ignore */}
                  <CustomCoursesCarousel dots infinite slidesToShow={howManyReco < 2 ? 1 : 2} slidesToScroll={1}
                                         responsive={[
                                           {
                                             breakpoint: 768,
                                             settings: {
                                               slidesToShow: 1,
                                               slidesToScroll: 1
                                             }
                                           }
                                         ]}>
                    {Courses.filter(course => !course.participants.includes(userId)).map((course) => (
                      <div className="test" key={course._id}
                           style={{ display: 'flex', justifyContent: 'center', width: '40%' }}>
                        <CustomCoursesCards
                          key={course._id}
                          style={{
                            ...(howManyReco === 1 ? {
                              width: '50%',
                              display: 'flex',
                              flexDirection: 'column',
                              margin: '1em'
                            } : { display: 'flex', flexDirection: 'column', margin: '1em' })
                          }}
                          hoverable
                          cover={<CourseImage alt={course.courseName} src={course.courseImage} />}
                          actions={[
                            <PlusOutlined key="join" style={{ color: '#03565B' }} onClick={
                              () => {
                                onJoinCourse(course._id, userId);
                              }} />
                          ]}
                        >
                          {/* @ts-ignore */}
                          <Card.Meta title={course.courseName} description={<Typography.Paragraph
                            ellipsis={{ rows: 3, expandable: false }}>{course.description}</Typography.Paragraph>}
                                     style={{ height: '7em' }} />
                        </CustomCoursesCards>
                      </div>
                    ))}
                  </CustomCoursesCarousel>
                </CardsContainer>
              }
              <div style={{
                paddingTop: '30px'
              }}>
                <CustomFooter>
                  <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={8}>
                      <h2>About Us</h2>
                      <p>
                        Welcome to SKILCAT! We are dedicated to providing high-quality online learning experiences
                        tailored to suit your needs. Our platform offers a diverse range of courses curated by experts
                        in their respective fields. Whether you're looking to enhance your professional skills or pursue
                        a personal interest, we've got you covered.
                      </p>
                    </Col>
                    <Col xs={24} sm={24} md={{ span: 8, offset: 6 }}>
                      <h2>Contact Us</h2>
                      <p>
                        Have questions or feedback? We're here to help! Reach out to our friendly support team at <a
                        href="mailto:andalusmh2002@gmail.com">andalusmh2002@gmail.com</a>.
                      </p>
                    </Col>
                  </Row>
                  <CustomDiv>
                    <p>© 2024 SKILCAT. All Rights Reserved.</p>
                  </CustomDiv>
                </CustomFooter>
              </div>


            </FlexHomePageContainer>
          ) : (
            <Navigate to="/auth" />
          )}
        </>
      )}
    </>
  );
});
