import { FC, useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Input, PageHeader, Button, Popover } from 'antd'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import PutProduct from './PutProduct'
import PostProduct from './PostProduct'
import ProductList from './ProductList'

import { SlidersOutlined } from '@ant-design/icons';

import { getClientCategory } from '../../../redux/client/actions'
import { getProducts, searchProducts } from '../../../redux/product/actions'
import { StateType } from '../../../redux/reducers'

import './Products.scss' 

interface matchParams {
  category: string;
}

const Products: FC<RouteComponentProps<matchParams>> = ({ match }) => {
  const dispatch = useDispatch();  

  const { userData } = useSelector( (state: StateType) => state.user );  
  useEffect(() => {
    if(userData?.data.companyId) { 
      dispatch(getProducts(userData?.data.companyId, match.params?.category, 0, 34));
      userData?.data.companyId && dispatch(getClientCategory(userData?.data.companyId));
    } 
  }, [dispatch, userData?.data.companyId, match.params?.category]) 

  const [showModalPut, setShowModalPut] = useState(false); // Статус отображения модального окна для изменения продукта 
  const [keyProduct, setKeyProduct] = useState(''); // Ключ продукта для изменения
  const [showModalPost, setShowModalPost] = useState(false); // Статус отображения модального окна для добавления продукта
  
  return (
    <div className="product-page">
      <PageHeader
        ghost={false} 
        className="site-page-header"
        title="Товары"
      />
      <div className="product-wrapper">
        <div className="product-search">
          <Input.Search 
            placeholder="Поиск товара...."
            allowClear
            onSearch={(value) => {
              if (userData?.data.companyId) {
                if( value.length) {
                  dispatch(searchProducts(userData?.data.companyId, match.params?.category, value))
                }
                else {
                  dispatch(getProducts(userData?.data.companyId, match.params?.category, 0, 34))
                }
              } 
            }}
          />
          <Button onClick={() => setShowModalPost(true)}>
            Добавить товар 
          </Button>
        </div>

        <ProductList setShowModalPut={setShowModalPut} setKeyProduct={setKeyProduct}/>
      </div>
      <PostProduct showModal={showModalPost} setShowModal={setShowModalPost}/>
      <PutProduct keyObject={keyProduct} showModal={showModalPut} setShowModal={setShowModalPut}/> 
    </div>
  )
}

export default withRouter(Products)