import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Tooltip,
  Space,
  Row,
  Col,
  Popconfirm,
} from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";
import { formatCurrency } from "../../helpers/formatData";
import { RiDeleteBin7Line } from "react-icons/ri";
import SockJS from "sockjs-client";
import { API_SOCKET } from "../../services/constans";
import { Client } from "@stomp/stompjs";
import NguyenLieuService from "../../services/NguyenLieuService";
import { toast } from "react-toastify";

const { Option } = Select;

const ListVatTu = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);
  const [filter, setFilter] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const [loai, setLoai] = useState([]);
  const vtService = new NguyenLieuService();

  const stompClient = useRef(null);

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP Connected");
        stompClient.current.subscribe("/topic/vattu", (message) => {
          const newData = JSON.parse(message.body);
          setData((prevData) => {
            if (JSON.stringify(prevData) !== JSON.stringify(newData)) {
              return newData;
            }
            return prevData;
          });
        });
        stompClient.current.publish({
          destination: "/app/getVatTu",
          body: "",
        });
      },
      onDisconnect: () => {
        console.log("STOMP Disconnected");
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  }, []);

  const getLoai = async () => {
    try {
      const res = await vtService.getListLoaiVatTu();

      setLoai(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLoai();
  }, []);


  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
     

      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      message.error("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleEdit = (record) => {
    console.log(record);
    
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };


  const filteredData = data.filter((item) => {
    const matchLoai = filter ? item.vatTu.loaiVatTu === filter : true;
    const matchSearch = item.vatTu.ten
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchLoai && matchSearch;
  });

  const columns = [
    {
      title: "Số hiệu kho",
      dataIndex: "kho",
      key: "kho",
      render: (value) => {
        return value.tenKho;
      },
    },
    {
      title: "Tên vật tư",
      dataIndex: "vatTu",
      key: "ten",
      render: (_, record) => {
        return record.vatTu.ten;
      },
    },
    {
      title: "Đơn vị tính",
      dataIndex: "vatTu",
      key: "donViTinh",
      render: (_, record) => {
        return record.vatTu.doViTinh.ten;
      },
    },

    {
      title: "Loại",
      dataIndex: "vatTu",
      key: "loai",
      render: (_, record) => {
        const match = loai.find((item) => item.name === record.vatTu.loaiVatTu);
        return match ? match.description : "-";
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "vatTu",
      key: "gia",
      render: (_, record) => {
        return formatCurrency(record.vatTu.giaNhap);
      },
    },
    {
      title: "Số lượng tồn kho",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: "Giá trị tồn kho",
      dataIndex: "giaTriTonKho",
      key: "giaTriTonKho",
      render: (_, record) => {
        return formatCurrency(record.vatTu.giaNhap * record.soLuong);
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_, record) => (
    //     <Space>
    //       <Tooltip title="Chỉnh sửa" color="blue">
    //         <Button
    //           icon={<EditOutlined />}
    //           color="blue"
    //           variant="outlined"
    //           onClick={() => handleEdit(record)}
    //         />
    //       </Tooltip>
    //     </Space>
    //   ),
    // },
  ];

  const listOption = loai.map((item) => {
    return {
      value: item.name,
      label: item.description,
    };
  });

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h1>Danh sách vật tư</h1>
        </Col>
        <Col>
          <Space>
            <Select
              placeholder="Lọc theo loại"
              style={{ width: 160 }}
              allowClear
              onChange={(value) => setFilter(value)}
              options={listOption}
            ></Select>
            <Input.Search
              placeholder="Tìm theo tên sản phẩm"
              allowClear
              onSearch={(value) => setSearchText(value)}
              style={{ width: 220 }}
            />
          </Space>
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredData}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title={"Sửa số liệu tồn kho"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="vatTu"
            label="Tên vật tư"
            rules={[{ required: true, message: "Vui lòng nhập tên vật tư!" }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="gia"
            label="Giá"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="soLuong"
            label="Số lượng"
            rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListVatTu;
