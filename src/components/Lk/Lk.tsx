import { FC } from 'react'
import { Row, Col, Avatar, Button } from 'antd'
import { useSelector } from 'react-redux' 
import { LogoutOutlined, LockOutlined, ContactsOutlined } from '@ant-design/icons'

import ChangeUser from './ChangeUser'
import Company from './Company'

import { StateType } from '../../redux/reducers'

import './Lk.scss'

const Lk: FC = () => {

  const { userData } = useSelector( (state: StateType) => state.user ); 

  return (
    <div className="lk-page"> 
      <Row className="lk-wraper" gutter={10}>
        <Col span={4}>
          <div className="menu-lk">
            
            <div className="account-header">
              <Avatar size="large"
                style={{ backgroundColor: '#7265e6' }}>
                {userData?.data.name[0]}
              </Avatar>
              <div className="title">
                <h3>{userData?.data.name}</h3>
                <h4>
                  <span><ContactsOutlined /></span>
                  <span>{userData?.data.job}</span>
                </h4>
              </div> 
            </div> 
            <ul className="account-body"> 
              <li>
                <span>Почта:</span>
                <span>{userData?.data.email}</span>
              </li> 
              <li>
                <span>Адрес:</span>
                <span title={userData?.data.address || '---'}>
                  {userData?.data.address || '---'}
                </span>
              </li> 
            </ul>
            <hr />
            <div className="account-footer"> 
              <ChangeUser />
              <Button block type="text" icon={<LockOutlined />}>
                Сменить пароль
              </Button>
              <Button block type="text" icon={<LogoutOutlined />}>
                Выйти
              </Button>
            </div> 
          </div>
        </Col>
        <Col span={20}>
          <Company />
        </Col> 
      </Row>
    </div>
  )
}

export default Lk