import { Button, Popconfirm, Space, Table, Tooltip } from 'antd'
import React, { useState } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { IoEyeSharp } from "react-icons/io5";
import ModalChiTiet from './ModalChiTiet';
import { formatCurrency, formatDate } from '../../helpers/formatData';

function TableXuatNhap({isXuat, data, hanldDelete}) {
    const [open,setOpen] = useState(false)
    const [listCT, setListCt] = useState({})

    const onClose = ()=>{
        setOpen(false)
    }
    const onShow = (item)=>{
        setListCt(item)
        setOpen(true)
    }
        
    const columns =[
        {
            title:"Mã Phiếu",
            dataIndex:"id",
            key:"maPhieu"
        },
        {
            title:"Mã kho",
            dataIndex:"kho",
            key:"kho",
            render:(_,record)=>{
                return record.kho.maKho
            }
        },
        ...(isXuat ? [{
            title: "Ngày Xuất",
            dataIndex: "ngayXuat",
            key: "ngayXuat",
            render: (value) => formatDate(value)
          }] : [{
            title: "Ngày Nhập",
            dataIndex: "ngayNhap",
            key: "ngayNhap",
            render: (value) => formatDate(value)
          }]),
        {
            title:"Tổng giá trị",   
            dataIndex: "tongGiaTri",   
            key:"tongGiaTri",
            render:(_,value)=> formatCurrency(value.tongGiaTri)
        },
        {
            title:"Người tạo",
            dataIndex:"nguoiTao",
            key:"nguoiTao",
            render:(_,record)=>{
                return record.nguoiTao.hoTen
            }
        },
        {
            title:"Action",
            key:"action",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Xem chi tiết" color="green">
                        <Button onClick={()=>onShow(record)} icon={<IoEyeSharp />} color='green' variant='outlined'/>
                    </Tooltip>
                    <Tooltip title="Xóa" color="red">
                        <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={()=>hanldDelete(record.id)} okText="Xóa" cancelText="Không">
                            <Button icon={<RiDeleteBin7Line/>} color="red" variant="outlined"></Button>
                        </Popconfirm>
                    </Tooltip>
                </Space>
            )
        }
    ]
  return (
    <>
        <Table
            dataSource={data}
            columns={columns}
        />
        <ModalChiTiet open={open} onClose={onClose} item={listCT}/>
    </>
  )
}

export default TableXuatNhap