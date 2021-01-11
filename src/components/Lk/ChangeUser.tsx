import { FC, useState } from 'react';
import { Modal, Button, Upload, Form, Input } from 'antd';
import ImgCrop from 'antd-img-crop';

import { EditOutlined, DownloadOutlined } from '@ant-design/icons'

const ChangeUser: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);  
  
  return (
    <>
      <Button block type="text" icon={<EditOutlined />} onClick={() => setIsModalVisible(true)}>
        Изменить данные
      </Button>
      <Modal width={700} cancelText="Отмена" okText="Изменить" title="Изменить данные пользователя" visible={isModalVisible} 
        onOk={() => {console.log('ok')}} onCancel={() => setIsModalVisible(false)}>
        <div>
          <ImgCrop rotate>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
            >
              <DownloadOutlined style={{ fontSize: '40px'}}/>
            </Upload>
          </ImgCrop>

          <Form layout="vertical"> 
            <Form.Item required>
              <Input placeholder="Фамилия Имя Отчество" />
            </Form.Item>
            <Form.Item required>
              <Input placeholder="Номер телефона 1" />
            </Form.Item>
            <Form.Item required>
              <Input placeholder="Номер телефона 2" />
            </Form.Item> 
          </Form>

        </div>
      </Modal>
    </>
  );
};

export default ChangeUser;