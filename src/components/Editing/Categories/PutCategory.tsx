import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Modal, Form, Input, Button, Spin } from 'antd'

import { EditOutlined } from '@ant-design/icons'

import { putCaregory } from '../../../redux/category/actions'
import { StateType } from '../../../redux/reducers'

const PutCategory: FC<{ id: string, categoryName: string }> = ({id, categoryName}) => {
  const dispatch = useDispatch(); 
  const { userData } = useSelector( (state: StateType) => state.user );
  const { postLoading } = useSelector( (state: StateType) => state.category );

  const [ show, setShowModal ] = useState(false);
  
  const [form] = Form.useForm(); 
  return (
    <>
      <Button className="change-category" type="text" icon={<EditOutlined />} onClick={() => setShowModal(true)}/> 

      <Modal title="Добавить категорию"
        forceRender
        visible={show}
        width={450} 
        okButtonProps={{form:`put-category-${id}`, htmlType: 'submit'}}
        okText="Изменить" 
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
              name={`put-category-${id}`}
              layout="vertical"
              initialValues={{ 
                productName: categoryName,
              }}
              onFinish={(e) => { 
                userData?.data.companyId && 
                  dispatch(putCaregory(userData?.data.companyId, id, e.productName, setShowModal));
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

export default PutCategory