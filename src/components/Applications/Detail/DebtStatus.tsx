import React, { FC } from 'react'
import { useSelector } from 'react-redux' 
import { Alert } from 'antd'

import { StateType } from '../../../redux/reducers'

const DebtStatus: FC = () => {
  const { payments, products, loadingPayments, loadingProducts } = useSelector( (state: StateType) => state.applications );

  if (loadingPayments && loadingProducts) {
    return (
      <div className="debt-status-loading">
        loading...
      </div>
    )
  }
  const productsSum = products?.reduce((a: number, {count, total}: {count: number, total: number}) => (a + count*total), 0) || 0;
  const paymentsSum = payments?.reduce((a: number, {count}: {count: number}) => (a + count), 0) || 0;
  let debt = productsSum - paymentsSum; 
  return (
    <Alert 
      message={ debt <= 0 ? 'Заявка оплачена' : 'Заявка не оплачена' }
      description={ debt <= 0 ? false : `Сумма долга состовояет: ${debt} ₽` }
      type={ debt <= 0 ? 'success' : 'warning' }
      showIcon
      closable
    />
  )
}

export default DebtStatus