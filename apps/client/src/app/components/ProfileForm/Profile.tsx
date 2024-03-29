import React, { useEffect, useState } from 'react';
import { Typography, Button } from 'antd';
import { ProfileCard, ProfileBackground, ProfileContent } from '../../styles';
import { useParams } from 'react-router';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import { TeacherProfile } from './TeacherProfile';
import { StudentProfile } from './StudentProfile';
import { getItem } from '../../utils/localStorage';

const { Text } = Typography;

interface ProfileProps {
  UserDetails: (username: string | undefined) => Promise<any>;
  isLoading: boolean;
}

interface Course {
  _id: string;
  courseName: string;
}

export const Profile: React.FunctionComponent<ProfileProps> = ({
                                                                 UserDetails,
                                                                 isLoading
                                                               }) => {
  const token = getItem('token');


  const username = JSON.parse(token as string)?.username;

  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      key: '1',
      label: 'Courses',
      children: [<p>English</p>]
    }
  ]);
  const [user, setUser] = useState({
    role: 'Student',
    username: username,
    numRewards: 0,
    courses: [],
    ranking: 3
  });
  useEffect(() => {
    UserDetails(username)
      .then((result) => {
        if (result) {
          setUser(result);
          const courses: Course[] = result.courses;
          const link = courses.map((c: Course) => {
            return <li><a href={'/course/' + c._id}>{c.courseName}</a></li>;
          });
          const newData = [...data];
          newData[0].children = link;

        } else {
          navigate('/404');
        }
      })
      .catch((err) => {
        navigate('/404');
      });
  }, [params.username]);

  return (
    <ProfileBackground>
      {user.role === 'Teacher' ? <TeacherProfile user={user} data={data}></TeacherProfile> :
        <StudentProfile user={user} data={data}></StudentProfile>}
    </ProfileBackground>
  );
};
