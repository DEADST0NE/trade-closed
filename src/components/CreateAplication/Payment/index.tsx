import { FC } from "react"
import { Form, Input, Button, PageHeader } from 'antd'
import { RouteComponentProps } from 'react-router'

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { NavLink, withRouter } from "react-router-dom";

const Payment: FC<RouteComponentProps> = ({match}) => {

  const [form] = Form.useForm();

  return (
    <div className="create-application-payments">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Оплата"
      />
      <div className="create-application-payments-body">
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
          <Button>
            <NavLink to={`${match.url}/confirmation`}>
              Пропустить
            </NavLink>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(Payment)