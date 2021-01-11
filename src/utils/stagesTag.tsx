import { Tag } from 'antd';

export const stagesTeg = (value: number | undefined) => {
  switch(value) {
    case 1: return <Tag color="#1890ff">Новая</Tag>;  
    case 2: return <Tag color="#fa8c16">В работе</Tag>;
    case 3: return <Tag color="#23be5f">Исполнено</Tag>;
    case 4: return <Tag color="#f5222d">Отказано</Tag>;
    default: return null;
  } 
}