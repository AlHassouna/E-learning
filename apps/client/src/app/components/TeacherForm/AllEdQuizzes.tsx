import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Container, Heading, CustomCard, CustomImage } from '../../styles/adminStyle';
import { observer } from 'mobx-react';
import { useStore } from '../../stores/setupContext';
import { CenterContainer } from '../../styles';
import { LoadingSpin } from '../../core';

const AllEdQuizzes: React.FC = observer(() => {
  const navigate = useNavigate();
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
          <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/quizzes/'+chosenCourse)}
        />
            <Heading>
            
              Edit quiz:</Heading>
            <Row justify="center" gutter={[16, 16]}>
              {allQuizzesByCourse.map((q, index) => {
                return <Col key={index}>
                  <Link to={`/editquiz/${chosenCourse}/${q._id}`}  key={index}>
                    <CustomCard hoverable>
                      <Card.Meta title={`Quiz ${index + 1}`} description={`${q.description}`} />
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

export default AllEdQuizzes;
