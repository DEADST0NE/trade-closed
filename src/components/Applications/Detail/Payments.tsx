import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars' 
import { List, Row, Col, Empty } from 'antd';

import { getApplicationPayments } from '../../../redux/applications/actions'
import { StateType } from '../../../redux/reducers'

const Payments: FC = () => {
  const dispatch = useDispatch(); 
  const { detailInfo, payments, loadingPayments } = useSelector( (state: StateType) => state.applications ); 

  useEffect(() => {
    detailInfo && dispatch(getApplicationPayments(detailInfo.id));
  }, [dispatch, detailInfo])

  const Footer = () => (
    <div className="payments-total">
      <span>Общая сумма оплаты:</span>
      { payments?.reduce((a: number, {count}: {count: number}) => (a + count), 0) } ₽
    </div>
  )

  const transledJobPos = (value: string) => {
    switch(value) {
      case 'Operator':
        return 'Оператор';
      default:
        return 'Оператор';
    }
  }
  if (payments?.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  }

  return (
    <div className="payments-list mb-4">
      <List 
        loading={loadingPayments}
        pagination={false}
        footer={<Footer />}
      >
        <Scrollbars autoHeight autoHeightMax={200}>
        {
          payments?.map((item, index) => (
            <List.Item key={item.id}>
              <Row gutter={24}> 
                <Col className="number" xl={3} xxl={3} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  №
                  <span>{1 + index}</span>
                </Col>
                <Col className="employee-name" xl={9} xxl={11}>
                  <div>
                    {item.employeeName}
                    <span>
                      {transledJobPos(item.employeeJobPos)}
                    </span>
                  </div>
                </Col>
                <Col className="date" xl={6} xxl={5}>
                  {item.date}
                </Col>
                <Col className="count" xl={6} xxl={5}>
                  {item.count} ₽
                </Col>
              </Row>
              
            </List.Item>
          ))
        }
        </Scrollbars> 
      </List>
    </div>
  )
}

export default Payments