import React, { useEffect, useState } from 'react';
import { QuestionType } from '../../types';
import { StyledQuestion, StyledInput } from '../../styles/index';

interface QuestionProps {
  question: QuestionType;
  onAnswerChange: (questionId: string, selectedAnswer: string) => void;
  setSelectedAnswer: (answer: string) => void;
  selectedAnswer: string;
  selectedAnswers: { [questionId: string]: string };
}

const Question: React.FC<QuestionProps> = ({
                                             selectedAnswers,
                                             selectedAnswer,
                                             question,
                                             onAnswerChange,
                                             setSelectedAnswer
                                           }) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const optionsCopy = [...question.options];
    const shuffled = shuffleArray(optionsCopy);
    setShuffledOptions(shuffled);
  }, [question]);

  useEffect(() => {
    // Reset selected answer when question changes
    setSelectedAnswer('');
  }, [question, setSelectedAnswer]);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelectedAnswer = e.target.value;
    setSelectedAnswer(newSelectedAnswer);
    onAnswerChange(question._id, newSelectedAnswer);
  };

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <div>
      <h3>{((question.questionText).replace(/&quot;/g, '"').replace(/&#039;/g, '`'))}</h3>
      {shuffledOptions.map((option, index) => {
        const isSelected = selectedAnswers[question._id] === option;
        return (
          <StyledQuestion key={index}>
            <StyledInput
              type="radio"
              name={`question-${question._id}`}
              value={option}
              onChange={handleOptionChange}
              checked={selectedAnswer === option || isSelected}
            />
            <label>{option.replace(/&quot;/g, '"').replace(/&#039;/g, '`')}</label>
          </StyledQuestion>
        );
      })}
    </div>
  );
};

export default Question;
