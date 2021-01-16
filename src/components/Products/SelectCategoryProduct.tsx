import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Select } from 'antd' 

import { getCaregories } from '../../redux/category/actions'

import { StateType } from '../../redux/reducers'

const SelectCategoryProduct: FC = (props) => {
  const dispatch = useDispatch();

  const { userData } = useSelector( (state: StateType) => state.user ); 

  useEffect(() => {
    userData?.data.companyId && dispatch(getCaregories(userData?.data.companyId));
  }, [dispatch, userData?.data.companyId]) 

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