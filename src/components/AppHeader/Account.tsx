import React, { ComponentClass } from 'react' 
import { useSelector } from 'react-redux'
import { Avatar, Button, Popover } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'

import { resetAuthData } from '../../services/authService'
import { StateType } from '../../redux/reducers'
import { withRouter } from 'react-router-dom'

const Account: ComponentClass = withRouter(({ history }) => {

  const logout = ():void => {
    resetAuthData();
    history.push('/login');
  }

  const content = (
    <ul className="header-menu-user">
      <li>
        <Button 
          href="/lk" 
          block 
          type="text"
        >
          Мой профиля
        </Button>
      </li>
      <li>
        <Button 
          block 
          onClick={() => logout()}
          type="text" 
          icon={<LogoutOutlined />}
        >
            Выйти
        </Button>
      </li>
    </ul>
  );

  const { userData } = useSelector( (state: StateType) => state.user ); 

  const titleMenuUser = (
    <span className="header-menu-user-title">
      {userData?.data.name}
    </span>
  )

  return (
    <Popover placement="rightBottom" content={content} title={titleMenuUser} trigger="click">
      <Avatar size="default" style={{ backgroundColor: '#7265e6' }}>
        {userData?.data.name[0]}
      </Avatar>
    </Popover>
  )
})

export default Account