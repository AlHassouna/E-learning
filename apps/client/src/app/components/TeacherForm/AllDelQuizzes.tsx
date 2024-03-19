import React from "react";
import { Row, Col, Card } from 'antd';
import { Link, useParams } from "react-router-dom";
import { Container, Heading, CustomCard, CustomImage } from '../../styles/adminStyle';
function AllDelQuizzes() {
    const param = useParams()
    const deletepagelink="/deletequiz/"+param.courseTitle+"/oo"
    return (
        <Container>
            <Card>
      <div>
        <Heading>Delete quiz:</Heading>

        <Row justify="center" gutter={[16, 16]}>
          <Col >
          <Link to={deletepagelink}>
            <CustomCard hoverable >
              <Card.Meta title="Quiz 1" description="Description of quiz" />
            </CustomCard>
            </Link>
          </Col>
          <Col >
          <Link to={deletepagelink}>
            <CustomCard hoverable >
              <Card.Meta title="Quiz 2" description="Description of quiz" />
            </CustomCard>
            </Link>
          </Col>
          <Col >
            <CustomCard hoverable >
              <Card.Meta title="Quiz 3" description="Description of quiz" />
            </CustomCard>
          </Col>
        </Row>
        
      </div>
      </Card>
    </Container>
      );
}

export default AllDelQuizzes;
