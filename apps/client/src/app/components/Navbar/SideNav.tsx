import React from 'react';
import { MailOutlined, BookOutlined, HomeOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { profile } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { ICourse } from '../../api/api-types';
import { useStore } from '../../stores/setupContext';
import { Chat } from '../Chat/Chat';
import { getItem } from '../../utils/localStorage';


type MenuItem = Required<MenuProps>['items'][number];

function getItems(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
}


export const SideNav: React.FC<{ courses: ICourse[] }> = ({ courses }) => {
  const { navbar, auth } = useStore();
  const { search, courses: Courses, getAll, setChosenCourse, isLoading } = navbar;
  const { logout } = auth;
  const token = getItem('token');
  const userId = JSON.parse(token as string)?._id;


  const items: MenuProps['items'] = [
    getItems('Home', 'home', <HomeOutlined />),
    getItems('Courses', 'courses', <BookOutlined />,
      Courses.filter(course => course.participants.includes(userId))
        .map((course, index) => (
          getItems(course.courseName, course.courseName
          ))
        )
    ),
    getItems('Profile', 'profile', <MailOutlined />,
      profile.map((profile, index) => (
        getItems(profile.title, profile.linkTo
        ))
      )
    )
  ];
  const navigate = useNavigate();
  return (
    <Menu
      onClick={(e) => {
        if (e.keyPath[1] === 'courses') {
          setChosenCourse(e.key);
          navigate(`/courses/${e.key}`);
        } else if (e.keyPath[1] === 'profile') {
          if (e.key === 'signout') {
            logout();
            navigate('/auth');
          } else {

            navigate(`/${e.key}`);
          }
        } else if (e.keyPath[1] === 'profile') {
          navigate(`/chat`);
        } else {
          navigate('/');

        }
      }}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

