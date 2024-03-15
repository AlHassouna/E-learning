import React, { useEffect, useState } from 'react';
import { QuizType } from '../../types';
import { observer } from 'mobx-react';
import { Button, Card, Row, Col, message } from 'antd';
import Question from '../Question/Question';
import avatarImage from '../../images/reading.png';
import resultsImage from '../../images/checklist.png';
import {StyledContainerQuiz, StyledCardContainer, StyledCardQuiz, StyledTitle, StyledDescription, ButtonContainer, QuizButton, AvatarImage, ResultsAvatarImage, BackButtonContainer} from '../../styles/index'
import QuizTimer from './QuizTimer';
import {submitQuiz} from '../../api/quiz/postUserAnswers'
import { useStore } from '../../stores/setupContext';
import { ignore } from 'antd/es/theme/useToken';
import { getItem } from '../../utils/localStorage';

const { Meta } = Card;

const Quiz: React.FC<{ quiz: QuizType }> = observer(({ quiz }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0); 
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);
  const { auth } = useStore();
  const token = getItem('token')
  //@ts-ignore
  //console.log(JSON.parse(token))

  useEffect(() => {
    if (isSubmitted) {
      setIsTimerActive(false);
    }
  }, [isSubmitted]);

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

  const handleSubmit = async () => {
    const questionAttempts =  quiz.questions.map(question => ({
      question: question._id,
      userAnswer: selectedAnswers[question._id] || '',
      isCorrect: selectedAnswers[question._id] === question.correctOption,
      level: question.level,
    }));

    try {
        const response = await submitQuiz(quiz._id, '65f248fc059717ad5903abd1', questionAttempts);
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
      <StyledContainerQuiz>
        {/* @ts-ignore */}
        <style jsx>{`.ant-card-meta-avatar{
          display: flex;
          justify-content: center;
        }`}</style>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={14} xxl={16}>
            <StyledCardContainer>
              {isSubmitted ? (
                <StyledCardQuiz>
                  <Meta style={{flexDirection: 'column'}}
                    avatar={<ResultsAvatarImage src={resultsImage} alt="avatar" />}
                    title={<StyledTitle>Your Score is:</StyledTitle>}
                    description={
                      <StyledDescription>
                        <p style={{textAlign: 'center', fontSize: '2rem'}}>{score}</p>
                      </StyledDescription>
                    
                    }
                  />
                  <BackButtonContainer>
                    <QuizButton type="primary">Back To The Course</QuizButton>
                  </BackButtonContainer>
                </StyledCardQuiz>
              ) : (
                <StyledCardQuiz>
                  {isTimerActive && <QuizTimer duration={quiz.duration} onTimerEnd={handleAutoSubmit}/>}
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









