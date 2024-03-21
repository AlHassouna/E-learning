import React, { useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Container, Heading, CustomCard, CustomImage } from '../../styles/adminStyle';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import { CenterContainer } from '../../styles';
import { LoadingSpin } from '../../core';

const AllDelQuizzes: React.FC = observer(() => {
  const { quiz } = useStore();
  const { allQuizzesByCourse, isLoading, setIsLoading } = quiz;
  const chosenCourse = useParams().courseTitle as string;

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      await quiz.getAllQuizzesByCourse(chosenCourse);
    };
    fetchContent();
  }, [chosenCourse]);

  return (
    <Container>
      {isLoading ? (
          <CenterContainer>
            <LoadingSpin />
          </CenterContainer>
        ) :
        <Card>
          <div>
            <Heading>Delete quiz:</Heading>
            <Row justify="center" gutter={[16, 16]}>
              {allQuizzesByCourse.map((q, index) => {
                return <Col key={index}>
                  <Link to={`/deletequiz/${chosenCourse}/${q._id}`}  key={index}>
                    <CustomCard hoverable>
                      <Card.Meta title={`Quiz ${index}`} description={`${q.description}`} />
                    </CustomCard>
                  </Link>
                </Col>;
              })}
            </Row>
          </div>
        </Card>
      }

    </Container>
  );
});

export default AllDelQuizzes;
