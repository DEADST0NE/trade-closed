import { FC } from 'react'
import { Row, Col, PageHeader } from 'antd';
import { Pie, Column } from '@ant-design/charts';

const StatisticCompany:FC = () => {

  var data = [
    {
      type: '2016',
      sales: 31
    },
    {
      type: '2017',
      sales: 28
    }, 
    {
      type: '2018',
      sales: 32
    }, 
    {
      type: '2019',
      sales: 24
    }, 
    {
      type: '2020',
      sales: 40
    }, 
    {
      type: '2021',
      sales: 52
    }, 
  ];

  const pyeData = [
    {
      type: 'Новые',
      value: 27,
    },
    {
      type: 'В работе',
      value: 25,
    },
    {
      type: 'Исполненно',
      value: 18,
    },
    {
      type: 'Отказано',
      value: 15,
    },
  ];
  
  const configStatisticApplication = {
    appendPadding: 0,
    data: pyeData,
    angleField: 'value',
    colorField: 'type', 
    innerRadius: 0.6, 
    color: ['#1890ff', '#fa8c16', '#23be5f', '#f5222d'],
    label: {
      type: 'inner',
      offset: '-50%',
      style: { textAlign: 'center' },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {  
      title: { 
        formatter: (value: any) => value?.type ? value.type : 'Всего',
      },
    },
    interactions: [
      { type: 'element-selected' },
      { type: 'element-active' },
      { type: 'pie-statistic-active' },
    ],
  };

  const configColums = {
    data: data,
    xField: 'type',
    yField: 'sales', 
    meta: {
        type: { alias: '类别' },
        sales: { alias: '销售额' }
    }
};

  return (
    <div className="company-statistic"> 
      <Row gutter={[10, 10]}> 
          <Col span={8} style={{height: "35%"}}>
            <div className="company-statistic-application-wrapper">
              <PageHeader
                className="company-statistic-page-header"
                title="Количество заявок"
              />
              <Pie className="company-statistic-application" {...configStatisticApplication} />
            </div>
          </Col>
          <Col span={16} style={{height: "35%"}}>
            <div className="not-statistic1">
              Здесь скоро появится полезная статистика
            </div>
          </Col> 
        <Col span={5} style={{height: "20%"}}>
          <div className="statistic-total">
            <PageHeader
              className="company-statistic-page-header"
              title="Выручка"
            />
            <div className="profit-number">445,456 ₽</div>
          </div>
        </Col>
        
        <Col span={5} style={{height: "20%"}}>
          <div className="statistic-total">
            <PageHeader
              className="company-statistic-page-header"
              title="Сумма данная в реализацию"
            />
            <div className="debt-number">445,456 ₽</div>
          </div>
        </Col>
        <Col span={14} style={{height: "20%"}}>
          <div className="not-statistic2">
            Здесь скоро появится полезная статистика
          </div>
        </Col>
        <Col span={24} style={{height: "45%"}}>
          <div className="company-statistic-wrapper">
            <PageHeader
              className="company-statistic-page-header"
              title="Выручка по годам"
            />
            <div className="company-statistic">
              <Column {...configColums} />
            </div> 
          </div> 
        </Col>
      </Row>
    </div>
  )
}

export default StatisticCompany