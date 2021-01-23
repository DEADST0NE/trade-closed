import { FC, useEffect, useState, useMemo } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Input, PageHeader, Button, Popover, Row, Col, Checkbox, Spin } from 'antd'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import PutProduct from './PutProduct'
import PostProduct from './PostProduct'
import ProductList from './ProductList'

import { DownOutlined } from '@ant-design/icons';

import { getClientCategory } from '../../../redux/client/actions'
import { getProducts, searchProducts, productManufactureFilter } from '../../../redux/product/actions'
import { StateType } from '../../../redux/reducers'

import './Products.scss' 

import { getManufacturers } from '../../../redux/manufacture/actions'

interface matchParams {
  category: string;
}

const FilterManufacture = withRouter(({match}) => { 
  const Content = () => {
    const dispatch = useDispatch();  

    const { userData } = useSelector( (state: StateType) => state.user );  
    useEffect(() => {
      userData?.data.companyId && dispatch(getManufacturers(userData?.data.companyId));
    }, [dispatch, userData?.data.companyId]);
    const { filterManufacture } = useSelector( (state: StateType) => state.product );
    const { manufacture, loading } = useSelector( (state: StateType) => state.manufacture );  
    return (
      <>
        {
          loading ? (
            <Spin />
          ) : (
            <div className="filter-content">
              <Row gutter={[5, 10]}>
                {
                  Object.keys(manufacture).map( item => (
                    <Col span={24} key={manufacture[item].id}>
                      <Checkbox 
                        checked={filterManufacture.some(fmi => fmi === manufacture[item].id)} 
                        onChange={(event) => {
                          dispatch(productManufactureFilter(event.target.value));
                          userData?.data.companyId && dispatch(getProducts(userData?.data.companyId, match.params?.category, 0, 34, filterManufacture));
                        }} 
                        value={manufacture[item].id}>
                          {manufacture[item].name}
                      </Checkbox>
                    </Col>
                  ))
                } 
              </Row>
            </div>
          ) 
        } 
      </>
    )
  }
  const { filterManufacture } = useSelector( (state: StateType) => state.product ); 
  return (
    <Popover placement="bottom" title={false} content={<Content />} trigger="click">
      <Button size="small" type={filterManufacture.length ? "primary" : "default"}>
        <div className="title-filter">
          Производители <DownOutlined />
        </div>
      </Button>
    </Popover>
  )
})

const Products: FC<RouteComponentProps<matchParams>> = ({ match }) => {
  const dispatch = useDispatch();  
  const { filterManufacture } = useSelector( (state: StateType) => state.product );
  const { userData } = useSelector( (state: StateType) => state.user );

  useEffect(() => {
    if(userData?.data.companyId) { 
      dispatch(getProducts(userData?.data.companyId, match.params?.category, 0, 34));
      dispatch(getClientCategory(userData?.data.companyId));
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
                  dispatch(searchProducts(userData?.data.companyId, match.params?.category, value, filterManufacture))
                }
                else {
                  dispatch(getProducts(userData?.data.companyId, match.params?.category, 0, 34, filterManufacture))
                }
              } 
            }}
          />
          <Button onClick={() => setShowModalPost(true)}>
            Добавить товар 
          </Button>
        </div>
        <div className="listFilters">
          {useMemo(() => <FilterManufacture />, [])}
        </div>

        <ProductList setShowModalPut={setShowModalPut} setKeyProduct={setKeyProduct}/>
      </div>
      <PostProduct showModal={showModalPost} setShowModal={setShowModalPost}/>
      <PutProduct keyObject={keyProduct} showModal={showModalPut} setShowModal={setShowModalPut}/> 
    </div>
  )
}

export default withRouter(Products)