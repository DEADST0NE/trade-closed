import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars' 
import { List, Row, Col, Empty, InputNumber, Modal, Typography } from 'antd';

import { getApplicationPayments, putPayment } from '../../../redux/applications/actions'
import { StateType } from '../../../redux/reducers'

const Payments: FC = () => {
  const dispatch = useDispatch(); 
  const { detailInfo, payments, loadingPayments } = useSelector( (state: StateType) => state.applications ); 

  useEffect(() => {
    detailInfo && dispatch(getApplicationPayments(detailInfo.id));
  }, [dispatch, detailInfo])

  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userData } = useSelector( (state: StateType) => state.user );
  const [paymentId, setPaymentId] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<number | undefined>(undefined);

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
  const statusChange = detailInfo?.stages[0] === 4 || detailInfo?.stages[0] === 3
  return (
    <div className="payments-list">
      <List 
        loading={loadingPayments}
        pagination={false}
        footer={<Footer />}
      >
        <Scrollbars autoHeight autoHeightMax={200}>
        {
          payments?.map((item, index) => (
            <List.Item key={item.id} onClick={() => {
              if(!statusChange)
                setIsModalVisible(true); setValue(item.count); setPaymentId(item.id)
            }}>
              <Row gutter={24} className={!statusChange ? 'hoverend' : ''}> 
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
        <Modal title="Изменение оплаты"
          visible={isModalVisible} 
          onOk={() => {
            if(detailInfo?.id && paymentId && userData?.data.id && value) 
              dispatch(putPayment(detailInfo?.id, paymentId, userData?.data.id, value, setIsModalVisible, setValue))
          }} 
          okText="Добавить"
          cancelText="Отмена"
          okButtonProps={{ disabled: !value }}
          onCancel={() => setIsModalVisible(false)}
          confirmLoading={loadingPayments} 
          >
          <InputNumber
            size="large"
            style={{ width: '100%' }}
            disabled={loadingPayments}
            value={value}
            onChange={(value)=>setValue(Number(value))}
            step={0.2}/>
            <Typography.Text 
              style={{display: 'block', textAlign: 'end'}} 
              type="secondary">
                *Введите сумму
            </Typography.Text>
          </Modal>
      </List>
    </div>
  )
} 

export default Payments