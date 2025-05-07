import { Tabs } from 'antd'
import React, { useEffect, useState } from 'react'
import TableXuatNhap from './TableXuatNhap'
import KhoService from '../../services/KhoService';
import { toast } from 'react-toastify';

function Phieu() {
  const isXuat = true;
  const service = new KhoService()

  const [dataXuat,setDataXuat] = useState([])
  const [dataNhap,setDataNhap] = useState([])

  const getData = async ()=>{
    try {
      const res = await service.getListPhieu()
      const data = res.data
      const xuat = data.filter((item)=> item.ngayXuat)
      const nhap = data.filter((item)=> !item.ngayXuat)
      setDataXuat(xuat)
      setDataNhap(nhap)
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const hanldDelete = async (id) =>{
    try {
      const res = await service.deletePhieu(id)
      if(res.status === 200){
        getData()
        toast.success("Xóa thành công")
      }else{
        toast.error("Xóa thất bại")
      }
    } catch (error) {
      toast.error("Xóa thất bại")
      console.log(error);
      
    }
  }
  

  const items = [
    {
      key: '1',
      label: 'Xuất kho',
      children: <TableXuatNhap data={dataXuat} isXuat={isXuat} hanldDelete={hanldDelete}/>,
    },
    {
      key: '2',
      label: 'Nhập kho',
      children: <TableXuatNhap data={dataNhap} isXuat={!isXuat} hanldDelete={hanldDelete}/>,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  )
}

export default Phieu