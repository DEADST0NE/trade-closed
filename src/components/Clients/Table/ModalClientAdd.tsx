/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { List, Modal, Input, Button, Avatar } from 'antd';

import { PlusCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

import { getClientSearch, postClient } from '../../../redux/client/actions';

import { StateType } from '../../../redux/reducers'

const ModalCientAdd = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector( (state: StateType) => state.user );
  const { clients, searchClient, searchClientLoadung, loading } = useSelector( (state: StateType) => state.client );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueSearch, setValueSearch] = useState(''); 
  const closedWindow = (): void => {
    setIsModalVisible(false);
    setValueSearch(''); 
  }

  const addClient = (item: { id: string }) => {
    if(!Object.keys(clients).some((key) => clients[key].id === item.id) && userData)
      userData?.data.companyId && dispatch(postClient(userData.data.companyId, item.id, closedWindow))
  }

  useEffect(() => {
    dispatch(getClientSearch(valueSearch))
  }, [])

  return (
    <> 
      <Button 
        onClick={() => setIsModalVisible(true)} 
      >
        Добавить клиента
      </Button>
      <Modal title="Добавление клиента" 
        visible={isModalVisible} 
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={false}
        width={700}
        cancelText="Закрыть"
        okButtonProps={{ style: { display: 'none' } }}
      >
        <Input.Search placeholder="Поиск клиента..."
          loading={searchClientLoadung}
          allowClear
          value={valueSearch}
          onChange={(el) => {
            setValueSearch(el.target.value)
            if(el.target.value.length === 0) dispatch(getClientSearch(''))
          }}
          onSearch={() => dispatch(getClientSearch(valueSearch))} />
        <div style={{maxHeight: '300px', overflowY: 'auto'}}>
          <List 
            style={{marginTop: "20px"}}
            loading={false} 
            itemLayout="horizontal"
            loadMore={true}
            size='small'
            dataSource={searchClient}
            renderItem={item => (
              <List.Item 
                actions={[
                <Button 
                  loading={loading} 
                  type="text" 
                  disabled={Object.keys(clients).some((key) => clients[key].id === item.id) || loading} 
                  className="add-client-btn"
                  icon={ 
                    Object.keys(clients).some((key) => clients[key].id === item.id) ? 
                      <CheckCircleOutlined style={{color: 'green'}}/> : 
                      <PlusCircleOutlined />} />]
                  }
                  onClick={() => addClient(item)}
              >
                <List.Item.Meta
                  style={{display: 'flex', alignItems: 'center'}}
                  avatar={<Avatar />}
                  title={ item.name }
                  description={`Адресс: ${item.address}, Телефон: ${item.phone}, Email: ${item.email}`}
                />
              </List.Item>
            )}
          />
        </div> 
      </Modal>
    </>
  )
}

export default ModalCientAdd