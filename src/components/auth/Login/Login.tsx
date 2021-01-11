import React, {FC} from 'react'

import LoginForm from './LoginForm';
import { Button } from 'antd';

import loginPagesImg from '../../../images/login-pages.png'
import logo from '../../../images/logo.svg'

import './Login.scss'

const Login: FC = () => (
  <div className="login">
    <div className="login-wrapper">
      <div className="login-left">
        <div className="login-left-content">
          <div className="login-left-header">
            <img src={logo} alt="logo" />
            <span>OMMERCE</span>
          </div>
          <div className="login-left-body">
            <div className="login-left-title-wrapper">
              <span className="login-left-title">
                <span>Авторизация</span>
              </span>
            </div>
            <LoginForm />
            <div className="navigation-link">
              <Button type="text" href="#">Создать акаунт</Button>
              <Button type="text" href="#">Забыли пароль</Button>
            </div>
          </div>
          <div className="login-left-footer">© 2020 WebSystems</div>
        </div>
      </div>
      <div className="login-right">
        <img src={loginPagesImg} alt="img" />
      </div>
    </div>
  </div> 
)

export default Login;