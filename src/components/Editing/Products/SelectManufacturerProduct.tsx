import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Select } from 'antd'

import { StateType } from '../../../redux/reducers'

const SelectManufacturerProduct: FC = (props) => {
  const { manufacture, loading } = useSelector( (state: StateType) => state.manufacture );
  
  return (
    <Select
      {...props}
      className="select-client-category" 
      showSearch
      style={{ width: '100%' }} 
      placeholder="Категория товара"
      loading={loading}
      disabled={loading}
    > 
      {Object.keys(manufacture)?.map((item) => (
        <Select.Option className="option-client-category" key={manufacture[item].id} value={manufacture[item].id}>
          {manufacture[item].name}
        </Select.Option>
      ))} 
    </Select>
  ); 
}

export default SelectManufacturerProduct