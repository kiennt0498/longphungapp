import { Table } from 'antd';
import React from 'react'

function TongKPIList() {
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Nhân viên', dataIndex: 'nhanVien', key: 'nhanVien' },
        { title: 'KPI việc riêng', dataIndex: 'kpiRieng', key: 'kpiRieng' },
        { title: 'KPI thiếu', dataIndex: 'kpiThieu', key: 'kpiThieu' },
        { title: 'KPI bị trừ', dataIndex: 'kpiTru', key: 'kpiTru' },
        { title: 'KPI đạt được', dataIndex: 'kpi', key: 'kpi' },
        { title: 'Tỉ lệ hoàn thành', dataIndex: 'tiLe', key: 'tiLe' },
        { title: 'Lương nhận ', dataIndex: 'luong', key: 'luong' },
    ];
  return (
    <>
      <h1>Bảng tổng KPI</h1>
    <Table
    columns={columns}
    dataSource={[]}
    pagination={false}
    rowKey="stt"
    />
    </>
  )
}

export default TongKPIList