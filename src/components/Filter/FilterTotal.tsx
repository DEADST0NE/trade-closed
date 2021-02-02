import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Popover, Row, Col, Slider, Spin, Input } from 'antd'
import { DownOutlined } from '@ant-design/icons' 

import { StateType } from '../../redux/reducers'

import { getManufacturers } from '../../redux/manufacture/actions' 


const FilterTotal: FC = () => { 
  const Content = () => {
    const dispatch = useDispatch();   
    const { userData } = useSelector( (state: StateType) => state.user );  
    useEffect(() => {
      userData?.data.companyId && dispatch(getManufacturers(userData?.data.companyId));
    }, [dispatch, userData?.data.companyId]); 

    function onChange(value: [number, number]) {
      console.log('onChange: ', value);
    }
    
    function onAfterChange(value: [number, number]) {
      console.log('onAfterChange: ', value);
    }

    return (
      <>
        {
          false ? (
            <Spin />
          ) : (
            <div className="filter-content-price">
              <Row gutter={[5, 10]}>
                <Col span={12}>
                  <Input />
                </Col>
                <Col span={12}>
                  <Input />
                </Col>
                <Col span={24}>
                  <Slider
                    range
                    step={1}
                    min={1}
                    max={20}
                    defaultValue={[20, 50]}
                    onChange={onChange}
                    onAfterChange={onAfterChange}
                  />
                </Col> 
              </Row>
              <div style={{borderTop: '1px solid #efefef', paddingTop: '15px', marginLeft: '-15px', marginRight: '-15px', textAlign: 'end', paddingRight: '20px'}}>
                <Button type="primary" size="small">Применить</Button>
              </div>
            </div>
          ) 
        } 
      </>
    )
  } 
  const { filterClientCategory } = useSelector( (state: StateType) => state.product );
  return (
    <Popover placement="bottom" title={false} content={<Content />} trigger="click" >
      <Button size="small" type={filterClientCategory.length ? "primary" : "default"}>
        <div className="title-filter">
          Цена <DownOutlined />
        </div>
      </Button>
    </Popover>
  )
}

export default FilterTotal