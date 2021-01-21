import { FC, useEffect } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Table, Input, Popover, Button, Typography, Popconfirm } from 'antd'
import { PieChart } from 'react-minimal-pie-chart'

import { DeleteOutlined } from '@ant-design/icons'

import ModalCientAdd from './ModalClientAdd'

import SelectClientCategory from './SelectClientCategory'

import { getClient, deleteClient } from '../../../redux/client/actions' 
import { StateType } from '../../../redux/reducers'

import { AslignType } from './types'
import './ClientsT.scss' 

const HeadFootText = (headerText: string, footerText: string, className: string ) => (
  <div className={className}>
    {headerText}
    <span>{footerText}</span>
  </div>
)

const columns = [
  {
    title: '№',
    dataIndex: 'number',
    width: 15, 
  },
  {
    title: 'Наименование клиента',
    dataIndex: 'name',
    width: 50, 
  }, 
  {
    title: 'Телефон',
    dataIndex: 'phone',
    align: 'center' as AslignType,
    width: 40,  
  },
  {
    title: 'Email',
    dataIndex: 'email',
    align: 'center' as AslignType,
    width: 40,  
  },  
  {
    title: 'Дата добавления',
    dataIndex: 'date',
    align: 'center' as AslignType,
    width: 40,  
  }, 
  {
    title: 'Категория',
    dataIndex: 'clientCategory',
    width: 40,
  },
  {
    title: 'Всего заявок',
    dataIndex: 'application',
    align: 'center' as AslignType,
    width: 40, 
  },
  {
    title: 'Задолжность',
    dataIndex: 'debt',
    align: 'center' as AslignType,
    width: 40, 
  }, 
  {
    title: '',
    dataIndex: 'delete',
    align: 'center' as AslignType,
    width: 15, 
  }
];

const ApplicationsVT: FC = () => { 
  const dispatch = useDispatch();  

  const { userData } = useSelector( (state: StateType) => state.user );  
  useEffect(() => {
    userData?.data.companyId && dispatch(getClient(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  const { clients, loading, error } = useSelector( (state: StateType) => state.client );
  
  if(error) {
    return (
      <div className="client-table">
        Error
      </div>
    );
  }
  
  const ApplicationStatistic = ({statisticData}: any) => {
    const {count, stages} = statisticData; 

    const dataMock = [
      { title: 'Новый', value: stages[1], color: '#1890ff' },
      { title: 'В работе', value: stages[2], color: '#fa8c16' },
      { title: 'Исполненно', value: stages[3], color: '#23be5f' },
      { title: 'Отказанно', value: stages[4], color: '#f5222d' },
    ];
    
    return (
      <Popover placement="bottom" 
        content={
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PieChart 
                className="client-statistic-application"
                animate={true}
                data={dataMock}
                totalValue={count}
                lineWidth={60}
                labelPosition={70}
                label={({ dataEntry }) => dataEntry.value}
                segmentsShift={1}
                radius={PieChart.defaultProps.radius - 5}
              />
              <div style={{marginLeft: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px'}}>
                  Новая <div style={{width: '10px', height: '10px', backgroundColor: '#1890ff', marginLeft: '10px'}}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px'}}>
                  В работе <div style={{width: '10px', height: '10px', backgroundColor: '#fa8c16', marginLeft: '10px'}}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px'}}>
                  Исполненно <div style={{width: '10px', height: '10px', backgroundColor: '#23be5f', marginLeft: '10px'}}/>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px'}}>
                  Отказанно <div style={{width: '10px', height: '10px', backgroundColor: '#f5222d', marginLeft: '10px'}}/>
                </div> 
              </div>
            </div> 
          </>
        }
        title={'Статистика по этапам'} 
        trigger={count ? 'click' : 'none'}>
          <Button type="link" style={{fontSize: '15px'}}>
            {count ? count : '-'}
          </Button>
      </Popover>
    )
  }

  const DebtItem = ({debt}: any) => {
    const columns = [ 
      {
        title: '№',
        dataIndex: 'number',
        align: 'center' as AslignType,
        sorter: (a: any, b: any) => a.number - b.number,
        width: 20, 
      },
      {
        title: 'Сумма',
        dataIndex: 'total',
        align: 'center' as AslignType,
        sorter: (a: any, b: any) => a.total - b.total,
        width: 20, 
      }
    ];
    return (
      <Popover placement="bottom"
        content={
          <div>
            <Table
            className="ditails-debt"
            size="small"
            pagination={false}
            columns={columns} 
            dataSource={debt?.detailing}
            scroll={{ y: 200 }} />
          </div>
        }
        title={'Детализация по задолженности'} trigger={debt?.count ? 'click' : 'none'}>
          <Button type="link" style={{fontSize: '15px'}}>
            {debt?.count ? <Typography.Text type="danger">{debt.count} ₽</Typography.Text> : <Typography.Text type="success">{debt?.count ? debt?.count : 0} ₽</Typography.Text>}
          </Button>
      </Popover>
    )  
  }

  const dataSource = Object.keys(clients).map((item, index) => ({
    key: clients[item].id,
    number:  1 + index, 
    name: HeadFootText(clients[item].name, clients[item].address, 'clolumText'),
    email: clients[item].email,
    phone: clients[item].phone,
    date: clients[item].dateAdd,
    clientCategory: <SelectClientCategory id={clients[item].key} defautData={clients[item].clientsCategory}/>,
    application: <ApplicationStatistic statisticData={clients[item].applicationStatistic}/>,
    debt: <DebtItem debt={clients[item].debt} />,
    delete: <Popconfirm
              title="Вы уверены, что хотите удалить клиента ?"
              okText="Да"
              onConfirm={() => { 
                if(clients[item].key)
                  dispatch(deleteClient(clients[item].key))
              }}
              cancelText="Нет">
                <Button className="btn-delete" type='text' icon={<DeleteOutlined color="red"/>}/>
            </Popconfirm>
  }));

  return (
    <div className="client-table">
      <div className="client-search-wrapper">
        <Input.Search
          placeholder="Поиск клиента...."
          allowClear 
        />
        <ModalCientAdd />
      </div> 
      <Table
        loading={loading}
        columns={columns} 
        dataSource={dataSource} 
        pagination={false} 
        scroll={{ y: 240 }} />
    </div>
  )
}

export default ApplicationsVT