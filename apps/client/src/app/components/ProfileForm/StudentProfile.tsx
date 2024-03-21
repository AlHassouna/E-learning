import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { ProfileCard, ProfileBackground, ProfileContent } from '../../styles';
import { useParams } from 'react-router';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;


interface ProfileProps {
  user: {
    role: string;
    username: string;
    numRewards: number;
    courses: any[];
    ranking: number;
  },
  data: {
    key: string;
    label: string;
    children: JSX.Element[];
  }[];
}

export const StudentProfile: React.FunctionComponent<ProfileProps> = ({ user, data }) => {


  return (
    <ProfileCard>
      <div style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <img
          src={'https://robohash.org/' + user.username + '.png?set=set4'}
          alt="profile"
          style={{ width: '100px' }}
        />
      </div>
      <Typography.Title level={4}>{user.username}</Typography.Title>
      <Text className="text-muted mb-4">{user.role}</Text>
      <br></br>

      <ProfileContent>
        <div>
          <Text strong>{user.courses.length}</Text>
          <Text type="secondary"> Courses</Text>
        </div>
        <div style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
          <Text strong>{user.numRewards}</Text>
          <Text type="secondary"> Rewards</Text>
        </div>
        <div>
          <Text strong>{user.ranking}</Text>
          <Text type="secondary"> Rank</Text>
        </div>
      </ProfileContent>
      <div>
        <Collapse items={data}></Collapse>
      </div>
    </ProfileCard>


  );
};
