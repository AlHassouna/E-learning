import React from 'react';
import { observer } from 'mobx-react';
import { Question } from './QuizzAdd';
import { Select, Col, Row } from 'antd';
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
}

export const DeleteQuestionForm: React.FC<QuestionFormProps> = observer(({ newQuestion }) => {
  
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col>
          <Label>Question Text:</Label>
          <br />
          <InputField disabled value={newQuestion.questionText} />
        </Col>
        <Col>
          <Label>Question Type:</Label>
          <br />
          <SelectField disabled defaultValue={newQuestion.type}>
            <OptionInput value="multiple">Multiple</OptionInput>
            <OptionInput value="boolean">True/False</OptionInput>
          </SelectField>
        </Col>
      </Row>
      <br />
      {newQuestion.type === "multiple" ? (
        <>
          <Label>Options:</Label>
          <Row gutter={[16, 16]}>
            {newQuestion.options.slice(0, 2).map((option, index) => (
              <Col key={index}>
                <br />
                <InputField disabled value={option} />
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]}>
            <Col>
              <br />
              <InputField disabled value={newQuestion.options[2]} />
            </Col>
            <Col>
              <Label>Correct Option:</Label>
              <br />
              <InputField disabled value={newQuestion.correctOption} />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Label>Correct Option:</Label> 
          <br />
          <SelectField disabled defaultValue={newQuestion.correctOption}>
            <OptionInput value="True">True</OptionInput>
            <OptionInput value="False">False</OptionInput>
          </SelectField>
        </>
      )}
    </div>
  );
});

export default DeleteQuestionForm;
