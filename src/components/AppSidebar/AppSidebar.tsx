import React, { FC } from 'react'
import { Layout, Menu } from 'antd'
import { NavLink } from 'react-router-dom'

import Icon from '../generic/Icon';

import './AppSidebar.scss'

const AppSidebar: FC = () => {
  
  return (
    <Layout.Sider className="sidebar" theme="light" breakpoint="lg" collapsedWidth="0"> 
      <Menu defaultSelectedKeys={['2']} mode="inline">
        <Menu.Item key="1" icon={<Icon style={{ marginLeft: '9px' }} name="create-application"/>}>
          <NavLink to="/create-application">
            Создать заявку
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="2" icon={<Icon name="applications"/>}>
          <NavLink to="/applications">
            Все заявки
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="3" icon={<Icon name="clients"/>}>
          <NavLink to="/clients">
            Клиенты
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="4" icon={<Icon name="product"/>}>
          <NavLink to="/products">
            Товары
          </NavLink> 
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  )
}

export default AppSidebar