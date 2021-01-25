import { FC } from "react"
import { Row, Col } from 'antd'

import ClientInfo from './ClientInfo'
import BasketItems from './BasketItems'
import Payments from './Payments'

import './Confirmation.scss'

const Confirmation: FC = () => {

  return (
    <div className="create-application-confirmation"> 
      <div className="create-application-confirmation-body">
      <Row className="confirmation-row" gutter={[10, 10]}>
        <Col className="confirmation-col" xxl={4} xl={4} lg={4} md={6} sm={24}>
          <ClientInfo />
        </Col>
        <Col className="confirmation-col" xxl={10} xl={14} lg={13} md={10} sm={24}>
          <BasketItems />
        </Col>
        <Col className="confirmation-col" xxl={10} xl={6} lg={7} md={8} sm={24}>
          <Payments />
        </Col> 
      </Row> 
      </div>
    </div>
  )
}

export default Confirmation