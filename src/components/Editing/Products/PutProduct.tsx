import { FC, useState, SetStateAction, Dispatch, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Form, Input, Modal, Button, Select, Spin } from 'antd'

import UploadImg from './UploadImg'
import SelectCategoryProduct from './SelectCategoryProduct'
import SelectClientCategory from './SelectClientCategory'
import SelectManufacturerProduct from './SelectManufacturerProduct'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import { putProducts } from '../../../redux/product/actions'
import  { getMeasures } from '../../../redux/measure/actions'
import  { getManufacturers } from '../../../redux/manufacture/actions'
import { StateType } from '../../../redux/reducers'


const ChangeProduct: FC< { keyObject: string, showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>} > = ({ keyObject, showModal, setShowModal }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { products, putLoading } = useSelector( (state: StateType) => state.product );
  const { measures, loading } = useSelector( (state: StateType) => state.measures );
  const { userData } = useSelector( (state: StateType) => state.user );

  useEffect(() => { 
    userData?.data.companyId && dispatch(getManufacturers(userData?.data.companyId));
    dispatch(getMeasures());
  }, [dispatch, userData?.data.companyId]);

  useEffect(() => {
    form.resetFields();
    products[keyObject]?.avatarProduct && setImg({src: products[keyObject]?.avatarProduct}) 
  }, [products, keyObject, form, showModal]);
  
  const [img, setImg] = useState<null | {src: string, file?: File, putFile?: string}>(null); // Картинка 
  return (
    <> 
      <Modal title="Изменить товар"
        forceRender
        visible={showModal}
        width={650}
        okButtonProps={{form:'put-product', htmlType: 'submit'}}
        okText="Изменить" 
        cancelText="Отмена" 
        onCancel={() => {
          form.resetFields();
          setShowModal(false);
          setImg(null);
        }}>
        <div className="product-wrapper-change">
          {
            !putLoading ? (
              <Form
                form={form}
                requiredMark={false}
                name="put-product"
                layout="vertical"
                initialValues={{
                  id: products[keyObject]?.id,
                  title: products[keyObject]?.name,
                  type: products[keyObject]?.measure.value,
                  category: products[keyObject]?.categoryId,
                  weight: products[keyObject]?.weight,
                  info: products[keyObject]?.description,
                  code: products[keyObject]?.code,
                  manufacturer: products[keyObject]?.manufacturer.id,
                  price: products[keyObject]?.price.map(item => ({
                    id: item.id,
                    categoryClient: item.category.value,
                    price: item.count
                  })),
                }}
                onFinish={(e) => { 
                    dispatch(putProducts(
                      {
                        id: products[keyObject]?.id, 
                        imgProduct: img?.putFile?.split(',')[1],
                        ...e,
                      }, setShowModal
                    ));
                }}
              >
                <div className="product-change-content-left">
                  <div className="product-upload-img">
                    <UploadImg img={img} setImg={setImg}/>
                  </div>  
                </div>
                <div className="product-change-content-right">

                  <Form.Item 
                    label="Наименование товара"
                    name="title"
                    className="product-title"
                    rules={[
                      {
                        required: true,
                        message: 'Наименование товара является обязательным',
                      },
                    ]}
                  >
                    <Input placeholder="Наименование товара" />
                  </Form.Item>

                  <Form.Item 
                    name="manufacturer"
                    label="Производитель"
                    rules={[
                      {
                        required: true,
                        message: 'Производитель является обязательным',
                      },
                    ]}
                  >
                    <SelectManufacturerProduct />
                  </Form.Item>

                  <Form.Item 
                    name="category"
                    label="Категория товара"
                    rules={[
                      {
                        required: true,
                        message: 'Категория товара является обязательной',
                      },
                    ]}
                  >
                    <SelectCategoryProduct />
                  </Form.Item>

                  <Form.Item 
                    name="code"
                    label="Код товара"
                    rules={[
                      {
                        required: true,
                        message: 'Код товара является обязательной',
                      },
                    ]}
                  >
                    <Input placeholder="Код товара" />
                  </Form.Item> 

                  <div className="product-weight">
                    <Form.Item label="Масса" className="product-weight-wrapper"> 
                      <Form.Item className="propuct-weight-number" name="weight" rules={[{ required: true, message: 'Масса обязательна' }]}>
                        <Input type="number" /> 
                      </Form.Item>
                      <Form.Item className="propuct-weight-type" name="type" rules={[{ required: true, message: 'Единица измерения обязательна' }]}> 
                        <Select loading={loading} >
                          {
                            measures?.map( item => (
                              <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                            ))
                          } 
                        </Select>
                      </Form.Item>
                    </Form.Item> 
                  </div>
                  
                  <Form.Item name="info" label="Описание">
                    <Input.TextArea />
                  </Form.Item>

                  <div className="product-price-list">
                    <Form.List name="price">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item
                              key={field.name + field.fieldKey}
                              label={
                                index === 0 ? (
                                  <div className="product-price-title">
                                    <span>Цена</span>
                                    <Button className="product-price-add" 
                                      size="small" shape="circle" icon={<PlusOutlined />} onClick={() => add()} />
                                  </div>
                                ) : null
                              }
                              className="product-price-item"
                              required={false}
                            >
                              
                              <Form.Item
                                {...field}
                                key={field.name + 'categoryClient' + index}
                                className="propuct-price-category"
                                name={[field.name, 'categoryClient']}
                                rules={[{ required: true, message: 'Категория клиента обязательна' }]}
                              >
                                <SelectClientCategory selectedvalue={form.getFieldValue('price')}/>
                              </Form.Item>
                              <Form.Item
                                {...field}
                                key={field.name + 'price' + index}
                                className="propuct-price-count"
                                name={[field.name, 'price']}
                                rules={[{ required: true, message: 'Цена обязательна' }]}
                              >
                                <Input type="number" placeholder="Цена" />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <div className="dynamic-delete-button">
                                  <MinusCircleOutlined 
                                    onClick={() => remove(field.name)}
                                  />
                                </div>
                              ) : null}
                            </Form.Item> 
                          ))}
                        </>
                      )}
                    </Form.List>
                  </div>
                </div>
              </Form>
            ) : (
              <Spin />
            )
          } 
        </div>
    </Modal>
    </>
  )
}

export default ChangeProduct