import React, { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import QuestionForm from './QuestionAdd';
import { Select, Button, Col, Row, Card } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import {
  QuestionFormContainer,
  Label,
  InputField,
  SelectField,
  OptionInput,
  ButtonContainer,
} from '../../styles/adminStyle';
import { useParams } from 'react-router-dom';
import { getItem } from '../../utils/localStorage';
const { Option } = Select;

interface AddQuizFormProps {
  onSave: (quiz: any) => void;
}
export interface Question {
  questionText: string;
  type: string;
  options: string[];
  correctOption: string;
}

export const AddQuizForm: React.FC<AddQuizFormProps> = observer(
  ({ onSave }) => {
    const token = getItem('token');
    //@ts-ignore
    const username = JSON.parse(token).username;
    const courseName = useParams().courseTitle;
    // State for quiz
    const [quiz, setQuiz] = useState({
      quizTitle: '',
      duration: 3,
      category: '',
      level: 'easy',
      questions: [
        {
          questionText: '',
          type: 'multiple',
          options: ['', '', ''],
          correctOption: '',
        },
      ],
    });

    const handleQuizTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setQuiz({ ...quiz, quizTitle: event.target.value });
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
      setQuiz({ ...quiz, category: event.target.value });
    };

    const handleLevelChange = (value: string) => {
      setQuiz({ ...quiz, level: value });
    };

    const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
      setQuiz({ ...quiz, duration: parseInt(event.target.value) });
    };

    const handleSaveQuiz = () => {
      const quizData = { quiz, username, courseName };
      onSave(quizData);
    };
    const handleChangeQuestion = (i: number) => {
      const setQuestion = (q: Question) => {
        const newQuiz = { ...quiz };
        newQuiz.questions[i] = q;
        setQuiz(newQuiz);
      };
      return setQuestion;
    };
    const handleAddQuestion = () => {
      const newQuestion = {
        questionText: '',
        type: 'multiple',
        options: ['', '', ''],
        correctOption: '',
      };
      const newQuiz = { ...quiz };
      newQuiz.questions.push(newQuestion);
      setQuiz(newQuiz);
    };
    const handleDeleteQuestion = (i: number) => {
      const updatedQuestions = [...quiz.questions];
      updatedQuestions.splice(i, 1);
      setQuiz({ ...quiz, questions: updatedQuestions });
    };

    return (
      <QuestionFormContainer>
        <Row justify='center' align='middle' gutter={[16, 16]}>
        <Col span={12}>
          <Card>
        <h1>Add Quiz</h1>
        <Row gutter={[16, 16]}>
          <Col >
            <Label>Quiz Title:</Label>
            <br></br>
            <InputField
              type="text"
              value={quiz.quizTitle}
              onChange={handleQuizTitleChange}
            />
          </Col>
          <Col >
            
            <Label>Category:</Label>
            <br></br>
            <InputField
              type="text"
              value={quiz.category}
              onChange={handleCategoryChange}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col >
        <Label>Duration (minutes):</Label>
        <br></br>
        <InputField 
          type="number"
          value={quiz.duration}
          onChange={handleDurationChange}
        />
        </Col>
        <Col >
        <Label>Level:</Label>
        <br></br>
        <Select
          
          value={quiz.level}
          onChange={handleLevelChange}
        >
          <OptionInput value="easy">Easy</OptionInput>
          <OptionInput value="medium">Medium</OptionInput>
          <OptionInput value="hard">Hard</OptionInput>
        </Select>
        
</Col>
</Row>
        <h2>Add Question</h2>

        {quiz.questions.map((q, i) => (
          <div key={i}>
            <h3>
              <Button
                type="text"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteQuestion(i)}
                title="Delete question"
              />{' '}
              Question {i + 1}:
            </h3>
            <QuestionForm
              newQuestion={q}
              setNewQuestion={handleChangeQuestion(i)}
            />
          </div>
        ))}
        <br></br>
        
          
        <ButtonContainer>
        <Row gutter={[16, 16]}>
          <Col>
          <Button
            type="primary"
            style={{ backgroundColor: '#786283' }}
            onClick={handleAddQuestion}
          >
            Add Another Question
          </Button>
          </Col>
          <Col>
          <Button type="primary" onClick={handleSaveQuiz}>
            Submit Quiz
          </Button>
          </Col>
          </Row>
        </ButtonContainer>
        </Card>
        </Col>
        </Row>
      </QuestionFormContainer>
    );
  }
);
