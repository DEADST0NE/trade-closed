import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Empty } from 'antd'

import ModalPaymentAdd from './ModalPaymentAdd'
import Products from './Products'
import Payments from './Payments'
import DebtStatus from './DebtStatus'
import Stages from './Stages'

import { StateType } from '../../../redux/reducers'
import './ApplicationDetail.scss'

const ApplicationDetail: FC = () => {
  const { detailInfo } = useSelector( (state: StateType) => state.applications ); 

  if(!detailInfo){
    return (
      <div className="application-detail-no-data">
        <Empty description={false} />
      </div> 
    )
  }

  return (
    <div className="application-detail">
      <div className="application-header">
        <div className="number">
          № {detailInfo?.number}
          <span className="date">
            Дата заказа:
            <span> {detailInfo?.date?.date} </span>
          </span>
        </div>
        <div className="stages">
          <Stages />
        </div>
      </div>
      <div className="application-body">

        <DebtStatus />

        <p className="title">
          Персональные данные
        </p>
        <ul className="client-data mb-5">
          <li>
            Фио:<span>{detailInfo?.clientName}</span>
          </li>
          <li>
            Email:<span>{detailInfo?.clientEmail}</span>
          </li>
          <li>
            Адрес:<span>{detailInfo?.clientAddress}</span>
          </li> 
          <li>
            Телефон:<span>{detailInfo?.clientTel1}</span>
          </li>
        </ul>

        <p className="title">
          Список товаров
        </p>
        <Products />

        <p className="title">
          Список оплат
          <ModalPaymentAdd />
        </p>
        <Payments />

      </div>
      <div className="application-footer"> 
      </div>
    </div>
  )
}

export default ApplicationDetail