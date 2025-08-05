import { Modal, Table } from 'antd'
import React from 'react'
import { formatCurrency } from '../../helpers/formatData'

function ModalChiTiet({ open, onClose, item }) {
  
  const data = item?.phieuChiTiets?.map((ct) => ({
    key: ct.id,
    name: ct.vatTu.ten,
    quantity: ct.soLuong,
    price: ct.donGia,
    total: ct.thanhTien,
  })) || [];
  

  const total = data.reduce((sum, row) => sum + row.total, 0);
  const totalDonGia = data.reduce((sum, row) => sum + row.price, 0);

  const columns = [
    {
      title: "Tên vật tư",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity"
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (value) => formatCurrency(value)
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (value) => formatCurrency(value)
    }
  ]

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Chi tiết vật tư"
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell colSpan={2}>Tổng</Table.Summary.Cell>
            <Table.Summary.Cell style={{ textAlign: "right" }}>
              {formatCurrency(totalDonGia)}
            </Table.Summary.Cell>
            <Table.Summary.Cell style={{ textAlign: "right" }}>
              {formatCurrency(total)}
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </Modal>
  )
}

export default ModalChiTiet
