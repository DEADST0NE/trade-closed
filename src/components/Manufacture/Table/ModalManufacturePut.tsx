import { useEffect, FC, Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Form, Spin, Input } from 'antd';

import { putManufacture } from '../../../redux/manufacture/actions';

import { StateType } from '../../../redux/reducers'

const ModalManufacturePut: 
FC<{id: string, showModal: boolean, setShowModal:Dispatch<SetStateAction<boolean>>}> = ({ id, showModal, setShowModal }) => {
  
  const dispatch = useDispatch();
  const { userData } = useSelector( (state: StateType) => state.user );
  const { manufacture, putLoading } = useSelector( (state: StateType) => state.manufacture ); 
  
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields(); 
  }, [form, showModal]);

  return (
    <>
      <Modal title="Изменение производителя"
        forceRender
        visible={showModal}
        onCancel={() => setShowModal(false)}
        width={500} 
        okText="Изменить"
        cancelText="Отмена"
        okButtonProps={{form:'put-manufacture', htmlType: 'submit', disabled: putLoading}}
      >
        {
            !putLoading ? (
              <Form
                form={form}
                requiredMark={false}
                name="put-manufacture"
                layout="vertical"
                initialValues={{
                  manufacturerName: manufacture[id]?.name,
                  address: manufacture[id]?.address,
                  email: manufacture[id]?.email,
                  phone: manufacture[id]?.phone,
                }}
                onFinish={(e) => {
                  userData?.data.companyId && 
                    dispatch(putManufacture(
                      {
                        manufacturerId: id,
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

export default ModalManufacturePut