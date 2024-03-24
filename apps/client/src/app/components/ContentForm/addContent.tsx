import React, { useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import yup from 'yup';

const { Option } = Select;

export interface ContentFormValues {
  courseTitle: string;
  content: string;
  contentType: string;
  file?: File;
}

interface AddContentModalProps {
  visible: boolean;
  onCreate: (values: any) => Promise<void>;
  onCancel: () => void;
}

export const AddContentModal: React.FC<AddContentModalProps> = ({ visible, onCreate, onCancel }) => {
  const [form, setForm] = useState({ contentType: 'text' } as ContentFormValues);
  const [loading, setLoading] = useState(false);


  const handleAdd = () => {
    setLoading(true);
    console.log(form);

    onCreate(form).then(() => {

      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  };

  const handleContentTypeChange = (value: string) => {
    if (value === 'text') {
      const { file, ...newForm } = form;
      setForm({ ...newForm, contentType: value });
    } else {
      setForm({ ...form, contentType: value });
    }

  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setForm({ ...form, content: e.target.value });
  };


  const handleFileChange = (info: any) => {
    if (info.file.type === 'image/jpeg' || info.file.type === 'image/jpg' || info.file.type === 'image/png' || info.file.type === 'video/mp4') {
      const fileList = [...info.fileList];
      if (fileList.length > 1) {
        fileList.shift();
      }
      setForm({ ...form, file: fileList[0]?.originFileObj });
    } else {
      alert('Invalid file type');
    }
  };


  return (
    <Modal
      visible={visible}
      title="Add Content"
      okText="Add"
      cancelText="Cancel"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleAdd}>
          Add
        </Button>
      ]}
    >
      <Form layout="vertical">

        <Form.Item label="Content Type">
          <Select defaultValue="text" onChange={handleContentTypeChange}>
            <Option value="text">Text</Option>
            <Option value="image">Image</Option>
            <Option value="video">Video</Option>
          </Select>
        </Form.Item>
        {form.contentType === 'text' && (
          <Form.Item label="Content">
            <Input.TextArea onChange={handleContentChange} />
          </Form.Item>)}

        {form.contentType !== 'text' && (
          <Form.Item label="Content">
            <Upload onChange={handleFileChange} beforeUpload={() => false}
                    fileList={form.file ? [{ uid: '-1', name: form.file.name, status: 'done' }] : []}>
              <Button icon={<UploadOutlined />}>Upload</Button>

            </Upload>

          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

