import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, PageHeader, Button, Popconfirm, Table, InputNumber, Modal, Spin, Result, message, Progress } from 'antd'
import { useHistory, useParams } from 'react-router-dom'

import { MinusOutlined, PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons'

import Icon from '../../generic/Icon'

import { addBasketProduct, deleteBasketProduct, clearBasketProduct, changeBasketPayment, deleteItemBasketProduct } from '../../../redux/basket/actions'
import { postApplication } from '../../../redux/applications/actions'
import { StateType } from '../../../redux/reducers'

import { AslignType } from './types'

const BasketPageTitle = () => {
  const dispatch = useDispatch();
  const { basket } = useSelector( (state: StateType) => state.basket );
  const history = useHistory();
  return (
    <>
      <span> Мой заказ </span>
      {
        Object.keys(basket).length ? (
          <Popconfirm
            placement="topRight"
            title="Вы уверенны что хотите отменить заявку ?"
            onConfirm={() => {
              dispatch(clearBasketProduct());
              dispatch(changeBasketPayment(0));
              history.push('/create-application');
            }}
            okText="Да"
            cancelText="Нет"
          >
            <Button className="clear-basket" type="text" icon={<CloseOutlined className="delete"/>}/>
          </Popconfirm>
        ) : null
      } 
    </> 
  )
}

const columns = [
  {
    title: '№',
    dataIndex: 'number',
    align: 'center' as AslignType,
    width: 2,
  }, 
  {
    title: '',
    dataIndex: 'img',
    align: 'center' as AslignType,
    width: 8,
  }, 
  {
    title: 'Наименование',
    dataIndex: 'productName',
    width: 40,
  },
  {
    title: 'Количество',
    dataIndex: 'count',
    align: 'center' as AslignType,
    width: 10,
  },
  {
    title: 'Ед. из',
    dataIndex: 'measure',
    align: 'center' as AslignType,
    width: 10,
  }, 
  {
    title: 'Цена',
    dataIndex: 'total',
    align: 'center' as AslignType,
    width: 10,
  }, 
  {
    title: 'Сумма',
    dataIndex: 'sumTotal',
    align: 'center' as AslignType,
    width: 10, 
  },
  {
    title: 'Оплаченно',
    dataIndex: 'pay',
    align: 'center' as AslignType,
    width: 10, 
  }, 
  {
    title: 'Остаток',
    dataIndex: 'remainder',
    align: 'center' as AslignType,
    width: 10, 
  },
  {
    title: '',
    dataIndex: 'delete',
    align: 'center' as AslignType,
    width: 5, 
  }
];

const CountProduct: FC<{item: string}> = ({item}) => {
  const dispatch = useDispatch();
  
  const { basket } = useSelector( (state: StateType) => state.basket ); 
  return (
    <div className="quantity-wrapper">
      <div className="resize-quantity">
        <Button icon={ basket[item]?.count === 1 ? <DeleteOutlined /> : <MinusOutlined />} onClick={() => dispatch(deleteBasketProduct(item))}/> 
          <span>{basket[item]?.count}</span>
        <Button icon={<PlusOutlined />} type="primary" onClick={() => dispatch(addBasketProduct(basket[item]?.product))}/> 
      </div> 
    </div>
  )
}

const DeleteProduct: FC<{ item: string }> = ({item}) => {
  const dispatch = useDispatch(); 
  return (
    <Popconfirm
      placement="topRight"
      title="Вы уверенны что хотите удалить товар ?"
      onConfirm={() => {
        dispatch(deleteItemBasketProduct(item));
      }}
      okText="Да"
      cancelText="Нет"
    >
      <DeleteOutlined className="delete"/>
    </Popconfirm>
  )
}

interface urlPapamsType {
  categoryId: string;
  clientId: string;
}

const Confirmation: FC<{disabled: boolean}> = ({ disabled }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { clientId } = useParams<urlPapamsType>(); 
  const { basket, payments } = useSelector( (state: StateType) => state.basket ); 
  const { userData } = useSelector( (state: StateType) => state.user );
  const { applicationPost, loadingPost, errorPost } = useSelector( (state: StateType) => state.applications );
  const [ isModalVisible, setIsModalVisible ] = useState(false);

  const createAplication = () => { 
    setIsModalVisible(true);
    const products =  Object.keys(basket).map( item => ({ //Переводим корзину продуктов в удовл вид
      id: basket[item].product.id,
      total: basket[item]?.product?.price?.count,
      count: basket[item]?.count
    }));

    if (userData?.data.companyId && basket) {
      dispatch(postApplication(
        clientId, 
        products, 
        userData?.data.id,
        payments,
        setIsModalVisible,
        history,
      ))
    } 
  }

  return (
    <div className="btn-cereate-application">
      <Button 
        size="large" 
        type="primary"
        onClick={() => createAplication()} 
        disabled={!(Object.keys(basket).length > 0) && disabled}>
        Создать заявку
      </Button>
      <Modal title="Регистрирование заявки" 
        visible={isModalVisible} 
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={false}
        >
          {
            loadingPost ? (
              <Spin />
            ) : ( errorPost ? (
              <Result
                status="500"
                title="500"
                subTitle={`Ошибка сервера, ${errorPost.message}`}
                extra={<Button type="primary" onClick={() => createAplication()}>Повторить</Button>}
              />
            ) : (
              <Result
                status="success"
                title={`Заявка успешно созданна под ${applicationPost?.number}`}
                subTitle="Вы будете переноправленны на страницу 'Все заявки' через 2 секунды"
              />
            ) )
          } 
      </Modal>
    </div>
  )
} 

const ProductName: FC<{item: string}> = ({ item }) => {
  const { basket } = useSelector( (state: StateType) => state.basket );
  return (
    <div className="product-name">
      {basket[item].product.name}
      {
        basket[item].ditailPayProcent ? (
          <div className="ditail-pay">
            <Icon name="money" />
            <Progress percent={basket[item].ditailPayProcent} />
          </div>
        ) : null
      }
    </div>
  )
}


const BasketItems: FC = () => {
  const dispatch = useDispatch(); 
  const { basket, payments } = useSelector( (state: StateType) => state.basket ); 
  const [payInputError, setPayInputError] = useState(false);
  const dataSource = Object.keys(basket).map( (item, index) => ({
    key: basket[item].product.id, 
    number: 1 + index,
    img: <Avatar src={basket[item].product.avatarProduct} />,
    productName: <ProductName item={item}/>,
    count: <CountProduct item={item}/>,
    measure: basket[item].product.measure.label,
    total: `${basket[item].product.price?.count} ₽`,
    sumTotal: `${basket[item].count * Number(basket[item].product.price?.count)} ₽`,
    pay: `${basket[item].ditailPayCount || 0} ₽`,
    remainder: `${basket[item].count * Number(basket[item].product.price?.count)} ₽`,
    delete: <DeleteProduct item={item} />
  }) )

  return (
    <div className="confirmation-basket">
      <PageHeader
        ghost={false} 
        className="page-header-create-application"
        title={<BasketPageTitle />}
      /> 
      <div className="basket-list">
        <Table
          className="ditails-debt"
          size="middle"
          pagination={false}
          columns={columns} 
          dataSource={dataSource}
          scroll={{ y: 240 }}
          />
      </div>
      <TableFooter />
      <div className="confirmation-basket-result">
        <div className="pay">
          Оплачено: 
          <InputNumber 
            size="small" 
            value={payments} 
            onChange={(value) => {
              setPayInputError(false);
              if(Number(value) >= 0) {
                if (Object.keys(basket).reduce( (sum, item) => (sum = sum + (basket[item].count * Number(basket[item].product.price?.count))), 0 ) >= Number(value)) {
                  dispatch(changeBasketPayment(Number(value)))
                } else {
                  message.error('Оплата больше превышает сумму товаров');
                }
              }else {
                message.error('Оплата меньше нуля');
              }
            }} />
          <span>₽</span>
        </div>
        <div className="total">
          Остаток к оплате: 
          <span>
            {
              Object.keys(basket).reduce((sum, item) => (sum = sum + (basket[item].count * Number(basket[item].product.price?.count))), 0) -
              payments
            } ₽
          </span>
        </div>
        <Confirmation disabled={payInputError}/>
      </div>
    </div>
  )
}

const TableFooter = () => {
  const { basket } = useSelector( (state: StateType) => state.basket ); 
  return (
    <div className="sum-total-product">
      Итого: 
      <span>
        {Object.keys(basket).reduce( (sum, item) => (sum = sum + (basket[item].count * Number(basket[item].product.price?.count))), 0 )} ₽
      </span>
    </div>
  )
}

export default BasketItems;