import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Popover, Button } from 'antd';
import { Row, Col } from 'antd';
import { StateType } from '../../redux/reducers'

import { getCompany } from '../../redux/company/actions'

import { ShopOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'

import StatisticCompany from './StatisticCompany'

import './Lk.scss'

const Company: FC = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector( (state: StateType) => state.user );
  const { company, loading } = useSelector( (state: StateType) => state.company );  
  useEffect(() => {
    userData?.data.id && dispatch(getCompany(userData?.data.id));
  }, [dispatch, userData?.data.id])

  if(loading){
    return (
      <div>
        Загрузка.....
      </div>
    )
  }

  const ComapnyInfo = () => {
    const [status, setStatus] = useState(false);
    return (
      <Popover onVisibleChange={() => setStatus(!status)} trigger="click" placement="bottom" content={"Data"}>
        <Button type="text">
          Подробные данные о компании {status ? <UpOutlined /> : <DownOutlined /> }
        </Button>
      </Popover>
    )
  }

  return (
    <> 
        <Row gutter={10}>
          <Col span={24}>
            <div className="company-header"> 
              <Avatar shape="square" size="large" icon={<ShopOutlined />} />
              <div className="company-info">
                <h3>{company?.name}</h3>
                <span className="company-address"> Адрес: {company?.address.region}, {company?.address.city}, {company?.address.street}</span>
                <ComapnyInfo />
              </div> 
            </div>
          </Col>
          <StatisticCompany />
        </Row> 
    </> 
  )
}

export default Company