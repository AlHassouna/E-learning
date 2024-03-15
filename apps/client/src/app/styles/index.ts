import { Button, Card, Avatar } from 'antd';
import styled from 'styled-components';

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #EFDAC7;
`;


export const StyledSection = styled.section`
  height: 100vh;
  background-color: #9A616D;
`;

export const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  padding: 5rem 0;
  justify-content: center;
  align-items: center;

`;

export const StyledCard = styled.div`
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 50%;
  @media (min-width: 768px) {
    display: flex;
  }
  @media (max-width: 768px) {
    width: 80%;
  }
`;

export const StyledImageContainer = styled.div`
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const StyledImage = styled.img`
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
  height: 100%;
  width: 100%;
  border-radius: 1rem 0 0 1rem;
`;

export const StyledCardBody = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;


export const StyledContainerQuiz = styled.div`
  background-color: #EFDAC7;
  min-height: 100vh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledCardQuiz= styled(Card)`
  min-height: 500px;
  width: 600px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AvatarImage = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const ResultsAvatarImage = styled.img`
  width: 10rem;
  height: 10rem;
  display: flex;
  justify-content: center;
`;

export const StyledTitle = styled.h2`
  color: #03565B;
  font-size: 1.5rem;
  text-align: center;
  margin: 0;
  padding: 0 10px;
  max-width: 100%;
  word-wrap: break-word;

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    font-size: 1rem;
    padding: 0;
    text-align: left;
    width: 80%;
  }
`;


export const StyledDescription = styled.div`
  color: #ECBB65;
  font-size: 1rem;
`;

export const ButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
`;

export const BackButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

export const QuizButton = styled(Button)`
&&& {
  margin-right: 10px;
  border-color: #786283;

  &:hover {
    background-color: #9275a1;
    border-color: #9275a1;
    color: #fff
  }

  &.ant-btn-primary {
    background-color: #03565B;
    color: #fff;

    &:hover {
      background-color: #0c939c;
      border-color: #0c939c;
      color: #fff;
    }
  }
}
`;


export const StyledQuestion = styled.div`
  margin-top: 20px;
  color: #03565B
`;

 export const StyledInput = styled.input`
  margin-right: 10px;
`;

interface TimerContainerProps {
  isOneMinute: boolean;
}

export const TimerContainer = styled.div<TimerContainerProps>`
  font-size: 1.2rem;
  color: ${(props) => (props.isOneMinute ? 'red' : '#03565B')};
  display: flex;
  justify-content: center;
`;