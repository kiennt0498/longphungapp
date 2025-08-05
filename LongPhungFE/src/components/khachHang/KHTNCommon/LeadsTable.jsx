import React, { use } from 'react';
import { Table, Avatar, Tag, Button, Space, Typography, Tooltip, Select } from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  ShopOutlined,
  TagsOutlined
} from '@ant-design/icons';
import '../KHTNStyles/LeadsTable.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setKhachHang } from '../../../redux/slide/KhachHangSlice';

const { Text } = Typography;

function LeadsTable({ data, professionColors, productColors,statusConfig }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleRowClick = (record) => {
    navigate(`/khao-sat-khach-hang/${record.phone}`);
    dispatch(setKhachHang(record));
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      width: 60,
      render: (_, __, index) => index + 1,
      align: 'center',
    },
    {
      title: 'Thông tin khách hàng',
      key: 'customer',
      width: 250,
      render: (_, record) => (
        <div className="lead-row">
          <Avatar className="lead-avatar" icon={<UserOutlined />}>
            {record.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </Avatar>
          <div className="lead-info">
            <div className="lead-name">{record.name}</div>
            <Text className="lead-email">{record.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Liên hệ',
      key: 'contact',
      render: (_, record) => (
        <div className="lead-contact">
          <div><PhoneOutlined /> {record.phone}</div>
          <div><CalendarOutlined /> {new Date(record.lastContact).toLocaleDateString('vi-VN')}</div>
        </div>
      ),
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'profession',
      key: 'profession',
      render: (prof) => (
        <Tag
          color={professionColors[prof] || 'default'}
          icon={<ShopOutlined />}
        >
          {prof}
        </Tag>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <div className="lead-tags">
          {tags.map(tag => (
            <Tag key={tag} color="blue" icon={<TagsOutlined />}>
              {tag}
            </Tag>
          ))}
        </div>
      ),
    },
    // {
    //   title: 'Sản phẩm quan tâm',
    //   dataIndex: 'interestedProducts',
    //   key: 'interestedProducts',
    //   render: (products) => (
    //     <div className="lead-products">
    //       {products.slice(0, 2).map(p => (
    //         <Tag key={p} color={productColors[p] || 'default'}>
    //           {p}
    //         </Tag>
    //       ))}
    //       {products.length > 2 && (
    //         <Tooltip title={products.slice(2).join(', ')}>
    //           <Tag>+{products.length - 2}</Tag>
    //         </Tooltip>
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: 'Nhu cầu',
      dataIndex: 'needs',
      key: 'needs',
      render: (needs) => (
        <Tooltip title={needs}>
          <Text className="lead-needs">{needs}</Text>
        </Tooltip>
      ),
    },
    {
  title: 'Trạng thái',
  dataIndex: 'status',
  key: 'status',
  width: 150,
  render: (status, record) => (
    <Select
      value={status}
      style={{ width: '100%' }}
      size="small"
      // onChange={(newStatus) => handleStatusChange(record.id, newStatus)}
    >
      {Object.entries(statusConfig).map(([key, config]) => (
        <Select.Option key={key} value={key}>
          {config.label}
        </Select.Option>
      ))}
    </Select>
  ),
  filters: Object.entries(statusConfig).map(([key, config]) => ({
    text: config.label,
    value: key,
  })),
  onFilter: (value, record) => record.status === value,
},
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Liên hệ" color='green'><Button icon={<PhoneOutlined />} color='green' variant='text' onClick={() => handleRowClick(record)} /></Tooltip>
          <Tooltip title="Xóa" color='red'><Button icon={<DeleteOutlined />} type="text" danger /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} khách hàng`,
      }}
      scroll={{ x: 1200 }}
      size="small"
    />
  );
}

export default LeadsTable;
