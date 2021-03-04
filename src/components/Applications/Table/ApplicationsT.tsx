import React, { FC, useEffect, useState } from 'react' 
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'antd';

import { stagesTeg } from '../../../utils/stagesTag'

import { getApplications, setApplicationsDetail } from '../../../redux/applications/actions' 
import { StateType } from '../../../redux/reducers'

import { columnsType, AslignType } from './types'
import './ApplicationsT.scss'

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
    width: 30,
    sorter: (a :columnsType, b :columnsType) => a.number - b.number,
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    width: 50,
    sorter: (a :columnsType, b :columnsType) => (
      new Date(`${a.data.date.date} ${a.data.date.time}`).valueOf() - new Date(`${b.data.date.date} ${b.data.date.time}`).valueOf()
    ),
  },
  {
    title: 'Наименование клиента',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: 'Сумма',
    dataIndex: 'pay',
    width: 60,
    align: 'center' as AslignType,
    sorter: (a :columnsType, b :columnsType) => a.data.pay - b.data.pay,
  }, 
  {
    title: 'Остаток',
    dataIndex: 'paid',
    width: 60,
    align: 'center' as AslignType,
    sorter: (a :columnsType, b :columnsType) => a.data.paid - b.data.paid,
  },
  {
    title: 'Этап',
    dataIndex: 'stages',
    width: 40,
    align: 'center' as AslignType,
    sorter: (a :columnsType, b :columnsType) => a.data.stages[0] - b.data.stages[0],
    filters: [
      {
        text: "Новые",
        value: "Новая"
      },
      {
        text: "В работе",
        value: "В работе"
      },
      {
        text: "Исполнено",
        value: "Исполнено"
      },
      {
        text: "Отказано",
        value: "Отказано"
      },
    ],
    onFilter: (value: unknown, record: columnsType) => record?.stages?.props?.children === value,
  },
];

const ApplicationsVT: FC = () => { 
  const dispatch = useDispatch(); 
  const { userData } = useSelector( (state: StateType) => state.user ); 
  const [selectedTr, setSelectedTr] = useState<null | number>(null);
  useEffect(() => {
    userData?.data.id && dispatch(getApplications(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

  const { applications, loading, error } = useSelector( (state: StateType) => state.applications );
  
  if(error) {
    return (
      <div className="application-table">
        Error
      </div>
    );
  }  

  const dataSource = Object.keys(applications).map((item) => ({
    data: applications[item],
    key: applications[item].number,
    number: applications[item].number,
    date: HeadFootText(applications[item].date.date, applications[item].date.time, 'clolumText'),
    name: HeadFootText(applications[item].clientName, applications[item].clientAddress, 'clolumText'),
    pay: `${applications[item].pay} ₽`,
    paid: `${applications[item].paid} ₽`,
    stages: stagesTeg(applications[item].stages[0]),
  }));

  return (
    <div className="application-table"> 
      <Table
        onRow={(record) => ({
          onClick: () => {
            dispatch(setApplicationsDetail(record.data));
            setSelectedTr(record.key);
          }
        })}
        loading={loading}
        columns={columns}
        dataSource={dataSource} 
        pagination={false}
        rowClassName={(record) => ( record.key === selectedTr ? 'ant-table-row-selected' : '')}
        scroll={{ y: 240 }} />
    </div>
  )
}

export default ApplicationsVT