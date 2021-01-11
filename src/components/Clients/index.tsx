import { PageHeader } from 'antd'

import Table from './Table'
import './Clients.scss'

const Clients = () => {
  return (
    <div className="clients-page">
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        className="site-page-header"
        title="Клиенты"
      />
      <Table />
    </div>
  )
}

export default Clients