import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Popover, Row, Col, Checkbox, Spin } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { useParams } from 'react-router-dom' 

import { StateType } from '../../redux/reducers'

import { getProducts, productClientCanegoryFilter } from '../../redux/product/actions'
import { getClientCategory } from '../../redux/client/actions'

interface urlParamsType {
  categoryId: string;
}

const FilterCategoryClient: FC = () => { 
  const Content = () => {
    const dispatch = useDispatch();  
    const params = useParams<urlParamsType>();
    console.log(params);
    const { userData } = useSelector( (state: StateType) => state.user );  
    useEffect(() => {
      userData?.data.companyId && dispatch(getClientCategory(userData?.data.companyId));
    }, [dispatch, userData?.data.companyId]);
    const { filterClientCategory, filterManufacture } = useSelector( (state: StateType) => state.product );
    const { categoryClient, loading } = useSelector( (state: StateType) => state.client );  
    return (
      <>
        {
          loading ? (
            <Spin />
          ) : (
            <div className="filter-content">
              <Row gutter={[5, 10]}>
                {
                  categoryClient.map( item => (
                    <Col span={24} key={item.value}>
                      <Checkbox 
                        checked={filterClientCategory.some(fmi => fmi === item.value)} 
                        onChange={(event) => {
                          dispatch(productClientCanegoryFilter(event.target.value));
                          userData?.data.companyId && dispatch(getProducts(userData?.data.companyId, params?.categoryId, 0, 34, filterManufacture, filterClientCategory));
                        }} 
                        value={item.value}>
                          {item.label}
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
  const { filterClientCategory } = useSelector( (state: StateType) => state.product );
  return (
    <Popover placement="bottom" title={false} content={<Content />} trigger="click">
      <Button size="small" type={filterClientCategory.length ? "primary" : "default"}>
        <div className="title-filter">
          Категория клиента <DownOutlined />
        </div>
      </Button>
    </Popover>
  )
}

export default FilterCategoryClient