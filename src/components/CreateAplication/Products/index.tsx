import { FC } from 'react'
import { Row, Col } from 'antd'

import ProductList from './ProductsList'
import Basket from './Basket'
import Categories from './Categories'

const Products:FC = () => {
  return (
    <div className="create-application-products-body">
      <Row gutter={[15,10]}>
        <Col xs={4}>
          <Categories />
        </Col>
        <Col xs={15}>
          <ProductList />
        </Col>
        <Col xs={5}>
          <Basket />
        </Col> 
      </Row> 
    </div>
  )
}

export default Products