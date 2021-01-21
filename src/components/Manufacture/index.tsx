import { FC } from 'react'
import { PageHeader } from 'antd'

import Table from './Table/index'

import './Manufacture.scss'

const Manufacture: FC = () => {
  return (
    <div className="manufacture-page">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        className="site-page-header"
        title="Производители"
      />
      <div className="manufacture-body">
        <Table />
      </div>
    </div>
  )
}

export default Manufacture