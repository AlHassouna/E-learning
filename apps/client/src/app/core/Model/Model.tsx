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

