import styled from 'styled-components';
import { Card } from 'antd';
import { Input, Select } from 'antd';


export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #EFDAC7;
`;

export const Heading = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-weight: bold;
  color: #333;
`;

export const CustomCard = styled(Card)`
  width: 240px;
  margin-bottom: 20px;
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

export const CustomImage = styled.img`
  width: 40%;
  height: auto;
  margin: 9px auto;
`;

export const QuestionFormContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: #EFDAC7;
  min-height: 100vh;
  padding: 40px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;

export const InputField = styled(Input)`
  margin-bottom: 10px;
  width: 200px;
  padding: 5px;
`;

export const SelectField = styled(Select)`
  margin-bottom: 10px;
  width: 120px;
  padding: 5px;
`;

export const OptionInput = styled(InputField)`
  margin-left: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

