import { FC } from 'react'
import { useSelector } from 'react-redux'
import { Select } from 'antd'

import { StateType } from '../../../redux/reducers'

const SelectCategoryProduct: FC = (props) => {
  const { category, loading } = useSelector( (state: StateType) => state.category );
  
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
      {category?.map((item) => (
        <Select.Option className="option-client-category" key={item.value} value={item.value}>
          {item.label}
        </Select.Option>
      ))} 
    </Select>
  ); 
}

export default SelectCategoryProduct