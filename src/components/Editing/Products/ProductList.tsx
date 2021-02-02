import { FC, Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Col, Row , Select, Popover, Spin, Card, Popconfirm, Empty } from 'antd'
import { useParams } from 'react-router-dom' 

import { getProductslazy, deleteProducts } from '../../../redux/product/actions'
import { StateType } from '../../../redux/reducers'

import { QuestionCircleOutlined, EditOutlined, DeleteOutlined, Loading3QuartersOutlined } from '@ant-design/icons'

import './Products.scss'

const InfoProduct: FC<{ text?: string | null, code: string, manufacturer: string }> = ({text, code, manufacturer}) => { // Подробная информация о товаре
  const content = (
    <div className="product-description">
      <ul>
        <li>Производитель: <span>{manufacturer}</span></li>
        <li>Код продукта: <span>{code}</span></li> 
        <li>Описание: <span>{text || 'Описание товара пока не добавленно'}</span></li>
      </ul> 
    </div>
  )
  return (
    <Popover className="product-card-info" placement="topRight" content={content} title={false} trigger="click">
      <QuestionCircleOutlined />
    </Popover> 
  )
}

interface ProductListParmType {
  setShowModalPut: Dispatch<SetStateAction<boolean>>,
  setKeyProduct: Dispatch<SetStateAction<string>>
}

interface urlParamsType {
  category: string;
}

const ProductList: FC<ProductListParmType> = ({setShowModalPut, setKeyProduct}) => {
  const dispatch = useDispatch();
  const params = useParams<urlParamsType>();
  const { userData } = useSelector( (state: StateType) => state.user );  
  const { products, loading, error, productsLazyLoading, deleteLoading } = useSelector( (state: StateType) => state.product );
  const { filterManufacture } = useSelector( (state: StateType) => state.product );
  const onScrollList = (event: any) => { // Линивая загрузка 
    const scrollBottom = event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight;
    if (scrollBottom) { 
      userData?.data.companyId &&
        dispatch(getProductslazy(userData?.data.companyId, params?.category, Object.keys(products).length, 28, filterManufacture))
    } 
  }

  const DeleteProduct: FC<{id: string}> = ({id}) =>(
    <Popconfirm 
      title="Вы уверены, что хотите удалить товар ?"
      okText="Да"
      onConfirm={() => dispatch(deleteProducts(id))}
      cancelText="Нет">
      {deleteLoading ? <Loading3QuartersOutlined /> : <DeleteOutlined className="delete" />}
    </Popconfirm> 
  )

  const changeProduct = (id: string) => {
    setShowModalPut(true);
    setKeyProduct(id);
  } 

  if (loading){
    return (
      <Spin />
    )
  }

  if (error) (
    <>
      Ошибка....
    </>
  )

  if(!Object.keys(products).length) {
    return (
      <>
        <Empty description="Не найдено"/>
      </>
    )
  }

  return (
    <>
      <div className="product-list" onScroll={ event => onScrollList(event)}>
        <Row gutter={[15, 25]}>
          {
            Object.keys(products).map( (item) => ( 
              <Col xxl={4} xl={6} lg={6} md={8} sm={24} key={products[item].id} >
                <Card 
                  cover={
                    <img
                      alt="product-img"
                      src={products[item].avatarProduct}
                    />
                  }
                  actions={[ 
                    <EditOutlined key={products[item].id + "edit"} onClick={() => changeProduct(products[item].id)}/>,
                    <DeleteProduct id={products[item].id}/>,
                  ]}
                  > 
                    <div className="product-title" title={`${products[item].name}, ${ products[item].weight ? products[item].weight : 'NaN' } ${products[item].measure.label}`}>
                      {products[item].name}, { products[item].weight ? products[item].weight : 'NaN' } {products[item].measure.label} 
                    </div> 
                    <div className="product-price" title={products[item]?.price[0].category.label}>
                      {
                        products[item]?.price[0]?.id ? (
                          <Select defaultValue={products[item]?.price[0]?.category?.value + 0} bordered={false}> 
                            {
                              products[item].price.map((price, index) => (
                                <Select.Option value={price.category.value + index} key={price.category.value + index}>
                                  <div className="prise-option">
                                    <div className="category-client">{price.category.label}</div>
                                    <span className="count">{price.count} ₽</span>
                                  </div>
                                </Select.Option>
                              ))
                            }
                          </Select>
                        ) : (
                          <div className="price-none">
                            Цена не задана 
                          </div>
                        )
                      }
                      <InfoProduct text={products[item]?.description} 
                        code={products[item]?.code} 
                        manufacturer={products[item]?.manufacturer.name}/> 
                  </div>
                </Card> 
              </Col>
            ))
          } 
        </Row>
      </div>
      {productsLazyLoading ? <div className="lizy-loader"><Spin className="products-lazy-loading"/></div> : null}
    </>
  )
}

export default ProductList