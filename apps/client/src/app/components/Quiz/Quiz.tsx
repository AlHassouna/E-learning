import React, { useEffect, useState } from 'react';
import { QuizType } from '../../types';
import { observer } from 'mobx-react';
import { Card, Row, Col, message } from 'antd';
import Question from '../Question/Question';
import avatarImage from '../../images/reading.png';
import resultsImage from '../../images/checklist.png';
import {
  StyledContainerQuiz, StyledCardContainer, StyledCardQuiz, StyledTitle, StyledDescription,
  ButtonContainer, QuizButton, AvatarImage, ResultsAvatarImage, BackButtonContainer, StyledParagraph, RewardStyled
} from '../../styles/index';
import QuizTimer from './QuizTimer';
import { submitQuiz } from '../../api/quiz/postUserAnswers';
import { useStore } from '../../stores/setupContext';
import { getItem } from '../../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import rewardGif from '../../images/trophy.gif';

const { Meta } = Card;

const Quiz: React.FC<{ quiz: QuizType, course: string }> = observer(({ quiz, course }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const { reward, navbar, quiz: Quiz } = useStore();
  const { isLoading } = Quiz;
  const { courses } = navbar;
  const { postReward } = reward;
  const navigate = useNavigate();
  const token = getItem('token');
  //@ts-ignore
  const id = JSON.parse(token)._id;
  useEffect(() => {
    if (isSubmitted) {
      setIsTimerActive(false);
    }
  }, [isSubmitted]);
  const [courseName, setCourseName] = useState<string | null>(null);
  const [receivedReward, setReceivedReward] = useState<boolean>(true);

  useEffect(() => {
    const courseMap = courses.reduce((acc, course) => {
      // @ts-ignore
      acc[course._id] = course.courseName;
      return acc;
    }, {});
    // @ts-ignore
    setCourseName(courseMap[course]);
  }, [course]);

  const handleNext = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);

  };

  const handlePrev = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleAnswerChange = (questionId: string, selectedAnswer: string) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: selectedAnswer
    }));
  };

  const handleBack = () => {
    navigate(`/courses/${courseName}`);
  };

  const handleSubmit = async () => {
    const questionAttempts = quiz.questions.map(question => ({
      question: question._id,
      userAnswer: selectedAnswers[question._id] || '',
      isCorrect: selectedAnswers[question._id] === question.correctOption,
      level: question.level
    }));

    try {
      const response = await submitQuiz(quiz._id, id, questionAttempts);
      const rewardObject = {
        score: response.quizAttempt.score,
        isPerfect: response.quizAttempt.isPerfect,
        user: id
      };
      await postReward(rewardObject);
      console.log('the type is: ', reward.type);

      if (reward.type === 'received reward') {
        console.log('received reward');
      } else {
        setReceivedReward(false);
        console.log('didnt received reward');
      }
      setIsSubmitted(true);
      setScore(response.quizAttempt.score);
      message.success('Quiz submitted successfully');
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleAutoSubmit = async () => {
    if (!isSubmitted) {
      await handleSubmit();
    }
  };

  const isLastQuestion: boolean = currentQuestionIndex === quiz.questions.length - 1;
  return (
    isLoading ? (
        <div>Loading...</div>
      ) :
      <StyledContainerQuiz>
        {/* @ts-ignore */}
        <style jsx>{`.ant-card-meta-avatar {
          display: flex;
          justify-content: center;
        }`}</style>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={14} xxl={16}>
            <StyledCardContainer>
              {isSubmitted ? (
                <StyledCardQuiz>
                  <Meta style={{ flexDirection: 'column' }}
                        avatar={<ResultsAvatarImage src={resultsImage} alt="avatar" />}
                        title={<StyledTitle>Your Score is:</StyledTitle>}
                        description={
                          <StyledDescription>
                            <p style={{ textAlign: 'center', fontSize: '2rem' }}>{score}</p>
                          </StyledDescription>

                        }
                  />
                  {receivedReward ?
                    (<RewardStyled>
                      <StyledParagraph>Congrats! You Received A Reward</StyledParagraph>
                      <img src={rewardGif} alt="Reward GIF"
                           style={{ height: '100px', width: '100px', display: 'flex', alignItems: 'center' }} />
                    </RewardStyled>)
                    :
                    (<p></p>)}
                  <BackButtonContainer>
                    <QuizButton type="primary" onClick={handleBack}>Back To Course Page</QuizButton>
                  </BackButtonContainer>
                </StyledCardQuiz>
              ) : (
                <StyledCardQuiz>
                  {isTimerActive && <QuizTimer duration={quiz.duration} onTimerEnd={handleAutoSubmit} />}
                  <p>level: {quiz.level}</p>
                  <Meta
                    avatar={<AvatarImage src={avatarImage} alt="avatar" />}
                    title={<StyledTitle>{quiz.quizTitle}</StyledTitle>}
                    description={
                      <StyledDescription>
                        <p>Question {currentQuestionIndex + 1}:</p>
                        <Question
                          selectedAnswers={selectedAnswers}
                          selectedAnswer={selectedAnswer}
                          setSelectedAnswer={setSelectedAnswer}
                          question={quiz.questions[currentQuestionIndex]}
                          onAnswerChange={handleAnswerChange}
                        />
                      </StyledDescription>
                    }
                  />
                  <ButtonContainer>
                    <QuizButton onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</QuizButton>
                    {
                      currentQuestionIndex !== quiz.questions.length - 1 &&
                      <QuizButton onClick={handleNext}>Next</QuizButton>}
                    {isLastQuestion && <QuizButton type="primary" onClick={handleSubmit}>Submit</QuizButton>}
                  </ButtonContainer>
                </StyledCardQuiz>
              )}
            </StyledCardContainer>
          </Col>
        </Row>
      </StyledContainerQuiz>
  );
});

export default Quiz;









