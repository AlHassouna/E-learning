import React, { useState, useEffect } from 'react';
import {TimerContainer} from '../../styles/index'

interface QuizTimerProps {
    duration: number;
    onTimerEnd: () => void;
  }
  
const QuizTimer: React.FC<QuizTimerProps> = ({ duration, onTimerEnd }) => {
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          onTimerEnd();
          return prevTime;
        }
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [duration]);
  
  useEffect(() => {
    if (timeLeft === 0) {
        onTimerEnd(); 
    }
}, [timeLeft, onTimerEnd]);

  const minutes: number = Math.floor(timeLeft / 60);
  const seconds: number = timeLeft % 60;

  return (
    <TimerContainer isOneMinute={timeLeft <= 60}>
    <p>
      Time Left: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </p>
   </TimerContainer>
  );
};

export default QuizTimer;