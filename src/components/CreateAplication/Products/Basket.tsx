import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List, Row, Col, Avatar, PageHeader } from 'antd'


import { ShoppingCartOutlined, PlusOutlined } from '@ant-design/icons'

import { StateType } from '../../../redux/reducers'

const Basket: FC = () => {

  const { basket } = useSelector( (state: StateType) => state.basket );

  return (
    <div className="basket-create-application">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Корзина"
      />
      <div className="basket-list">
        <List pagination={false}> 
          {
            Object.keys(basket)?.map((item) => (
              <List.Item key={basket[item].product.id + 'basket'}>
                <Row gutter={24}>
                  <Col className="product-img" xl={5} xxl={3}>
                    <Avatar src={basket[item].product.avatarProduct}/>
                  </Col>
                  <Col className="name" xl={8} xxl={12}>
                    {basket[item].product.name}
                  </Col>
                  <Col className="quantity" xl={5} xxl={4}>
                    {basket[item].count} шт
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
    </div>
  )
}

export default Basket