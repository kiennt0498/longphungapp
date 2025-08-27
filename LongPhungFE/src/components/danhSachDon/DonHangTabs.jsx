import {  Empty, Row,  } from 'antd'
import { useState } from 'react'
import OrderCard from '../common/OrderCard'
import ModalDonCT from '../donHang/ModalDonCT';

const DonHangTabs = ({list,format, handleNhanDon, handleopenModal}) =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
  const khu = localStorage.getItem("khu") || "";
  const [bill, setBill] = useState({})

  const chucVuId = Number(localStorage.getItem("chucVu") || 0);
  console.log(list);  

  const showModal = (data) => {
    setBill(data)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };   
  
  if(list.length === 0){
      return(
          <Empty/>
      )
    }
  return (
    <div style={{ padding: 20 }}>
    <Row gutter={[5, 5]}>
      {list.map((item) => (
        <OrderCard key={item.maDonHang} item={item} format={format} onNhanDon={handleNhanDon} handleopenModal={handleopenModal} onView={showModal} phanPhoiDon={chucVuId === 1}/>
      ))}
      
    </Row>

    <ModalDonCT isModalOpen={isModalOpen} handleCancel={handleCancel} data={bill}/>
    
  </div>
  )
}

export default DonHangTabs