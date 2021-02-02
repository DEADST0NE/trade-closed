import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom' 

import { DeleteOutlined, Loading3QuartersOutlined } from '@ant-design/icons'

import { PageHeader, Menu, Spin, Button, Popconfirm } from 'antd'

import { getCaregories, deleteCaregory } from '../../../redux/category/actions'
import { StateType } from '../../../redux/reducers'

import PutCategory from './PutCategory'
import PostCategory from './PostCategory'

import './Categories.scss';

const Categories: FC = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const { userData } = useSelector( (state: StateType) => state.user ); 
  useEffect(() => {
    userData?.data.companyId && dispatch(getCaregories(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  const { category, loading, deleteLoading } = useSelector( (state: StateType) => state.category );

  const DeleteProduct: FC<{categoryId: string}> = ({categoryId}) =>(
    <Popconfirm 
      title="Вы уверены, что хотите удалить категорию товара ?"
      okText="Да"
      onConfirm={() => userData?.data.companyId && dispatch(deleteCaregory(userData?.data.companyId, categoryId))}
      cancelText="Нет">
      <Button className="delete-category" type="text" icon={deleteLoading ? <Loading3QuartersOutlined /> : <DeleteOutlined className="delete" />}/>
    </Popconfirm> 
  )

  return (
    <div className="categories-wrapper-editing"> 
      <PageHeader
        ghost={false} 
        className="site-page-header"
        title="Категории"
      />
      <div className="categories-editing-list">
        {
          loading ? (
            <div className="category-loading">
              <Spin />
            </div>
          ) : (
            <Menu mode="inline" selectedKeys={[location.pathname]}>
              <Menu.Item key="/editing/all">
                <NavLink to="/editing/all">
                  <span className="category-name">Все товары</span> 
                  <span className="count">{category?.reduce((a, item) => (a + item.count), 0)}</span>
                </NavLink> 
              </Menu.Item>
              {
                category?.map(item => (
                  <Menu.Item key={`/editing/${item.value}`}>
                    <NavLink to={`/editing/${item.value}`} title={item.label}>
                      <span className="category-name">{item.label}</span> 
                      <span className="count">{item.count}</span>
                    </NavLink>
                    <PutCategory id={item.value} categoryName={item.label}/>
                    <DeleteProduct categoryId={item.value}/> 
                  </Menu.Item>
                ))
              }
              <PostCategory /> 
            </Menu> 
          )
        } 
      </div>
    </div>
  )
}

export default Categories;