import React from 'react';
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
import DeleteQuestionForm from './DeleteQuestion';
const { Option } = Select;

interface DeleteQuizFormProps {
    quiz:any;
  handleDeleteQuiz:()=>void;
}

export interface Question {
  questionText: string;
  type: string;
  options: string[];
  correctOption: string;
}

export const DeleteQuizForm: React.FC<DeleteQuizFormProps> = observer(({ quiz, handleDeleteQuiz }) => {
  const courseName = useParams().courseTitle;
  
  // State for quiz
  

  return (
    <QuestionFormContainer>
      <Row justify='center' align='middle' gutter={[16, 16]}>
        <Col span={12}>
          <Card>
            <h1>Delete Quiz</h1>
            <Row gutter={[16, 16]}>
              <Col>
                <Label>Quiz Title:</Label>
                <br />
                <InputField
                  type="text"
                  value={quiz.quizTitle}
                  disabled
                />
              </Col>
              <Col>
                <Label>Category:</Label>
                <br />
                <InputField
                  type="text"
                  value={quiz.category}
                  disabled
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col>
                <Label>Duration (minutes):</Label>
                <br />
                <InputField 
                  type="number"
                  value={quiz.duration}
                  disabled
                />
              </Col>
              <Col>
                <Label>Level:</Label>
                <br />
                <Select
                  value={quiz.level}
                  disabled
                >
                  <OptionInput value="easy">Easy</OptionInput>
                  <OptionInput value="medium">Medium</OptionInput>
                  <OptionInput value="hard">Hard</OptionInput>
                </Select>
              </Col>
            </Row>
            <h2>Questions:</h2>
            {quiz.questions.map((q:Question,i:number) => (
              <div key={i}>
                <DeleteQuestionForm
                  newQuestion={q}
                />
              </div>
            ))}
            <br />
            <ButtonContainer>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button type="primary" onClick={handleDeleteQuiz}>
                    Delete Quiz
                  </Button>
                </Col>
              </Row>
            </ButtonContainer>
          </Card>
        </Col>
      </Row>
    </QuestionFormContainer>
  );
});
