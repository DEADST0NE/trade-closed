import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Menu, Dropdown, Popconfirm } from "antd"
import { DownOutlined, LoadingOutlined } from "@ant-design/icons"

import { stagesTeg } from '../../../utils/stagesTag'

import { postApplications } from '../../../redux/applications/actions'
import { StateType } from '../../../redux/reducers'

const Stages: FC = () => {
  const dispatch = useDispatch();  
  const { userData } = useSelector( (state: StateType) => state.user );
  const { detailInfo, stageLoading } = useSelector( (state: StateType) => state.applications );  

  const [ visible, setVisible ] = useState(false);

  const stagesDictionary = [ 
    {label: 'Новый', value: 1}, 
    {label: 'В работе', value: 2}, 
    {label: 'Исполненно', value: 3}, 
    {label: 'Отказано', value: 4}
  ]

  const menu = (
    <Menu onClick={() => setVisible(true)}>
      {stagesDictionary.map((item) => (
        <Menu.Item key={item.label} disabled={detailInfo?.stages[0] === item.value} danger={4 === item.value}>
          <Popconfirm 
            key={item.label}
            disabled={detailInfo?.stages[0] === item.value}
            placement="bottomRight" 
            title="Вы уверены ?" 
            okText="Да" 
            onConfirm={ () => { 
              if(detailInfo?.id && userData && item) 
                dispatch(postApplications(detailInfo.id, userData?.data?.id, item.value));
            } }
            cancelText="Нет">
              {item.label}
          </Popconfirm>
        </Menu.Item>
      ))} 
    </Menu>
  ); 

  return (
    <Dropdown.Button
      disabled={detailInfo?.stages[0] === 4 || detailInfo?.stages[0] === 3}
      icon={stageLoading ? <LoadingOutlined /> : <DownOutlined />}
      overlay={menu}
      onVisibleChange={(show) => setVisible(show)}
      visible={visible}
      >
        {stagesTeg(detailInfo?.stages[0])}
    </Dropdown.Button>
  )
}

export default Stages