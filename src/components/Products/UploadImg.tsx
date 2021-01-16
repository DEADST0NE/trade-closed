import { FC, useState, Dispatch, SetStateAction } from 'react'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'

interface paramType {
  img: {
    src: string, 
    file?: File, 
    putFile?: string
  } | null,
  setImg: Dispatch<SetStateAction<{
    src: string;
    file?: File | undefined;
    putFile?: string | undefined;
} | null>>
}

const getBase64 = (img: File, callback: any) => { // Получения src изображения 
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const dummyRequest = ({ onSuccess } : { onSuccess: any }) => setTimeout(() => onSuccess("ok"), 0); 

const UploadImg: FC<paramType> = ({ img, setImg }) => {

  const [loadingImg, setLoadingImg] = useState(false); // Загрузка картинки

  const uploadButton = (
    <div>
      {loadingImg ? <LoadingOutlined /> : <UploadOutlined />}
      <div style={{ padding: '0 10px', lineHeight: '1.2' }}>Загрузите изображение</div>
    </div>
  );

  const handleChange = (info: any) => { // Изменение изображение
    if (info.file.status === 'uploading') {
      setLoadingImg(true); 
    }
    if (info.file.status === 'done') { 
      setLoadingImg(false); 
      getBase64(info.file.originFileObj, (imageUrl: any) =>
        setImg({
          src: imageUrl,
          file: info.file,
          putFile: imageUrl,
        })
      );
    }
  };

  const beforeUpload = (file: File) => { // Валидация изображения
    const isJpgOrPng = file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('Неверный формат изображения, допустимые форматы файла JPG/PNG');
    } 
    return isJpgOrPng;
  } 

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false} 
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={dummyRequest}
    >
      {img ? <img src={img.src} alt="product-foto" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  )
}

export default UploadImg