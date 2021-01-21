import { useState, useEffect,FC } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form, Spin, Input } from 'antd';

import { postManufacture } from '../../../redux/manufacture/actions';

import { StateType } from '../../../redux/reducers'

const ModalManufacturePost: FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector( (state: StateType) => state.user );
  const { postLoading } = useSelector( (state: StateType) => state.manufacture );
  const [showModal, setShowModal] = useState(false);
  
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields(); 
  }, [form, showModal]);

  return (
    <> 
      <Button className="add-manufacture" onClick={() => setShowModal(true)}>
        Добавить производителя
      </Button>
      <Modal title="Добавление производителя"
        forceRender
        visible={showModal}
        onCancel={() => setShowModal(false)}
        width={500} 
        okText="Добавить"
        cancelText="Отмена"
        okButtonProps={{form:'post-manufacture', htmlType: 'submit', disabled: postLoading}}
      >
        {
            !postLoading ? (
              <Form
                form={form}
                requiredMark={false}
                name="post-manufacture"
                layout="vertical" 
                onFinish={(e) => {
                  userData?.data.companyId && 
                    dispatch(postManufacture(
                      {
                        companyId: userData?.data.companyId,
                        ...e,
                      }, setShowModal
                    ));
                }}
              >
                <Form.Item 
                  label="Наименование производителя"
                  name="manufacturerName" 
                  rules={[
                    {
                      required: true,
                      message: 'Наименование производителя является обязательным',
                    },
                  ]}
                >
                  <Input placeholder="Наименование производителя" />
                </Form.Item>

                <Form.Item 
                  label="Адрес"
                  name="address" 
                  rules={[
                    {
                      required: true,
                      message: 'Адрес производителя является обязательным',
                    },
                  ]}
                >
                  <Input placeholder="Адрес" />
                </Form.Item>
                
                <Form.Item 
                  label="Почта"
                  name="email" 
                  rules={[
                    {
                      required: true,
                      message: 'Почта производителя является обязательным',
                    },
                  ]}
                >
                  <Input placeholder="Почта" />
                </Form.Item>

                <Form.Item 
                  label="Телефон"
                  name="phone" 
                  rules={[
                    {
                      required: true,
                      message: 'Телефон производителя является обязательным',
                    },
                  ]}
                >
                  <Input placeholder="Телефон" />
                </Form.Item>

              </Form>
            ) : (
              <Spin className="text-center"/>
            )
          } 
      </Modal>
    </>
  )
}

export default ModalManufacturePost