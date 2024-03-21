import React, { useState, ChangeEvent, useEffect } from 'react';
import { observer } from 'mobx-react';
import QuestionForm from './QuestionAdd';
import { QuizType } from '../../types';
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
import { useLocation, useParams } from 'react-router-dom';
import { getItem } from '../../utils/localStorage';
import EditQuestionForm from './QuestionEdit';
import { getQuiz } from '../../api';
import { useStore } from '../../stores/setupContext';
import { CenterContainer } from '../../styles';
import { LoadingSpin } from '../../core/Spin/LoadingSpin';
const { Option } = Select;

interface EditQuizFormProps {
  onSave: (quiz: any) => void;
}
export interface Question {
  questionText: string;
  type: string;
  options: string[];
  correctOption: string;
  _id:string
}

export const EditQuizForm: React.FC<EditQuizFormProps> = observer(
  ({ onSave }) => {
    const token = getItem('token');
    //@ts-ignore
    const username = JSON.parse(token).username;
    const { quiz } = useStore();
    const { allQuizzesByCourse, isLoading, setIsLoading, deleteQuizByID } = quiz;
    const courseName = useParams().courseTitle;
    const [newQuiz, setQuiz] = useState({questions: [] as Question[]} as QuizType);
    const quizID = useParams().quizId as string;


    const handleQuizTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setQuiz({ ...newQuiz, quizTitle: event.target.value });
    };

    const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
      setQuiz({ ...newQuiz, category: event.target.value });
    };

    const handleLevelChange = (value: string) => {
      setQuiz({ ...newQuiz, level: value });
    };

    const handleDurationChange = (event: ChangeEvent<HTMLInputElement>) => {
      setQuiz({ ...newQuiz, duration: parseInt(event.target.value) });
    };

    const handleSaveQuiz = () => {
      const quizData = { newQuiz, username };
      onSave(quizData);
    };
    const handleChangeQuestion = (i: number) => {
      const setQuestion = (q: Question) => {
        const newQuiz1 = { ...newQuiz };
        //@ts-ignore
        newQuiz.questions[i] = q;
        setQuiz(newQuiz1);
      };
      return setQuestion;
    };
    useEffect(() => {
      const fetchContent = async () => {
        setIsLoading(true);
        const quiz1= await getQuiz(quizID);
        console.log("beforeSet",quiz1)
        setQuiz(quiz1)
        setIsLoading(false);
      };
      fetchContent();
    }, []);

    return (
      <QuestionFormContainer>
         {isLoading ? (
      <CenterContainer>
        <LoadingSpin />
      </CenterContainer>
    ) :(
        <div>
        <Row justify='center' align='middle' gutter={[16, 16]}>
        <Col span={12}>
          <Card>
        <h1>Edit Quiz</h1>
        <Row gutter={[16, 16]}>
          <Col >
            <Label>Quiz Title:</Label>
            <br></br>
            <InputField
              type="text"
              value={newQuiz.quizTitle}
              onChange={handleQuizTitleChange}
            />
          </Col>
          <Col >
            
            <Label>Category:</Label>
            <br></br>
            <InputField
              type="text"
              value={newQuiz.category}
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
          value={newQuiz.duration}
          onChange={handleDurationChange}
        />
        </Col>
        <Col >
        <Label>Level:</Label>
        <br></br>
        <Select
          
          value={newQuiz.level}
          onChange={handleLevelChange}
        >
          <OptionInput value="easy">Easy</OptionInput>
          <OptionInput value="medium">Medium</OptionInput>
          <OptionInput value="hard">Hard</OptionInput>
        </Select>
        
</Col>
</Row>
        <h2>Edit Question</h2>

        {
        newQuiz.questions.map((q,i) => (
          <div key={i}>
            <h3>
              Question {i + 1}:
            </h3>
            <EditQuestionForm key={i}
              newQuestion={q}
              setNewQuestion={handleChangeQuestion(i)}
            />
          </div>
        ))}
        <br></br>
        
          
        <ButtonContainer>
        <Row gutter={[16, 16]}>
          <Col>
          <Button type="primary" onClick={handleSaveQuiz}>
            Submit Changed Quiz
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
