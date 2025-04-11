import React, { useEffect, useState } from 'react';
import {
  Table,
  InputNumber,
  Button,
  Form,
  Modal,
  Typography,
  Row,
  Col,
  Divider,
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

const LoiNhuanSP = ({loiNhuan,setLoiNhuan, gia}) => {


  
  const [displayData, setDisplayData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = (id) => {
    const updated = displayData.filter(item => item.id !== id);
    setDisplayData(updated);
    setLoiNhuan(updated.map(({ soLuong, loiNhuan }) => ({ soLuong, loiNhuan })));
  };

  const showModal = () => setIsModalOpen(true);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  
  useEffect(() => {
    const dataWithId = loiNhuan.map((item, index) => ({
      ...item,
      id: index.toString(),
    }));
    setDisplayData(dataWithId);
  }, [loiNhuan]);

 const handleAdd = () => {
  form.validateFields().then(values => {
    const newEntry = {
      id: Date.now().toString(),
      soLuong: values.soLuong,
      loiNhuan: values.loiNhuan || 0,
    };
    const updated = [...displayData, newEntry].sort((a, b) => a.soLuong - b.soLuong);
    setDisplayData(updated);
    setLoiNhuan(updated.map(({ soLuong, loiNhuan }) => ({ soLuong, loiNhuan })));
    form.resetFields();
    setIsModalOpen(false);
  });
};

const handleProfitChange = (value, id) => {
  const updated = displayData.map(item =>
    item.id === id ? { ...item, loiNhuan: value || 0 } : item
  );
  setDisplayData(updated);
  setLoiNhuan(updated.map(({ soLuong, loiNhuan }) => ({ soLuong, loiNhuan })));
};

// Cập nhật chính thức và sắp xếp
const handleQuantityChange = (value, id) => {
  const updated = displayData.map(item =>
    item.id === id ? { ...item, soLuong: value || 0 } : item
  );
  const sorted = updated.sort((a, b) => a.soLuong - b.soLuong);
  setDisplayData(sorted);
  setLoiNhuan(sorted); // đồng bộ lại state chính nếu cần
};

  console.log(loiNhuan);
  


  const columns = [
    {
      title: 'Số lượng',
      dataIndex: 'soLuong',
      id: 'soLuong',
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.soLuong}
          onChange={(value) => handleQuantityChange(value, record.id)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Lợi nhuận (%)',
      dataIndex: 'loiNhuan',
      id: 'loiNhuan',
      render: (_, record) => (
        <InputNumber
          min={0}
          formatter={(value) => `${value}%`}
          parser={(value) => value.replace('%', '')}
          value={record.loiNhuan}
          onChange={(value) => handleProfitChange(value, record.id)}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Thao tác',
      id: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        />
      ),
    },
  ];

  return (
    <div>

    <h1>Giá sản phẩm dự tính: {gia}</h1>

      <Divider/>
      
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Bảng Lợi Nhuận Theo Số Lượng
            </Title>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showModal}
              size="middle"
            >
              Thêm mốc
            </Button>
          </Col>
        </Row>

        <Table
          dataSource={displayData}
          rowKey="id"
          columns={columns}
          pagination={false}
          bordered
        />
 

      <Modal
        title="Thêm Mốc Lợi Nhuận"
        open={isModalOpen}
        onOk={handleAdd}
        onCancel={handleCancel}
        okText="Thêm"
        cancelText="Hủy"
        centered
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          name="addProfitEntry"
        >
          <Form.Item
            name="soLuong"
            label="Số lượng"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng' },
              { type: 'number', min: 1, message: 'Số lượng phải lớn hơn 0' }
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              placeholder="Nhập số lượng"
            />
          </Form.Item>
          <Form.Item
            name="loiNhuan"
            label="Lợi nhuận (%)"
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              addonAfter='%'
              placeholder="Nhập phần trăm lợi nhuận"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LoiNhuanSP;
