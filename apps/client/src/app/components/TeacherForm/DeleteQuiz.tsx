import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import QuestionForm from './QuestionAdd';
import { Select, Button, Col, Row, Card, message, BackTop } from 'antd';
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import {
  QuestionFormContainer,
  Label,
  InputField,
  SelectField,
  OptionInput,
  ButtonContainer
} from '../../styles/adminStyle';
import { useLocation, useParams } from 'react-router-dom';
import { getItem } from '../../utils/localStorage';
import DeleteQuestionForm from './DeleteQuestion';
import { useStore } from '../../stores/setupContext';
import { QuizType } from '../../types';
import { CenterContainer } from '../../styles';
import { LoadingSpin } from '../../core/Spin/LoadingSpin';
import { useNavigate } from 'react-router-dom';
import { getQuiz } from '../../api';

const { Option } = Select;

export interface Question {
  questionText: string;
  type: string;
  options: string[];
  correctOption: string;
}

export const DeleteQuizForm: React.FC = observer(() => {
  const courseName = useParams().courseTitle;
    const [messageApi, contextHolder] = message.useMessage();
    const [newQuiz, setQuiz] = useState({ questions: [] as Question[] } as QuizType);

    const success = () => {
      messageApi.open({
        type: 'success',
        content: 'The quiz was successfully deleted'
      });
    };

    const error = () => {
      messageApi.open({
        type: 'error',
        content: 'Failed to delete the quiz'
      });
    };
    // State for quiz
    const navigate = useNavigate();

    const { quiz } = useStore();
    const { allQuizzesByCourse, isLoading, setIsLoading, deleteQuizByID } = quiz;
    const chosenCourse = useParams().courseTitle;
    const quizID = useParams().quizId as string;

    async function handleDeleteQuiz() {
      console.log(quizID);
      try {
        await deleteQuizByID(quizID);
        success();
        navigate(`/deletequiz/${chosenCourse}`);
      } catch (err) {
        error();
      }
    }

    useEffect(() => {
      const fetchContent = async () => {
        setIsLoading(true);
        const quiz1 = await getQuiz(quizID);
        setQuiz(quiz1);
        setIsLoading(false);
      };
      fetchContent();
    }, [quizID]);


    return (
      <QuestionFormContainer>
        {isLoading ? (
          <CenterContainer>
            <LoadingSpin />
          </CenterContainer>
        ) : (
          <div>
            <div>
              <BackTop />
              <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> </strong>
            </div>
            <Row justify="center" align="middle" gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <h1>
                  <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/deletequiz/'+courseName)}
        />
                    Delete Quiz</h1>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Label>Quiz Title:</Label>
                      <br />
                      <InputField
                        type="text"
                        value={newQuiz.quizTitle}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Label>Category:</Label>
                      <br />
                      <InputField
                        type="text"
                        value={newQuiz.category}
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
                        value={newQuiz.duration}
                        disabled
                      />
                    </Col>
                    <Col>
                      <Label>Level:</Label>
                      <br />
                      <Select
                        value={newQuiz.level}
                        disabled
                      >
                        <OptionInput value="easy">Easy</OptionInput>
                        <OptionInput value="medium">Medium</OptionInput>
                        <OptionInput value="hard">Hard</OptionInput>
                      </Select>
                    </Col>
                  </Row>
                  <h2>Questions:</h2>
                  {newQuiz.questions.map((q: Question, i: number) => (
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
          </div>
        )}
      </QuestionFormContainer>
    );
  }
);

