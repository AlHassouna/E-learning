import React, { useState } from 'react';
import { Button } from 'antd';
import type { ConfigProviderProps } from 'antd';
import {IButton} from '../../types'
type SizeType = ConfigProviderProps['componentSize'];

export const Btn: React.FC<IButton> = ({text,icon,type,disabled,onClick,className,danger,htmlType,loading}) => {
  const [size, setSize] = useState<SizeType>('large'); // default is 'middle'


  return (
    <Button disabled={disabled} loading={loading} onClick={onClick} htmlType={htmlType} className={className}  type={type}  icon={icon} size={size} danger={danger}>
      {text}
    </Button>
  );
};

