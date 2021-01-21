import { Suspense, FC } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd';

import AppHeader from '../components/AppHeader'
import LoadingIndicator from '../components/generic/LoadingIndicator'
import AppSidebar from '../components/AppSidebar'

import LkPage from '../components/Lk'
import ApplicationsPage from '../components/Applications'
import ClientsPage from '../components/Clients'
import EditingPage from '../components/Editing'
import CreateAplicationPage from '../components/CreateAplication'
import ManufacturePage from '../components/Manufacture'

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
              <Redirect from="/" to="/applications" exact />
              <Route path="/lk" exact>
                <LkPage />
              </Route>
              <Route path="/applications" exact>
                <ApplicationsPage />
              </Route>
              <Route path="/clients" exact>
                <ClientsPage />
              </Route>
              <Route path="/manufacturers" exact>
                <ManufacturePage />
              </Route>
              <Route path="/editing/:category?" exact>
                <EditingPage />
              </Route>
              <Route path="/create-application">
                <CreateAplicationPage />
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