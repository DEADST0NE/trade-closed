import { FC, useState, Suspense, useEffect } from 'react'
import { Steps, PageHeader, Spin } from 'antd';
import { NavLink } from "react-router-dom";
import { Switch, Route, withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import Products from './Products';
import Confirmation from './Confirmation'
import Payment from './Payment'
import Clients from './Clients'

import './CreateAplication.scss'

const steps = [
  {
    title: 'Клиент',
    url: '/create-application',
    description: "Выбор клиента"
  },
  {
    title: 'Товар',
    url: '/create-application/:clientId/category/:categoryId?/products',
    description: "Выбор товара"
  },
  {
    title: 'Оплата',
    url: '/create-application/client/product/payment',
    description: "Указание оплаты"
  }, 
  {
    title: 'Подтверждение',
    url: '/create-application/client/product/payment/registration',
    description: "Регистрирование заявки"
  },
];

const CreateAplication: FC<RouteComponentProps> = ({ location, match }) => {
  const [current, setCurrent] = useState(0);
  
  useEffect( () => {
    const lastPath = location.pathname.split('/').pop();
    setCurrent(steps.findIndex( item => item.url.split('/').pop() === lastPath ));
  }, [setCurrent, location])

  return (
    <div className="create-application-page">

      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        className="site-page-header"
        title="Создание заявки"
      />
      <div className="create-application-wrapper">
        <Steps current={current} size="small" >
          {steps.map((item, index) => (
            <Steps.Step key={item.title} onClick={() => setCurrent(index)} title={
              <NavLink to={item.url}>
                {item.title}
              </NavLink>
            } description={item.description} />
          ))}
        </Steps>
      </div> 
      <div className="create-application-body"> 
        <Suspense fallback={<Spin />}>
          <Switch> 
            <Route path="/create-application/" exact>
              <Clients />
            </Route>
            <Route path="/create-application/:clientId/category/:categoryId?/products" exact>
              <Products />
            </Route>
            <Route path="/create-application/:clientId/products/:categoryId/payment/" exact>
              <Payment />
            </Route>
            <Route path="/create-application/:clientId/products/:categoryId/payment/confirmation/" exact>
              <Confirmation />
            </Route> 
          </Switch>
        </Suspense> 

      </div> 

    </div>
  )
}

export default withRouter(CreateAplication)