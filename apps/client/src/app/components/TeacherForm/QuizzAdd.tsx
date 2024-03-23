import React, { useState, ChangeEvent } from 'react';
import { observer } from 'mobx-react';
import QuestionForm from './QuestionAdd';
import { Select, Button, Col, Row, Card, BackTop } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  QuestionFormContainer,
  Label,
  InputField,
  SelectField,
  OptionInput,
  ButtonContainer
} from '../../styles/adminStyle';
import { useParams } from 'react-router-dom';
import { getItem } from '../../utils/localStorage';
import { StyledCardQuiz } from '../../styles';

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

export const AddQuizForm: React.FC<AddQuizFormProps> = observer(({ onSave }) => {
  const navigate = useNavigate();
  const token = getItem('token');
  //@ts-ignore
  const username = JSON.parse(token).username;
  const courseName = useParams().courseTitle;
  // State for quiz
  const [quiz, setQuiz] = useState({
    quizTitle: '',
    duration: 3,
    category: courseName,
    level: 'easy',
    questions: [
      {
        questionText: '',
        type: 'multiple',
        options: ['', '', ''],
        correctOption: ''
      }
    ]
  });

  const handleQuizTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuiz({ ...quiz, quizTitle: event.target.value });
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
      correctOption: ''
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
      {/* @ts-ignore */}
      <style jsx>{`:where(.css-dev-only-do-not-override-1uweeqc).ant-menu-dark.ant-menu-horizontal >.ant-menu-item-selected, :where(.css-dev-only-do-not-override-1uweeqc).ant-menu-dark>.ant-menu.ant-menu-horizontal >.ant-menu-item-selected, :where(.css-dev-only-do-not-override-1uweeqc).ant-menu-dark.ant-menu-horizontal >.ant-menu-submenu-selected, :where(.css-dev-only-do-not-override-1uweeqc).ant-menu-dark>.ant-menu.ant-menu-horizontal >.ant-menu-submenu-selected
          {
            background-color: #04787e !important
          }`}</style>

      <StyledCardQuiz>

        <BackTop />
        <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
        <h1> <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/quizzes/' + courseName)}
        /> Add Quiz</h1>
        <Row gutter={[16, 16]}>
          <Col>
            <Label>Quiz Title:</Label>
            <br></br>
            <InputField
              type="text"
              value={quiz.quizTitle}
              onChange={handleQuizTitleChange}
            />
          </Col>
          <Col>

            <Label>Category:</Label>
            <br></br>
            <InputField
              type="text"
              value={courseName}
              disabled
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col>
            <Label>Duration (minutes):</Label>
            <br></br>
            <InputField
              type="number"
              value={quiz.duration}
              onChange={handleDurationChange}
            />
          </Col>
          <Col>
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
      </StyledCardQuiz>

    </QuestionFormContainer>
  );
}
);
