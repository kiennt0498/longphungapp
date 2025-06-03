import {  Empty, Row,  } from 'antd'
import { useState } from 'react'
import ModalDonCT from './ModalDonCT'
import OrderCard from '../common/OrderCard'

const DonHangTabsTK = ({listTK,format}) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState({})

  

  const showModal = (data) => {
    setBill(data)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };   
  
  if(listTK.length === 0){
      return(
          <Empty/>
      )
    }
  return (
    <div style={{ padding: 20 }}>
    <Row gutter={[5, 5]}>
      {listTK.map((item) => (
        <OrderCard key={item.maDonHang} item={item} format={format} onView={showModal}/>
      ))}
      
    </Row>

    <ModalDonCT isModalOpen={isModalOpen} handleCancel={handleCancel} data={bill}/>
    
  </div>
  )
}

export default DonHangTabsTK