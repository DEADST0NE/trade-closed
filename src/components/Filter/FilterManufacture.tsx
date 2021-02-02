import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Popover, Row, Col, Checkbox, Spin } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import { useParams } from 'react-router-dom' 

import { StateType } from '../../redux/reducers'

import { getManufacturers } from '../../redux/manufacture/actions'
import { getProducts, productManufactureFilter } from '../../redux/product/actions'


interface urlParamsType {
  categoryId: string;
}

const FilterManufacture: FC = () => { 
  const Content = () => {
    const dispatch = useDispatch();  
    const params = useParams<urlParamsType>();
    const { userData } = useSelector( (state: StateType) => state.user );  
    useEffect(() => {
      userData?.data.companyId && dispatch(getManufacturers(userData?.data.companyId));
    }, [dispatch, userData?.data.companyId]);
    const { filterManufacture, filterClientCategory } = useSelector( (state: StateType) => state.product );
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
                          userData?.data.companyId && dispatch(getProducts(userData?.data.companyId, params?.categoryId, 0, 34, filterManufacture, filterClientCategory));
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
}

export default FilterManufacture