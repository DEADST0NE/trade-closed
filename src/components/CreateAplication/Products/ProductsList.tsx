import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { PageHeader, Col, Row , Popover, Spin, Card, Button, Input} from 'antd'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

import { addBasketProduct, deleteBasketProduct } from '../../../redux/basket/actions'
import { getProductslazy, getProducts } from '../../../redux/product/actions'
import { StateType } from '../../../redux/reducers'

import { QuestionCircleOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons'

const InfoProduct: FC<{ text?: string | null }> = ({text}) => { // Подробная информация о товаре
  const noneText = 'Описание товара пока не добавленно'
  return (
    <Popover className="product-card-info" content={text ? text : noneText} title={false} trigger="click">
      <QuestionCircleOutlined />
    </Popover> 
  )
} 

interface matchParams {
  categoryId: string;
  clientId: string;
}

const ProductList: FC<RouteComponentProps<matchParams>> = ({match}) => {
  const dispatch = useDispatch(); 
  const { userData } = useSelector( (state: StateType) => state.user );
  const { products, loading, error, productsLazyLoading } = useSelector( (state: StateType) => state.product );
  const { clients } = useSelector( (state: StateType) => state.client );
  const { basket } = useSelector( (state: StateType) => state.basket );

  useEffect(() => {
    if(userData?.data.companyId) { 
      dispatch(getProducts(userData?.data.companyId, match.params?.categoryId, 0, 34));
    } 
  }, [dispatch, userData?.data.companyId, match.params?.categoryId]) 

  const onScrollList = (event: any) => { // Линивая загрузка 
    const scrollBottom = event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight;
    if (scrollBottom) { 
      userData?.data.companyId &&
        dispatch(getProductslazy(userData?.data.companyId, match.params?.categoryId, Object.keys(products).length, 28))
    } 
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
      <h1>Поиск не дал результатов</h1>
      </>
    )
  }

  interface clientPriceType {
    id: string;
    count: number;
    category: {
      value: string;
      label: string;
    };
  }

  const clientPrice = (array: clientPriceType[]) => (
    array.find((item) => (item.category.value === clients[match.params?.clientId]?.clientsCategory?.value))
  ) 
  return (
    <div className="product-list-create-application">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title="Товары"
      />
      <div className="product-search">
        <Input.Search
          placeholder="Поиск товара...."
          allowClear
          onSearch={(value) => {
            console.log(value);
          }}
        /> 
      </div>
      <div className="product-list" onScroll={ event => onScrollList(event)}>
        <Row gutter={[15, 25]}>
          {
            Object.keys(products).map( (item) => ( 
              <Col xxl={6} xl={6} lg={8} md={12} sm={24} key={products[item].id} >
                <Card 
                  cover={
                    <img
                      alt="product-img"
                      src={products[item].avatarProduct}
                    />
                  } 
                  > 
                    <div className="product-title" title={`${products[item].name}, ${ products[item].weight ? products[item].weight : 'NaN' } ${products[item].measure.label}`}>
                      {products[item].name}, { products[item].weight ? products[item].weight : 'NaN' } {products[item].measure.label}
                    </div>
                    <div className="product-price">
                      {
                        clientPrice(products[item]?.price) ? (
                          <div className="action-card">
                            <span className="price-count">{ clientPrice(products[item]?.price)?.count } ₽</span>
                            {
                              Object.keys(basket)?.some( basketItemId => basketItemId === item ) ? (
                                <div className="product-count-basket">
                                  <Button icon={<MinusOutlined />} onClick={ () => dispatch(deleteBasketProduct(item)) }/>
                                    <span className="count">
                                      {basket[item].count}
                                      <span>шт</span>
                                    </span>
                                  <Button type="primary" icon={<PlusOutlined />} 
                                    onClick={() => { dispatch(addBasketProduct({ ...products[item], price: clientPrice(products[item]?.price) })) }}
                                  />
                                </div>
                              ) : (
                                <Button type="primary" 
                                  onClick={() => { 
                                    dispatch(addBasketProduct({ ...products[item], price: clientPrice(products[item]?.price) }))
                                  }}>
                                  В корзину
                                </Button> 
                              )
                            } 
                          </div>
                        ) : ( <span className="none-price"> Для данной категории клиента цена не указана </span> )
                      }
                      <InfoProduct text={products[item]?.description}/> 
                  </div>
                </Card> 
              </Col>
            ))
          } 
        </Row>
      </div>
      {productsLazyLoading ? <div className="lizy-loader"><Spin className="products-lazy-loading"/></div> : null}
    </div>
  )
}

export default withRouter(ProductList)