import { FC } from 'react'
import { Row, Col } from 'antd'

import ProductList from './ProductsList'
import Basket from './Basket'
import Categories from './Categories'

const Products:FC = () => {
  return (
    <div className="create-application-products">
      <Row className="products-row" gutter={[10, 10]}>
        <Col className="products-col" xxl={4} xl={4} lg={4} md={6} sm={24}>
          <Categories />
        </Col>
        <Col className="products-col" xxl={16} xl={14} lg={13} md={10} sm={24}>
          <ProductList />
        </Col>
        <Col className="products-col" xxl={4} xl={6} lg={7} md={8} sm={24}>
          <Basket />
        </Col> 
      </Row> 
    </div>
  )
}

export default Products