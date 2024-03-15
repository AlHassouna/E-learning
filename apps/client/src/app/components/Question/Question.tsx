import React, { useEffect, useState } from 'react';
import { QuestionType } from '../../types';
import { StyledQuestion, StyledInput } from '../../styles/index';

interface QuestionProps {
  question: QuestionType;
  onAnswerChange: (questionId: string, selectedAnswer: string) => void;
  setSelectedAnswer: (answer:string) => void;
  selectedAnswer: string;
  selectedAnswers: { [questionId: string]: string };
}

const Question: React.FC<QuestionProps> = ({ selectedAnswers, selectedAnswer, question, onAnswerChange, setSelectedAnswer }) => {

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedAnswer = e.target.value;
    setSelectedAnswer(newSelectedAnswer);
    onAnswerChange(question._id, newSelectedAnswer);
  };

  return (
    <div>
      <h3>{((question.questionText).replace(/&quot;/g,'"').replace(/&#039;/g, '`'))}</h3>
      {question.options.map((option, index) => {
        const isSelected = selectedAnswers[question._id] === option; // Check if an answer is selected
        return (
          <StyledQuestion key={index}>
            <StyledInput
              type="radio"
              name={`question-${question._id}`}
              value={option}
              onChange={handleOptionChange} 
              checked={selectedAnswer === option || isSelected} // Set checked attribute based on selectedAnswer or isSelected
            />
            <label>{option.replace(/&quot;/g,'"').replace(/&#039;/g, '`')}</label>
          </StyledQuestion>
        );
      })}
    </div>
  );
};

export default Question;
