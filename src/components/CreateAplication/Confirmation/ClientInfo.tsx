import { FC } from 'react'
import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Avatar, Spin, PageHeader } from 'antd'

import { 
  MailOutlined, 
  PhoneOutlined, 
  PartitionOutlined, 
  CalendarOutlined 
} from '@ant-design/icons';

import { StateType } from '../../../redux/reducers'

interface matchParams { 
  clientId: string;
}

const ClientInfo: FC = () => {
  const match = useRouteMatch<matchParams>();
  const { clients, loading } = useSelector( (state: StateType) => state.client ); 
  const client = clients[match.params.clientId];
  return (
    <div className="confirmation-client">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Клиент"
      />
      {
        loading ? (
          <Spin /> 
        ) : (
          <div className="confirmation-client-info">
            <div className="confirmation-client-avatar">
              <Avatar size="large" shape="square"  style={{ backgroundColor: '#929292' }}>
                {client?.name[0]}
              </Avatar>
              <div>
                <span className="client-name">{client?.name}</span>
                <span className="client-small">{client?.address}</span>
              </div>
            </div>
            <ul>
              <li>
                <MailOutlined />Почта:
                <span>{client?.email}</span>
              </li>
              <li>
                <PhoneOutlined />Телефон:
                <span>{client?.phone}</span>
              </li>
              <li>
                <PartitionOutlined />Категория клиента:
                <span>{client?.clientsCategory.label}</span>
              </li>
              <li>
                <CalendarOutlined />Дата добавления:
                <span>{client?.dateAdd}</span>
              </li>
            </ul>
            <div className="statistic-client">
              <div className="statistic-application">
                {client?.applicationStatistic.count}
                <span>Заявки</span>
              </div>
              <div className="statistic-debt">
                {client?.debt.count}
                <span>Задолженность</span>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default ClientInfo