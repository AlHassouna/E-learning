import { Button, Avatar } from 'antd';
import styled from 'styled-components';
import { Card, Typography } from 'antd';


export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #efdac7;
`;

export const CourseContent = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 0rem 10rem 0rem 10rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #9A616G;
`;

export const CourseTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9A616D;
  margin: 0
`;

export const QuizzButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  background-color: #9A616D;
  border-radius: 4rem;
  padding: 1rem;
  display: block;
`;

export const FirstIcon = styled.img`
  width: 8%;
  hight: 8%;
`;

export const SecondIcon = styled.img`
  width: 8%;
  hight: 8%;
  margin-right: 0;
  margin-left: auto;
  display: block;
`;

export const ContentDiv = styled.div`
  background-color: #EFDAC7;
  min-height: 100vh;
`;

export const StyledSection = styled.section`
  height: 100vh;
  background-color: #9a616d;
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

export const ProfileCard = styled(Card)`
  min-width: 30vw;
  border-radius: 15px;
  text-align: center;
`;

export const ProfileBackground = styled.div`
min-height: 100vh;
background-color: #EFDAC7;
display: flex;
justify-content: center;
align-items: center;`;

export const ProfileContent = styled.div`
display: flex;
justify-content: space-between;
text-align: center;
margin-top: 5rem;
margin-bottom: 2rem;
`;
export const NotFoundContainer = styled.div`
  position: relative;
  height: 100vh;
`;

export const NotFoundWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 560px;
  width: 100%;
  padding-left: 160px;
  line-height: 1.1;
`;

export const NotFound404 = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: inline-block;
  width: 140px;
  height: 140px;
  background-image: url('./delete.png'); 
  background-size: cover;

  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: scale(2.4);
    border-radius: 50%;
    background-color: #f2f5f8;
    z-index: -1;
  }
`;

export const NotFoundTitle = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 65px;
  font-weight: 700;
  margin-top: 0px;
  margin-bottom: 10px;
  color: #03565B;
  text-transform: uppercase;
`;

export const NotFoundSubtitle = styled.h2`
  font-family: 'Nunito', sans-serif;
  font-size: 21px;
  font-weight: 400;
  margin: 0;
  text-transform: uppercase;
  color: #03565B;
`;

export const NotFoundText = styled.p`
  font-family: 'Nunito', sans-serif;
  color: #999fa5;
  font-weight: 400;
`;

export const NotFoundLink = styled.a`
  font-family: 'Nunito', sans-serif;
  display: inline-block;
  font-weight: 700;
  border-radius: 40px;
  text-decoration: none;
  color: #786283;
`;

export const StyledContainerQuiz = styled.div`
  background-color: #EFDAC7;
  min-height: 100vh;
  padding: 20px;
`;
export const SearchContainer = styled.div`
  position: relative;
  width: 80%;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

export const SearchOptions = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  top: 100%;
  left: 0;
  padding: 10px;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
`;

export const CourseCard = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e8e8e8;
  }
`;
export const CoursesTitle = styled.h1`
  color: black;
`;

export const CoursesDescription = styled.p`
  color: black;
  margin-top: 3px;
`;

export const NoCourses = styled.div`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledCardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledCardQuiz = styled(Card)`
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

export const StyledParagraph = styled.div`
  color: #03565B;
  font-size: 1rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 80px;
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
  color: ${(props:any) => (props.isOneMinute ? 'red' : '#03565B')};
  display: flex;
  justify-content: center;
`;
export const CenterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const SearchBar = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  width: 100%;
  margin-right: 20px;
`;


export const RewardStyled = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
