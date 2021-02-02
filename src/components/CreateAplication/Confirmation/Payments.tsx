import { FC, useState } from "react"
import { useDispatch, useSelector } from 'react-redux' 
import { Typography, Modal, InputNumber, PageHeader, Empty, Button, List, Row, Col, Result, Spin } from 'antd' 
import { useParams, useHistory } from 'react-router-dom'

import { CheckOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import { addBasketPayment, deleteBasketPayment } from '../../../redux/basket/actions'
import { postApplication } from '../../../redux/applications/actions' 
import { StateType } from '../../../redux/reducers'

const Payments: FC = () => { 
  const dispatch = useDispatch();
  const { payments, basket } = useSelector( (state: StateType) => state.basket );
  const { userData } = useSelector( (state: StateType) => state.user );
  return (
    <div className="confirmation-payments">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Оплата"
      />
      {payments.length ? (<AddPayment />) : null}
      <div className="confirmation-payments-list">
        {
          payments.length ? (
            <>
              <List pagination={false} footer={null}> 
              {
                payments?.map((item, index) => (
                  <List.Item key={item + index}>
                    <Row gutter={24}> 
                      <Col className="number" xl={3} xxl={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        №
                        <span>{1 + index}</span>
                      </Col>
                      <Col className="employee-name" xl={8} xxl={9}>
                        <div>
                          {userData?.data.name}
                          <span>
                            {userData?.data.job}
                          </span>
                        </div>
                      </Col>
                      <Col className="date" xl={7} xxl={5}>
                        {new Date().toLocaleDateString()}
                      </Col>
                      <Col className="count" xl={6} xxl={5}>
                        {item} ₽
                      </Col>
                      <Col className="delete" xl={3} xxl={3}>
                        <DeleteOutlined onClick={ () => dispatch(deleteBasketPayment(index)) }/>
                      </Col>
                    </Row> 
                  </List.Item>
                ))
                
              } 
                <List.Item key="add-payment-create-application"> 
                </List.Item>
              </List>
              
              <div className="sum-payments-count">
                Сумма оплат: <span>{payments.reduce((sum, item) => item + sum, 0)} ₽</span>
              </div>  
            </>
          ) : ( 
            <div className="none-payments">
              <div>
                <Empty description=""/>
                <AddPayment />
              </div>
            </div>
          )
        } 
      </div>
      <div className="confirmation-payments-info">  
        <div className="remainder-count">
          Остаток к оплате: 
          <span>
            { 
              Object.keys(basket)?.reduce( ( sum, item ) => sum + (basket[item].count * Number(basket[item].product.price?.count)), 0) - 
              payments.reduce((sum, item) => item + sum, 0) 
            } ₽
          </span>
        </div> 
      </div>
      <Confirmation />
    </div>
  )
}

const AddPayment: FC = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState<number | undefined>(undefined);
  const [error, setError] = useState(false);
  const { basket, payments } = useSelector( (state: StateType) => state.basket ); 
  return (
    <>
      <Button onClick={() => setIsModalVisible(true)} disabled={!(Object.keys(basket).length > 0)} className={payments.length ? 'btn-add-payment' : ''}>
        {payments.length ? <PlusOutlined /> : 'Добавить оплату'}
      </Button>
      <Modal title="Добавление оплаты" 
        visible={isModalVisible} 
        onOk={() => {
          const pay = payments.reduce((sum, item) => item + sum, 0) + Number(value);
          const sum = Object.keys(basket)?.reduce( ( sum, item ) => sum + (basket[item].count * Number(basket[item].product.price?.count)), 0);
          if(sum - pay > 0) {
            dispatch(addBasketPayment(Number(value)))
            setValue(undefined);
            setIsModalVisible(false);
          }else {
            setError(true);
          } 
        }} 
        okText="Добавить"
        cancelText="Отмена"
        okButtonProps={{ disabled: !value }}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={false}
        >
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          disabled={false}
          value={value}
          className={error ? 'error-border' : ''}
          onChange={(value) => {
            setError(false);
            setValue(Number(value));
          }}
          step={0.2}/>
          <Typography.Text 
            style={{display: 'block', textAlign: 'end'}} 
            type={error ? 'danger' : 'secondary'}>
              {error ? 'Сумма оплаты превышает остаток' : '*Введите сумму'}
          </Typography.Text>
      </Modal>
    </>
  )
}

interface urlPapamsType { 
  clientId: string;
}

const Confirmation: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { clientId } = useParams<urlPapamsType>(); 
  const { basket, payments } = useSelector( (state: StateType) => state.basket ); 
  const { userData } = useSelector( (state: StateType) => state.user );
  const { applicationPost, loadingPost, errorPost } = useSelector( (state: StateType) => state.applications );
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const createAplication = () => { 
    setIsModalVisible(true);
    const products =  Object.keys(basket).map( item => ({ //Переводим корзину продуктов в удовл вид
      id: basket[item].product.id,
      total: basket[item]?.product?.price?.count,
      count: basket[item]?.count
    }));

    if (userData?.data.companyId && basket) {
      dispatch(postApplication(
        clientId, 
        products, 
        userData?.data.id,
        payments,
        setIsModalVisible,
        history,
      ))
    } 
  }

  return (
    <div className="btn-cereate-application">
      <Button 
        size="large" 
        type="primary"
        onClick={() => createAplication()}
        icon={<CheckOutlined />} 
        disabled={!(Object.keys(basket).length > 0)}>
        Создать заявку
      </Button>
      <Modal title="Регистрирование заявки" 
        visible={isModalVisible} 
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={false}
        >
          {
            loadingPost ? (
              <Spin />
            ) : ( errorPost ? (
              <Result
                status="500"
                title="500"
                subTitle={`Ошибка сервера, ${errorPost.message}`}
                extra={<Button type="primary" onClick={() => createAplication()}>Повторить</Button>}
              />
            ) : (
              <Result
                status="success"
                title={`Заявка успешно созданна под ${applicationPost?.number}`}
                subTitle="Вы будете переноправленны на страницу 'Все заявки' через 2 секунды"
              />
            ) )
          } 
      </Modal>
    </div>
  )
} 

export default Payments