import React, { FC } from 'react'
import { Layout } from 'antd'

import Account from './Account'

import logo from '../../images/logo.svg';
import './AppHeader.scss'


const AppHeader: FC = () => {

  return (
    <Layout.Header className="header site-layout-background">
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>RADE</span>
      </div>
      <Account />
    </Layout.Header> 
  )
}

export default AppHeader;