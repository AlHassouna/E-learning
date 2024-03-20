import React, { useState } from 'react';
import { useStore } from '../../stores/setupContext';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react';
import { LoadingSpin } from '../../core';
import { CenterContainer } from '../../styles';
import { Card, Col, Row, BackTop } from 'antd';
import { FlexHomePageContainer, CustomCarousel, SlideContainer, SlideContent,
  SlideText, SlideParagraph, SlideSecondHeader, SlideImg, CustomCoursesCarousel,
  CustomUserCoursesCarousel, HeaderLine, LeftContainer, CardsContainer, CustomUserCoursesCards,
  CustomCoursesCards, CourseImage, JoinButton, CustomFooter, CustomDiv
 } from '../../styles/index'
import image1 from '../../images/elearning.png'
import image2 from '../../images/elearning-2.png'
import image3 from '../../images/elearning-3.png'
import { getItem } from '../../utils/localStorage';



export const HomePage: React.FC = observer(() => {
  const { auth, navbar } = useStore();
  const { isAuthenticated } = auth;
  const { courses: Courses, isLoading } = navbar;
  const token = getItem('token');

  
  //@ts-ignore
  const userId = JSON.parse(token)._id;

  const calculateHowMany = () => {
    let counter = 0;
    Courses.forEach(course => {
      if (course.participants.includes(userId)) {
        counter++;
      }
    });
    return counter;
  }

  const howMany = calculateHowMany()

  const calculateRecommendedCount = () => {
    let counter = 0;
    Courses.forEach(course => {
      if (!course.participants.includes(userId)) {
        counter++;
      }
    });
    return counter;
  }

  const howManyReco = calculateRecommendedCount()


  const userPart = () => {
    const userCourses = Courses.filter(course => course.participants.includes(userId));
    return userCourses.map(course => (
      <div key={course._id}>
        <CustomUserCoursesCards
          hoverable
          cover={<CourseImage alt={course.courseName} src={course.courseImage} />}
        >
          <Card.Meta title={course.courseName} description={course.description} />
        </CustomUserCoursesCards>
      </div>
    ));
  }
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
                  <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}>  </strong>
                </div>
              <CustomCarousel autoplay>
                <SlideContainer>
                  <SlideContent>
                    <SlideText>
                      <h1>ONLINE</h1>
                      <SlideSecondHeader>E-LEARNING</SlideSecondHeader>
                      <SlideParagraph>Empower your learning journey with Online E-learning's expert-curated courses, accessible anytime, anywhere.</SlideParagraph>
                    </SlideText>
                    <SlideImg src={image1} alt="Slide 1" />
                  </SlideContent>
                </SlideContainer>
                <SlideContainer>
                  <SlideContent>
                    <SlideText>
                      <h1>STUDY</h1>
                      <SlideSecondHeader>TOGETHER</SlideSecondHeader>
                      <SlideParagraph>Boost collaboration with Study Together's chat, promoting real-time interaction and knowledge exchange among peers.</SlideParagraph>
                    </SlideText>
                    <SlideImg src={image2} alt="Slide 2" />
                  </SlideContent>
                </SlideContainer>
                <SlideContainer>
                  <SlideContent>
                    <SlideText>
                      <h1>COURSES</h1>
                      <SlideSecondHeader>& QUIZZES</SlideSecondHeader>
                      <SlideParagraph>Explore interactive learning with engaging courses and quizzes to enrich your academic journey.</SlideParagraph>
                    </SlideText>
                    <SlideImg src={image3} alt="Slide 3" />
                  </SlideContent>
                </SlideContainer>
              </CustomCarousel>
              <CardsContainer>
                <LeftContainer>
                <h2 style={{fontWeight: 'bold'}}>Your Courses</h2>
                </LeftContainer>
                <HeaderLine /> 
                  <CustomUserCoursesCarousel dots infinite slidesToShow={howMany} slidesToScroll={1} responsive={[
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                      }
                    }
                  ]}>
                  {userPart()} 
                </CustomUserCoursesCarousel> 
              </CardsContainer>
              <CardsContainer>
                <LeftContainer>
                <h2 style={{fontWeight: 'bold'}}>Recommended For You</h2>
                </LeftContainer>
                <HeaderLine /> 
                <CustomCoursesCarousel dots infinite slidesToShow={howManyReco} slidesToScroll={1} responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: howManyReco,
                      slidesToScroll: 1
                    }
                  }
                ]}>
                {Courses.filter(course => !course.participants.includes(userId)).map((course) => (
                  <div key={course._id}>
                    <CustomCoursesCards
                    
                      hoverable
                      cover={<CourseImage alt={course.courseName} src={course.courseImage} />}
                    >
                      <Card.Meta title={course.courseName} description={course.description} />

                      <div style={{display: 'flex', justifyContent: 'center'}}>
                      <JoinButton type="primary">Join</JoinButton>
                      </div>
                    </CustomCoursesCards>
                  </div>
                ))}

                </CustomCoursesCarousel>
              </CardsContainer>
              <div>
                <CustomFooter>
                  <Row gutter={[20, 20]}>
                    <Col xs={24} sm={24} md={8}>
                      <h2>About Us</h2>
                      <p>
                        Welcome to SKILCAT! We are dedicated to providing high-quality online learning experiences tailored to suit your needs. Our platform offers a diverse range of courses curated by experts in their respective fields. Whether you're looking to enhance your professional skills or pursue a personal interest, we've got you covered.
                      </p>
                    </Col>
                    <Col xs={24} sm={24} md={{span: 8, offset: 6}}>
                      <h2>Contact Us</h2>
                      <p>
                        Have questions or feedback? We're here to help! Reach out to our friendly support team at <a href="mailto:andalusmh2002@gmail.com">andalusmh2002@gmail.com</a>.
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
