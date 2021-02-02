import { FC, useEffect, useState, useMemo } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Input, PageHeader, Button } from 'antd'
import { useParams } from 'react-router-dom' 

import PutProduct from './PutProduct'
import PostProduct from './PostProduct'
import ProductList from './ProductList'
import FilterCategoryClient from '../../Filter/FilterCategoryClient';
import FilterManufacture from '../../Filter/FilterManufacture'

import { getClientCategory } from '../../../redux/client/actions'
import { getProducts, searchProducts } from '../../../redux/product/actions'
import { StateType } from '../../../redux/reducers'

import './Products.scss'  

interface urlParamsType {
  categoryId: string;
} 

const Products: FC = () => {
  const dispatch = useDispatch();
  const params = useParams<urlParamsType>();
  const { filterManufacture } = useSelector( (state: StateType) => state.product );
  const { userData } = useSelector( (state: StateType) => state.user );

  useEffect(() => {
    if(userData?.data.companyId) { 
      dispatch(getProducts(userData?.data.companyId, params?.categoryId, 0, 34));
      dispatch(getClientCategory(userData?.data.companyId));
    }
  }, [dispatch, userData?.data.companyId, params?.categoryId])

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
                  dispatch(searchProducts(userData?.data.companyId, params?.categoryId, value, filterManufacture))
                }
                else {
                  dispatch(getProducts(userData?.data.companyId, params?.categoryId, 0, 34, filterManufacture))
                }
              } 
            }}
          />
          <Button onClick={() => setShowModalPost(true)}>
            Добавить товар 
          </Button>
        </div>
        <div className="listFilters">
          {useMemo(() => (
            <>
              <FilterManufacture />
              <FilterCategoryClient /> 
            </>
          ), [])}
        </div>

        <ProductList setShowModalPut={setShowModalPut} setKeyProduct={setKeyProduct}/>
      </div>
      <PostProduct showModal={showModalPost} setShowModal={setShowModalPost}/>
      <PutProduct keyObject={keyProduct} showModal={showModalPut} setShowModal={setShowModalPut}/> 
    </div>
  )
}

export default Products