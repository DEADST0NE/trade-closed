import { FC, useState, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Steps, PageHeader, Spin } from 'antd'
import { Switch, Route, useLocation } from 'react-router-dom' 

import Products from './Products';
import Confirmation from './Confirmation' 
import Clients from './Clients'

import { getClient } from '../../redux/client/actions' 
import { StateType } from '../../redux/reducers' 

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
    title: 'Подтверждение',
    url: '/create-application/client/product/confirmation',
    description: "Регистрирование заявки"
  },
];

const CreateAplication: FC = () => {
  const dispatch = useDispatch(); 
  const location = useLocation();
  const [current, setCurrent] = useState(0);
  
  useEffect( () => {
    const lastPath = location.pathname.split('/').pop();
    setCurrent(steps.findIndex( item => item.url.split('/').pop() === lastPath ));
  }, [setCurrent, location]);

  const { userData } = useSelector( (state: StateType) => state.user );
  useEffect(() => {
    userData?.data.companyId && dispatch(getClient(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  return (
    <div className="create-application-page">

      <div className="create-application-header">
        <PageHeader
          ghost={false}
          onBack={() => window.history.back()}
          className="site-page-header"
          title="Создание заявки"
        />
        <div className="create-application-stap">
          <Steps current={current} size="small">
            {steps.map((item, index) => (
              <Steps.Step key={item.title} title={item.title} description={item.description} />
            ))}
          </Steps>
        </div> 
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
            <Route path="/create-application/:clientId/category/:categoryId?/products/confirmation" exact>
              <Confirmation />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </div>
  )
}

export default CreateAplication