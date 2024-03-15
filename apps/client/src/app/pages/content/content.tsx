import React from 'react';
import { observer } from 'mobx-react';
import { Content } from '../../components/ContentForm/Content';

interface ContentProps {
  courseTitle: string;
}

export const ContentPage: React.FC<ContentProps> = observer(({ courseTitle }) => {
  return (

    <Content courseTitle={courseTitle} />

  );
});
