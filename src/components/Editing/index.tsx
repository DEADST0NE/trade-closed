import { FC } from 'react'
import { Row, Col } from 'antd';

import Categories from './Categories'
import Products from './Products'

import './Editing.scss'

const Editing: FC = () => (
  <div className="editing-page">
    <Row className="w-100" gutter={6}>
      <Col xl={4} lg={4} md={6} sm={8} xs={8} className="categories-page">
        <Categories />
      </Col>
      <Col xl={20} lg={20} md={18} sm={16} xs={16} className="products-page">
        <Products />
      </Col> 
    </Row>
  </div>
)

export default Editing