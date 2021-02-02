import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useRouteMatch } from 'react-router-dom' 

import { PageHeader, Menu, Spin } from 'antd'

import { getCaregories } from '../../../redux/category/actions'
import { StateType } from '../../../redux/reducers'

interface matchType {
  clientId: string,
  categoryId: string
}

const Categories: FC = () => {

  const dispatch = useDispatch(); 
  const match = useRouteMatch<matchType>();
  const { userData } = useSelector( (state: StateType) => state.user );

  useEffect(() => {
    userData?.data.companyId && dispatch(getCaregories(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  const { category, loading } = useSelector( (state: StateType) => state.category );
  
  return (
    <div className="create-application-product-categories">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Категории"
      />
      <div className="categories-list">
        {
          loading ? (
            <div className="category-loading">
              <Spin />
            </div>
          ) : (
            <Menu mode="inline" selectedKeys={[match.params.categoryId]}>
              <Menu.Item key="all">
                <NavLink to={`/create-application/${match.params.clientId}/category/all/products`}>
                  <span className="category-name">Все продкуты</span> 
                  <span className="count">{category?.reduce((a, item) => (a + item.count), 0)}</span>
                </NavLink> 
              </Menu.Item>
              {
                category?.map(item => (
                  <Menu.Item key={item.value}>
                    <NavLink to={`/create-application/${match.params.clientId}/category/${item.value}/products`} title={item.label}>
                      <span className="category-name">{item.label}</span> 
                      <span className="count">{item.count}</span>
                    </NavLink> 
                  </Menu.Item>
                ))
              } 
            </Menu> 
          )
        } 
      </div>
    </div>
  )
}

export default Categories