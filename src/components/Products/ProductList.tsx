import { FC, Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import { Button, Select, Popover, Spin } from 'antd'

import Icon from '../generic/Icon' 

import { getProductslazy } from '../../redux/product/actions'
import { StateType } from '../../redux/reducers'

import { QuestionCircleOutlined, EditOutlined } from '@ant-design/icons'

import './Products.scss'

const InfoProduct: FC<{ text?: string | null }> = ({text}) => { // Подробная информация о товаре
  const noneText = 'Описание товара пока не добавленно'
  return (
    <Popover className="product-card-info" content={text ? text : noneText} title={false} trigger="click">
      <Button type="text" icon={<QuestionCircleOutlined />}/>
    </Popover> 
  )
}

interface ProductListParmType {
  setShowModalPut: Dispatch<SetStateAction<boolean>>,
  setKeyProduct: Dispatch<SetStateAction<string>>
}

const ProductList: FC<ProductListParmType> = ({setShowModalPut, setKeyProduct}) => {
  const dispatch = useDispatch();

  const { userData } = useSelector( (state: StateType) => state.user );  
  const { products, loading, error, productsLazyLoading } = useSelector( (state: StateType) => state.product );

  const onScrollList = (event: any) => { // Линивая загрузка
    const scrollBottom = event.target.scrollTop + 
          event.target.offsetHeight === event.target.scrollHeight;
  
    if (scrollBottom) 
    userData?.data.companyId && dispatch(getProductslazy(userData?.data.companyId, Object.keys(products).length, 28))
  }

  const changeProduct = (id: string) => {
    setShowModalPut(true);
    setKeyProduct(id);
  } 

  if (loading) {
    return <Spin />
  }

  if (error) {
    return (
      <>
        Ошибка....
      </>
    )
  }

  return (
    <>
      <div className="product-list" onScroll={ event => onScrollList(event)}>
        {
          Object.keys(products).map( (item) => (
            <div className="product-cart" key={products[item].id}> 
              <div className="product-cart-wrapper"> 
                <div className="product-cart-header">
                  <div className="product-img">
                    {
                      products[item].avatarProduct ? (
                        <img alt="example" src={products[item].avatarProduct} />
                      ) : (
                        <div className="no-img">
                          <Icon name="no-img-color"/>
                        </div>
                      )
                    } 
                  </div>
                </div>
                <div className="product-cart-body">
                  <div className="product-title" title={`${products[item].name}, ${ products[item].weight ? products[item].weight : 'NaN' } ${products[item].measure.label}`}>
                    {products[item].name}, { products[item].weight ? products[item].weight : 'NaN' } {products[item].measure.label}
                  </div> 
                  <div className="product-price">
                    {
                      products[item]?.price[0]?.id ? (
                        <Select defaultValue={products[item]?.price[0].category.value + 0} bordered={false}> 
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
                  </div>
                </div>
                <div className="product-cart-footer">

                </div>
              </div>
              <InfoProduct text={products[item]?.description}/>
              <div className="product-card-change">
                <Button type="text" onClick={() => changeProduct(products[item].id)} icon={<EditOutlined />}/> 
              </div>
            </div>
          ))
        } 
      </div>
      {productsLazyLoading ? <Spin className="products-lazy-loading"/> : null}
    </>
  )
}

export default ProductList