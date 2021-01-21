import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Modal, Form, Input, Menu, Spin } from 'antd'

import { PlusOutlined } from '@ant-design/icons'

import { postCaregory } from '../../../redux/category/actions'
import { StateType } from '../../../redux/reducers'

const PostCategory: FC = (props) => {
  const dispatch = useDispatch();

  const { userData } = useSelector( (state: StateType) => state.user );
  const { postLoading } = useSelector( (state: StateType) => state.category );

  const [ show, setShowModal ] = useState(false);
  
  const [form] = Form.useForm();

  return (
    <>
      <Menu.Item 
        {...props}
        className="categories-create" 
        key="/add-categories" 
        icon={<PlusOutlined />} 
        onClick={() => setShowModal(true)} />

      <Modal title="Добавить категорию"
        forceRender
        visible={show}
        width={450} 
        okButtonProps={{form:'post-category', htmlType: 'submit'}}
        okText="Доавить" 
        cancelText="Отмена" 
        onCancel={() => {
          form.resetFields();
          setShowModal(false);
        }}>
        {
          !postLoading ? (
            <Form
              form={form}
              requiredMark={false}
              name="post-category"
              layout="vertical" 
              onFinish={(e) => { 
                userData?.data.companyId && 
                  dispatch(postCaregory(userData?.data.companyId, e.productName, setShowModal));
              }}
            >
              <Form.Item className="mb-0" name="productName" rules={[{ required: true, message: 'Наименование категории обязательно' }]}>
                <Input placeholder="Наименование категории"/> 
              </Form.Item>
            </Form>
            ) : (
              <Spin />
          )
        } 
      </Modal>
    </>
  )
} 

export default PostCategory