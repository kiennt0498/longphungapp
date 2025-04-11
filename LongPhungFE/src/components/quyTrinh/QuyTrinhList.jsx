import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Select,
  Space,
  Typography,
  Table,
  Modal,
  Tooltip,
  Popconfirm,
  Row,
  Col,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormQuyTrinh from "./QTChiTiet";
import { toast } from "react-toastify";
import QuyTrinhService from "../../services/QuyTrinhService";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  addQT,
  deleteQT,
  setList,
  updateQT,
} from "../../redux/slide/QuyTrinhSlice";

const QuyTrinhList = () => {
  const service = new QuyTrinhService();

  const [form] = Form.useForm();

  const quyTrinhs = useSelector((state) => state.QuyTrinh.quyTrinhs);
  const dispatch = useDispatch();

  const [currentStep, setCurrentStep] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentProcess, setCurrentProcess] = useState(null);
  const [formData, setFormData] = useState({});
  const [listCongDoan, setListCongDoan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const processColumns = [
    {
      title: "Tên quy trình",
      dataIndex: "tenQuyTrinh",
      key: "tenQuyTrinh",
    },
    {
      title: "Số công đoạn",
      dataIndex: "congDoans",
      key: "congDoans",
      render: (congDoans) => `${congDoans?.length || 0} công đoạn`,
    },

    {
      title: "Người quản lý",
      dataIndex: "nhanNienQL",
      key: "nhanVienQL",
      render: (_, record) => `${record.nhanVienQL?.hoTen}`,
    },

    {
      title: "Hành động",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật" color="blue">
            <Button
              color="blue"
              variant="outlined"
              icon={<EditOutlined />}
              onClick={() => editProcess(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa" color="red">
            <Popconfirm
              title="Xóa khách hàng này?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Edit process
  const editProcess = (data) => {
    setCurrentProcess(data);
    setIsModalVisible(true);
    const newData = { ...data, nhanVienQL: data.nhanVienQL?.id };
    setListCongDoan(data.congDoans);
    form.setFieldsValue(newData);
  };

  const handleDelete = async (id) => {
    try {
      const res = await service.deleteQT(id);
      if (res.status === 200) {
        dispatch(deleteQT(id));
        toast.success("Xóa thành công", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Xóa thất bại", {
        position: "top-center",
      });
      console.log(error);
    }
  };

  const onNext = async () => {
    try {
      const values = await form.validateFields();
      setFormData(values);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log("Validation failed:", error);
    }
  };

  const onSubmit = async () => {
    if (listCongDoan.length === 0) {
      toast.error("Vui lòng thêm ít nhất 1 công đoạn", {
        position: "top-center",
      });
      return;
    }

    const data = {
      ...formData,
      congDoans: listCongDoan,
      nhanVienQL: { id: formData.nhanVienQL },
    };

    if (!data.id) {
      try {
        const res = await service.insterQT(data);
        if (res.status === 201) {
          dispatch(addQT(res.data));
          toast.success("Thêm mới thành công", {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("Thêm mới thất bại", {
          position: "top-center",
        });
        console.log(error);
      }
    } else {
      try {
        const res = await service.updateQT(data);
        if (res.status === 200) {
          dispatch(updateQT(res.data));
          toast.success("Cập nhật thành công", {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error("Cập nhật thất bại", {
          position: "top-center",
        });
        console.log(error);
      }
    }

    form.resetFields();
    setCurrentStep(0);
    setListCongDoan([]);
  };

  const getDataList = async () => {
    try {
      const res = await service.getListQT();
      if (res.status === 200) {
        dispatch(setList(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  const filteredQuyTrinhs = quyTrinhs.filter((quyTrinh) =>
    (quyTrinh.tenQuyTrinh || "").toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const processModal = (
    <Modal
      title={currentProcess ? "Chỉnh sửa quy trình" : "Tạo quy trình mới"}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
        setCurrentProcess(null);
        form.resetFields();
      }}
      footer={null}
      width={800}
    >
      <FormQuyTrinh
        quytrinh={currentProcess}
        form={form}
        listCongDoan={listCongDoan}
        setListCongDoan={setListCongDoan}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        onNext={onNext}
        onSubmit={onSubmit}
      />
    </Modal>
  );

  return (
    <div >
      <Card
      title="Danh sách quy trình"
      
    >
      <Space direction="vertical" style={{ width: "100%", marginTop: 10 }}>
        <Row>
          <Col span={11} style={{ marginLeft:"2%" }}>
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </Col>
        </Row>
        <Table
          dataSource={filteredQuyTrinhs}
          columns={processColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Space>
      {processModal}
    </Card>
    </div>
  );
};

export default QuyTrinhList;
