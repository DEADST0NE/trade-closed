import React, { FC } from 'react'
import { CloseOutlined } from '@ant-design/icons'

import './NotFoundPage.scss'

const NotFoundPage: FC = () => (
  <div className="not-found-page">
    <CloseOutlined />
      <div className="content">
        <h1>Error 404</h1>
        <span>Страница не найдена</span>
      </div> 
  </div>
);

export default NotFoundPage;