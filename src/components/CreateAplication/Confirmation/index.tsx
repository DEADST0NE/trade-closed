import { FC } from "react"
import { Row, Col } from 'antd' 
import BasketItems from './BasketItems'
//import Payments from './Payments'
import ClientInfo from './ClientInfo'

import './Confirmation.scss'

const Confirmation: FC = () => {

  return (
    <div className="create-application-confirmation"> 
      <div className="create-application-confirmation-body">
      <Row className="confirmation-row" gutter={[10, 10]}> 
        <Col className="confirmation-col" xxl={4} xl={5} lg={7} md={7}>
          <ClientInfo /> 
        </Col>
        <Col className="confirmation-col" xxl={20} xl={12} lg={10} md={10}>
          <BasketItems />
        </Col>  
        {/* <Col className="confirmation-col" xxl={6} xl={7} lg={7} md={7}>
          <Payments /> 
        </Col> */}
      </Row> 
      </div>
    </div>
  )
}

export default Confirmation