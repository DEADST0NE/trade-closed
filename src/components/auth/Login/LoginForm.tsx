import React, { ComponentClass } from 'react' 
import { Form, Input, Button } from 'antd';
import { LoginOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { StateType } from '../../../redux/reducers';
import { loginUser } from '../../../redux/user/actions';

type valuesFormType = { 
  email: string;
  password: string;
}; 

const LoginForm: ComponentClass = withRouter(({history}) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector( (state: StateType) => state.user ); 
  const onFinish = (values: valuesFormType) => {
    dispatch(loginUser(values, history.push))
  };
  return (
    <Form
      name="login"
      className="login-form"
      layout="vertical"
      requiredMark={false}
      initialValues={{}}
      onFinish={onFinish}
    >
      <Form.Item
        name="email" 
        rules={[
          { 
            required: true,
            message: 'Пожалуйста введите свой Email',
          },
          {
            type: "email",
            message: 'Email не соответствует формату',
          }
        ]}
        validateStatus={error?.email ? 'error': undefined} 
        help={error?.email}
      >
        <Input size="large"
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста введите свой пароль',
          },
        ]}
        validateStatus={error?.password ? 'error': undefined} 
        help={error?.password}
      >
        <Input.Password size="large" 
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Пароль"/>
      </Form.Item> 

      <Form.Item className="submit-content">
        <Button type="primary" htmlType="submit" 
          block size="large" loading={loading} icon={<LoginOutlined />}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
})

export default LoginForm;