import { FC } from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import { Avatar, Spin, Alert } from 'antd'

import { StateType } from '../../../redux/reducers'

interface matchParams { 
  clientId: string;
}

const ClientInfo: FC<RouteComponentProps<matchParams>> = ({ match }) => {
  const { clients, loading } = useSelector( (state: StateType) => state.client );
  console.log(clients[match.params.clientId]);
  const client = clients[match.params.clientId];
  console.log(client, loading);
  return (
    <div className="confirmation-client"> 
      <div className="confirmation-client-body">
        {
          loading ? (
            <Spin /> 
          ) : (
            <>
              <div className="confirmation-client-avatar">
                <Avatar size="large" shape="square" style={{ backgroundColor: '#7265e6' }}>
                  {client?.name[0]}
                </Avatar>
                  <span className="client-name">{client.name}</span> 
              </div>
              <div className="client-info"> 
                <Alert 
                  message={ client.debt.count <= 0 ? 'Задолжность клиента отсутствует' : 'Задолжность клиента' }
                  description={ client.debt.count <= 0 ? false : `Сумма долга: ${client.debt.count} ₽` }
                  type={ client.debt.count <= 0 ? 'success' : 'warning' }
                  showIcon
                  closable
                />
                <ul>
                  <li>Адресс: <span>{client?.address}</span></li>
                  <li>Почта: <span>{client?.email}</span></li>
                  <li>Телефон: <span>{client?.phone}</span></li>
                  <li>Дата добавления: <span>{client?.dateAdd}</span></li>
                  <li>Категория: <span>
                    {client?.clientsCategory?.label || "Категория клиента не заданна"}
                    </span>
                  </li>
                </ul> 
              </div>
            </>
          )
        }
      </div>
    </div>
  )
}

export default withRouter(ClientInfo)