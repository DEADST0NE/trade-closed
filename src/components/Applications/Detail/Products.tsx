import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Scrollbars } from 'react-custom-scrollbars'

import { List, Avatar, Row, Col } from 'antd';

import { getProducts } from '../../../redux/applications/actions'
import { StateType } from '../../../redux/reducers'

const Products: FC = () => {
  const dispatch = useDispatch(); 
  const { detailInfo, products, loadingProducts } = useSelector( (state: StateType) => state.applications ); 

  useEffect(() => {
    detailInfo?.id && dispatch(getProducts(detailInfo.id));
  }, [dispatch, detailInfo?.id])

  const Footer = () => (
    <div className="product-total">
      <span>Общая стоимость:</span>
      { products?.reduce((a: number, {count, total}: {count: number, total: number}) => (a + count*total), 0) } ₽
    </div>
  )

  return (
    <div className="products-list mb-3">
      <List 
        loading={loadingProducts}
        pagination={false}
        footer={<Footer />}
      >
        <Scrollbars autoHeight autoHeightMax={200}>
        {
          products?.map((item) => (
            <List.Item key={item.id + 'wqwq'}>
              <Row gutter={24}>
                <Col className="photo" xl={5} xxl={3}>
                  <Avatar />
                </Col>
                <Col className="name" xl={8} xxl={12}>
                  {item.productName}
                </Col>
                <Col className="cout" xl={5} xxl={4}>
                  {item.count} шт
                </Col>
                <Col className="total" xl={6} xxl={5}>
                  {item.total} ₽
                </Col>
              </Row> 
            </List.Item>
          ))
        }
        </Scrollbars> 
      </List>
    </div>
  )
}

export default Products