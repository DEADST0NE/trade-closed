import { FC } from 'react';
import { useSelector } from 'react-redux'
import { Input, List, Avatar, PageHeader } from 'antd'
import { NavLink } from 'react-router-dom'

import { RightOutlined } from '@ant-design/icons'

import { StateType } from '../../../redux/reducers' 

const Clients: FC = () => {

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
    <>
      <div className="create-application-client">
        <PageHeader
          ghost={false} 
          className="page-header-create-application"
          title="Клиенты"
        />
        <List
          itemLayout="horizontal"
          dataSource={Object.keys(clients)}
          split={false}
          loading={loading}
          header={<Search />} 
          renderItem={item => (
            <List.Item>
              <NavLink to={`/create-application/${clients[item].id}/category/all/products`}>
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
      </div> 
    </>
  )
}

export default Clients