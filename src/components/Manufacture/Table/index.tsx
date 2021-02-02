import { FC, useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Table, Input, Button, Popconfirm, Spin } from 'antd'

import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import ModalManufacturePost from './ModalManufacturePost'
import ModalManufacturePut from './ModalManufacturePut'

import { getManufacturers, deleteManufacture, lazyManufacturers, searchManufacturers } from '../../../redux/manufacture/actions' 
import { StateType } from '../../../redux/reducers'

import { AslignType } from './types'

const columns = [
  {
    title: '№',
    dataIndex: 'number',
    width: 15,
    sorter: (a :any, b :any) => a.number - b.number,
  },
  {
    title: 'Наименование производителя',
    dataIndex: 'name',
    width: 50,
    sorter: (a :any, b :any) => a.name - b.name,
  }, 
  {
    title: 'Телефон',
    dataIndex: 'phone',
    align: 'center' as AslignType,
    width: 40,
    sorter: (a :any, b :any) => a.phone - b.phone,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    align: 'center' as AslignType,
    width: 40,
    sorter: (a :any, b :any) => a.email - b.email,
  },  
  {
    title: 'Адресс',
    dataIndex: 'address',
    align: 'center' as AslignType,
    width: 40,
    sorter: (a :any, b :any) => a.address - b.address,
  }, 
  {
    title: 'Количество товаров',
    dataIndex: 'productNumber',
    align: 'center' as AslignType,
    width: 30,
    sorter: (a :any, b :any) => a.productNumber - b.productNumber,
  }, 
  {
    title: '',
    dataIndex: 'edit',
    align: 'center' as AslignType,
    width: 8, 
  }, 
  {
    title: '',
    dataIndex: 'delete',
    align: 'center' as AslignType,
    width: 8, 
  }
];

const ManufactureTable: FC = () => { 
  const dispatch = useDispatch();  

  const { userData } = useSelector( (state: StateType) => state.user );  
  useEffect(() => {
    userData?.data.companyId && dispatch(getManufacturers(userData?.data.companyId, 0, 50));
  }, [dispatch, userData?.data.companyId]); 

  const { manufacture, loading, error, lazyLoading } = useSelector( (state: StateType) => state.manufacture );

  useEffect(() => {
    const node = document.querySelector<HTMLElement>(".manufacture-page .ant-table-body");
    const lazy = () => { 
      if(node) {
        const perc = (node.scrollTop / (node.scrollHeight - node.clientHeight)) * 100;
        if (perc === 100) {
          userData?.data.companyId && dispatch(lazyManufacturers(userData?.data.companyId, Object.keys(manufacture).length, 50))
        }
      }
    }
    if (node) {
      node.removeEventListener("scroll", lazy);
      node.addEventListener("scroll", lazy);
    }
  }, [dispatch, userData?.data.companyId, manufacture]); 

  const [showPutModal, setShowPutModal] = useState(false);
  const [keyPut, setKeyPut] = useState('');

  if(error) {
    return (
      <div className="manufactur-table">
        Error
      </div>
    );
  }

  const dataSource = Object.keys(manufacture).map((item, index) => ({
    key: manufacture[item].id,
    number:  1 + index, 
    name: manufacture[item].name,
    email: manufacture[item].email,
    phone: manufacture[item].phone,
    address: manufacture[item].address,
    productNumber: manufacture[item].productNumber || "-",
    edit: <Button className="btn-edit" type='text' icon={<EditOutlined />} onClick={() => {
      setKeyPut(item);
      setShowPutModal(true);
    }}/>,
    delete: <Popconfirm
              title="Вы уверены, что хотите удалить производителя ?"
              okText="Да"
              cancelText="Нет"
              onConfirm={() => { 
                if(manufacture[item].id)
                  dispatch(deleteManufacture(manufacture[item].id))
              }}>
                <Button className="btn-delete" type='text' icon={<DeleteOutlined color="red"/>}/>
            </Popconfirm>
  }));  
  return (
    <div className="manufactur-table">
      <div className="manufactur-search-wrapper">
        <Input.Search
          placeholder="Поиск производителя...." 
          allowClear
          onChange={(event) => {
            if ( event.target.value.length === 0 ) {
              userData?.data.companyId && dispatch(getManufacturers(userData?.data.companyId, 0, 50));
            }
          }}
          onSearch={(value) => {
            if(value.length >= 1){
              userData?.data.companyId && dispatch(searchManufacturers(userData?.data.companyId, value));
            }
          }} 
        />
        <ModalManufacturePost />
      </div> 
      <Table
        loading={loading}
        columns={columns} 
        dataSource={dataSource} 
        pagination={false} 
        scroll={{ y: 240, scrollToFirstRowOnChange: false }}
      />
      {  lazyLoading ? <div className="lizy-loader"><Spin className="manufactur-lazy-loading"/></div> : null  }
      <ModalManufacturePut setShowModal={setShowPutModal} showModal={showPutModal} id={keyPut}/>
    </div>
  )
}

export default ManufactureTable