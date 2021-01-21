import { FC } from 'react'
import { Row, Col } from 'antd';

import Table from './Table'
import Detail from './Detail'

import './Applications.scss'

const Applications: FC = () => {
  return (
    <div className="applications-page"> 
      <Row gutter={10}>
        <Col xs={24} xl={17}>
          <Table />
        </Col>
        <Col xs={24} xl={7}>
          <Detail />
        </Col>
      </Row>
    </div> 
  )
}

export default Applications