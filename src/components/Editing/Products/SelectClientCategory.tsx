import { useState, FC, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select, Divider, Input, Button, Popconfirm } from 'antd'

import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'

import { getClientCategory, postClientCategory, deleteClientCategory } from '../../../redux/client/actions'

import { StateType } from '../../../redux/reducers'

const SelectClientCategory: FC<{selectedvalue: any}> = (props) => {
  const dispatch = useDispatch();
  const { userData } = useSelector( (state: StateType) => state.user ); 
  useEffect(() => {
    userData?.data.companyId && dispatch(getClientCategory(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  const { categoryClient, categoryClientLoading } = useSelector( (state: StateType) => state.client );
  
  const [ addValue, setAddValue ] = useState('');
  const [ openS, setOpenS ] = useState(false);  
  const [ openP, setOpenP ] = useState(false); 
  const status = useRef(false);
  
  const addItem = (): void => {
    if(userData?.data.companyId && addValue)
      dispatch(postClientCategory(userData?.data.companyId, addValue, setAddValue))
  };
  
  return (
    <Select
      {...props}
      className="select-client-category" 
      showSearch
      style={{ width: '100%' }} 
      placeholder="Категория клиента" 
      loading={categoryClientLoading}
      disabled={categoryClientLoading}
      open={openS || status.current}
      onDropdownVisibleChange={(o) => {
        setOpenS(o);
      }}
      dropdownRender={menu => (
        <div> 
          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
            <Input 
              value={addValue}
              disabled={categoryClientLoading}
              style={{ height: '25px' }}
              onChange={(event) => setAddValue(event.target.value)}
            />
            <Button
              style={{ height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              icon={<PlusOutlined />}
              onClick={() => { addItem() }}
              disabled={!userData?.data.companyId && !addValue && categoryClientLoading}
              title='Добавить категорию клиента'
            /> 
          </div>
          <Divider style={{ margin: '4px 0' }} /> 
          {menu}  
        </div>
      )}
    > 
      {categoryClient?.map((item) => (
        <Select.Option disabled={openP || props?.selectedvalue?.some( (formItem: any) => formItem ? formItem.categoryClient === item.value : false)}
          className="option-client-category"
          key={item.value} 
          value={item.value}>
          {item.label}
          <Popconfirm
            title="Вы уверены, что хотите удалить эту категорию?"
            onConfirm={() => { 
              if(item.value && userData?.data.companyId)
                dispatch(deleteClientCategory(item.value, userData?.data.companyId, setOpenS))
            }}
            onVisibleChange={(s) => {
              status.current = s; 
              setOpenP(s); 
            }}
            okText="Да"
            cancelText="Нет"
            onCancel={() => setOpenS(false)}
          >
            <Button style={{padding: '0', zIndex: 10}} title="Удалить категорию клиента" type='text' icon={<DeleteOutlined />} />
          </Popconfirm>
        </Select.Option>
      ))} 
    </Select>
  ); 
}

export default SelectClientCategory