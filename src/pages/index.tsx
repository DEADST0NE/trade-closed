import React, { Suspense, FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd';

import AppHeader from '../components/AppHeader'
import LoadingIndicator from '../components/generic/LoadingIndicator'
import AppSidebar from '../components/AppSidebar'

import LkPage from '../components/Lk'
import Applications from '../components/Applications'
import Clients from '../components/Clients'
import Products from '../components/Products'

import NotFoundPage from '../components/generic/NotFoundPage'

import './Pages.scss'

const Pages: FC = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <AppHeader />
    <Layout className="site-layout">
      <AppSidebar />
      <Layout className="site-layout">
        <Layout.Content> 

          <Suspense fallback={<LoadingIndicator />}>
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route path="/lk" exact>
                <LkPage />
              </Route>
              <Route path="/applications" exact>
                <Applications />
              </Route>
              <Route path="/clients" exact>
                <Clients />
              </Route>
              <Route path="/products" exact>
                <Products />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </Suspense> 

        </Layout.Content> 
      </Layout>
    </Layout> 
  </Layout>
);

export default Pages;