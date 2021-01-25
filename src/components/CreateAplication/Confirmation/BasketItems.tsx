import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Row, Col, Avatar, PageHeader, Button, Popconfirm, Empty } from 'antd'

import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import { addBasketProduct, deleteBasketProduct, clearBasketProduct } from '../../../redux/basket/actions'

import { StateType } from '../../../redux/reducers'

const BasketPageTitle = () => {
  const dispatch = useDispatch();
  const { basket } = useSelector( (state: StateType) => state.basket ); 
  return (
    <>
      <span> Мой заказ </span>
      {
        Object.keys(basket).length ? (
          <Popconfirm
            placement="topRight"
            title="Вы уверенны что хотитте отчистить корзину ?"
            onConfirm={() => dispatch(clearBasketProduct())}
            okText="Да"
            cancelText="Нет"
          >
            <Button className="clear-basket" type="text" icon={<DeleteOutlined />}/>
          </Popconfirm>
        ) : null
      } 
    </> 
  )
}

const BasketItems: FC = () => {
  const dispatch = useDispatch(); 
  const { basket } = useSelector( (state: StateType) => state.basket ); 
  return (
    <div className="confirmation-basket">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title={<BasketPageTitle />}
      /> 
      {
        Object.keys(basket).length ? (
          <>
            <div className="basket-list">
              <List pagination={false}> 
                {
                  Object.keys(basket)?.map((item) => (
                    <List.Item key={basket[item].product.id + 'basket'}>
                      <Row gutter={[20, 10]}>
                        <Col className="product-img" xl={5} xxl={2}>
                          <Avatar shape="square" src={basket[item].product.avatarProduct}/>
                        </Col>
                        <Col className="name" xl={8} xxl={13} title={basket[item].product.name}>
                          {basket[item].product.name}
                        </Col>
                        <Col className="quantity" xl={5} xxl={4}>
                          <div className="quantity-wrapper">
                            <div className="resize-quantity">
                              <Button icon={<PlusOutlined />} onClick={() => dispatch(addBasketProduct(basket[item].product))}/>
                                <span>{basket[item].count} {basket[item].product.measure.label}</span>
                              <Button icon={ basket[item].count === 1 ? <DeleteOutlined /> : <MinusOutlined />} onClick={() => dispatch(deleteBasketProduct(item))}/>
                            </div> 
                          </div>
                        </Col>
                        <Col className="count" xl={6} xxl={5}>
                          {basket[item].product.price?.count} ₽
                        </Col> 
                      </Row>
                      
                    </List.Item>
                  ))
                } 
              </List>
            </div>
            <div className="basket-total">
                Итого: 
                <span>
                  { Object.keys(basket)?.reduce( ( sum, item ) => sum + (basket[item].count * Number(basket[item].product.price?.count)), 0) } ₽
                </span>
            </div> 
          </>
        ) : (
          <div className="empty-cart">
            <Empty description=""/>
          </div> 
        )
      } 
    </div>
  )
}

export default BasketItems;