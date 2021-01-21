import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Input, List, Avatar } from 'antd'
import { NavLink, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import { RightOutlined } from '@ant-design/icons'

import { getClient } from '../../../redux/client/actions' 
import { StateType } from '../../../redux/reducers' 


interface matchParams { 
  clientId: string;
}

const Clients: FC<RouteComponentProps<matchParams>> = ({ match }) => {
  const dispatch = useDispatch(); 

  const { userData } = useSelector( (state: StateType) => state.user );
  useEffect(() => {
    userData?.data.companyId && dispatch(getClient(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  const { clients, loading } = useSelector( (state: StateType) => state.client );
  
  const Search = () => (
    <Input.Search
      className="create-application-client-search"
      placeholder="Поиск клиента"
      allowClear
      onSearch={(value) => {
        console.log(value);
      }}
    />
  )

  return ( 
    <List
      itemLayout="horizontal"
      dataSource={Object.keys(clients)}
      split={false}
      loading={loading}
      header={<Search />}
      className="create-application-clients"
      renderItem={item => (
        <List.Item>
          <NavLink to={`/create-application/${clients[item].key}/category/all/products`}>
            <List.Item.Meta
              avatar={<Avatar style={clients[item].name[0] > 'О' ? { background: 'orange' } : { background: '#7265e6' }}>{clients[item].name[0]}</Avatar>}
              title={clients[item].name}
              description={`Адресс: ${clients[item].address}, Телефон: ${clients[item].phone}, Cтатус: ${clients[item].clientsCategory.label ? clients[item].clientsCategory.label : 'Не указан'}`}
            />
          </NavLink>
          <RightOutlined className="create-application-clients-icon"/>
        </List.Item>
      )}
    />
  )
}

export default withRouter(Clients)