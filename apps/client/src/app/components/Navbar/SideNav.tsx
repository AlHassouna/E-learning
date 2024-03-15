import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { courses, profile } from '../../constants';
import { useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
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

const items: MenuProps['items'] = [
  getItem('Courses', 'courses', <BookOutlined />,
    courses.map((course, index) => (
      getItem(course.title, course.key
      ))
    )
  ),
  getItem('Profile', 'profile', <MailOutlined />,
    profile.map((profile, index) => (
      getItem(profile.title, profile.key
      ))
    )
  )
];


export const SideNav: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Menu
      onClick={(e) => {
        if (e.keyPath[1] === 'courses') {
          console.log(e);
          navigate(`/courses/${e.key}`);
        } else if (e.keyPath[1] === 'profile') {
          navigate(`/profile/${e.key}`);
        }
      }}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};

