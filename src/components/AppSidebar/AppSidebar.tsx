import { FC } from 'react'
import { Layout, Menu } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'


import Icon from '../generic/Icon';

import './AppSidebar.scss'

const AppSidebar: FC<RouteComponentProps> = ({ location }) => { 
  return (
    <Layout.Sider className="sidebar" theme="light" breakpoint="lg" collapsedWidth="0"> 
      <Menu mode="inline" selectedKeys={[`/${location.pathname.split('/')[1]}`]}>
        <Menu.Item key="/create-application" 
          icon={<Icon style={{ marginLeft: '9px' }} name="create-application"/>}>
          <NavLink to="/create-application">
            Создать заявку
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="/applications" 
          icon={<Icon name="applications"/>}>
          <NavLink to="/applications">
            Все заявки
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="/clients" 
          icon={<Icon name="clients"/>}>
          <NavLink to="/clients">
            Клиенты
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="/editing" 
          icon={<Icon name="product"/>}>
          <NavLink to="/editing/all">
            Товары
          </NavLink> 
        </Menu.Item>
        <Menu.Item key="/manufacturers"
          icon={<Icon name="manufacture"/>}>
          <NavLink to="/manufacturers">
            Производители
          </NavLink> 
        </Menu.Item> 
      </Menu>
    </Layout.Sider>
  )
}

export default withRouter(AppSidebar)