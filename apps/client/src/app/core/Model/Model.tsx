import React, { useState } from 'react';
import { Button, Modal } from 'antd';

interface ModelProps {
  title: string;
  btnTitle: string;
  children: React.ReactNode;
}

export const DModel: React.FC<ModelProps> = ({
                                               title, children, btnTitle
                                             }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
     {/* @ts-ignore */}
     <style jsx>{`.css-dev-only-do-not-override-1uweeqc.ant-btn-primary
          {
            &:hover{
              background-color: #03565B !important
            }
          }`}</style>
      <Button type="primary" onClick={showModal}>
        {btnTitle}
      </Button>
      <Modal footer={
        <>
     
        </>
      } title={title} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        {children}
      </Modal>
    </>
  );
};

