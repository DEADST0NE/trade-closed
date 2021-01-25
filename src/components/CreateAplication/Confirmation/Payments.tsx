import { FC } from "react"
import { Form, Input, Button, PageHeader } from 'antd'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'; 

const Payments: FC = () => {

  const [form] = Form.useForm();

  return (
    <div className="confirmation-payments">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Оплата"
      />
      <div className="confirmation-payments-form">
        <Form
          form={form}
          requiredMark={false}
          name="put-product"
          layout="vertical" 
          onFinish={(e) => console.log(e)}
        >
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
        </Form>
      </div>
    </div>
  )
}

export default Payments