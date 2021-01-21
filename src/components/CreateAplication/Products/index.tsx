import { FC } from 'react'
import { Row, Col } from 'antd'

import ProductList from './ProductsList'
import Basket from './Basket'
import Categories from './Categories'

const Products:FC = () => {
  return (
    <div className="create-application-products-body">
      <Row gutter={[5,10]}>
        <Col xs={3}>
          <Categories />
        </Col>
        <Col xs={17}>
          <ProductList />
        </Col>
        <Col xs={4}>
          <Basket />
        </Col> 
      </Row> 
    </div>
  )
}

export default Products