import React from 'react';
import { observer } from 'mobx-react';
import { NotFound } from '../../components/ErrorForm/Error';


export const ErrorPage: React.FC = observer(() => {
  return (
    <>
    <NotFound>
    </NotFound> 
    </>
  );
});
