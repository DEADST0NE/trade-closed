import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Modal, InputNumber, Button } from 'antd';

import { postPayment } from '../../../redux/applications/actions';

import { StateType } from '../../../redux/reducers'

import { PlusOutlined } from '@ant-design/icons'; 

const ModalPaymentAdd: FC = () => {
  const dispatch = useDispatch();
  const { detailInfo, loadingPayments } = useSelector( (state: StateType) => state.applications );
  const { userData } = useSelector( (state: StateType) => state.user );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [value, setValue] = useState<number | undefined>(undefined);

  const handleOk = () => { //При клике ок
    if(detailInfo?.id && userData?.data.id && value) 
      dispatch(postPayment(detailInfo.id, userData.data.id, value, setIsModalVisible, setValue))
  }

  return (
    <> 
      <Button 
        type="text"
        onClick={() => setIsModalVisible(true)}
        disabled={detailInfo?.stages[0] === 4 || detailInfo?.stages[0] === 3}
        icon={<PlusOutlined />} 
      />
      <Modal title="Добавление оплаты" 
        visible={isModalVisible} 
        onOk={handleOk} 
        okText="Добавить"
        cancelText="Отмена"
        okButtonProps={{ disabled: !value }}
        onCancel={() => setIsModalVisible(false)}
        confirmLoading={loadingPayments}
        >
        <InputNumber
          size="large"
          style={{ width: '100%' }}
          disabled={loadingPayments}
          value={value}
          onChange={(value)=>setValue(Number(value))}
          step={0.2}/>
          <Typography.Text 
            style={{display: 'block', textAlign: 'end'}} 
            type="secondary">
              *Введите сумму
          </Typography.Text>
      </Modal>
    </>
  )
}

export default ModalPaymentAdd