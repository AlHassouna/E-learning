import React,{useState} from 'react';
import { observer } from 'mobx-react';
import { Question } from './QuizzAdd';
import { Input, Select,  Col, Row } from 'antd';
import {
  Label,
  InputField,
  SelectField,
  OptionInput
}
from '../../styles/adminStyle';

const { Option } = Select;

interface QuestionFormProps {
  newQuestion:Question;
  setNewQuestion: (q:Question) => void;
}
export const QuestionForm: React.FC<QuestionFormProps> = observer(({ newQuestion, setNewQuestion }) => {
  
  const handleQuestionTypeChange = (value: string) => {
    if(value==="multiple"){
    setNewQuestion({ ...newQuestion, type: value,options:['','',''], correctOption: "" });
    }
    else{
      setNewQuestion({ ...newQuestion, type: value,options:['False'], correctOption: "True" });
    }
  };

  const handleQuestionTextChange = (event: any) => {
    setNewQuestion({ ...newQuestion, questionText: event.target.value });
  };

  const handleOptionChange = (index: number, event: any) => {
    const options = [...newQuestion.options];
    options[index] = event.target.value;
    setNewQuestion({ ...newQuestion, options });
  };

  const handleCorrectOptionChange = (event: any) => {
    setNewQuestion({ ...newQuestion, correctOption: event.target.value });
  };

  


  function handleChange(value: string): void {
    const changedQuestion = {...newQuestion}
    const options = []
    if(value==="True"){
      options.push("False")
    }else{
      options.push("True")
    }
    changedQuestion.correctOption = value
    changedQuestion.options = options
    setNewQuestion(changedQuestion);
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col>
    <Label>Question Text:</Label>
    <br></br>
    <InputField value={newQuestion.questionText} onChange={handleQuestionTextChange} />
    </Col>
    <Col>
    <Label>Question Type:</Label>
    <br></br>
    <Select
          defaultValue={newQuestion.type}
          onChange={handleQuestionTypeChange}
        >
          <OptionInput value="multiple">Multiple</OptionInput>
          <OptionInput value="boolean">True/False</OptionInput>
        </Select>
        </Col>
        </Row>
        <br></br>
    {newQuestion.type === "multiple" ? (
      <>
        <Label>Options:</Label>
        <Row gutter={[16, 16]}>
        {newQuestion.options.slice(0,2).map((option, index) => (
          <Col>
          <br></br>
          <InputField
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e)}
          />
          </Col>
        ))}
        </Row>
        <Row gutter={[16, 16]}>
        <Col>
          <br></br>
          <InputField
            key={2}
            type="text"
            value={newQuestion.options[2]}
            onChange={(e) => handleOptionChange(2, e)}
          />
          </Col>
        
        <br></br>
        <Col>
        <Label>Correct Option:</Label>
        <br></br>
        <InputField type="text" value={newQuestion.correctOption} onChange={handleCorrectOptionChange} />
        </Col>
        </Row>
      </>
    ) : (
      <>
        <Label>Correct Option:</Label> 
        <br></br>
        <Select
          defaultValue="True"
          style={{ width: 120}}
          onChange={handleChange}
        >
          <OptionInput value="True">True</OptionInput>
          <OptionInput value="False">False</OptionInput>
        </Select>
      </>
    )}
  </div>
  );
});

export default QuestionForm;
