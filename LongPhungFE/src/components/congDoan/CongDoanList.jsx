import { useState, useEffect, useRef } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tooltip,
  Popconfirm,
  InputNumber,
  Row,
  Col,
  Checkbox,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import CongDoanService from "../../services/CongDoanService";
import {
  addCD,
  deleteCD,
  setList,
  updateCD,
} from "../../redux/slide/CongDoanSlice";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

const CongDoanList = () => {
  const service = new CongDoanService();

  const congDoans = useSelector((state) => state.CongDoan.congDoans);
  const congDoan = useSelector((state) => state.CongDoan.congDoan);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [isCheck, setIsCheck] = useState(false);
  const [congNV, setCongNV] = useState(1);

  const [form] = Form.useForm();

  const fieldMapping = {
    search: "tenCongDoan",
  };

  const { filters } = useFilters();
  const filtersData = filterData(congDoans, filters, fieldMapping, []);

  useEffect(() => {
    fetchStages();
  }, []);

  useEffect(() => {
  const data = congDoans[0];
  if (data && data.dieuChinh !== congNV) {
    setCongNV(data.dieuChinh);
  }
}, [congDoans]);

  const fetchStages = async () => {
    try {
      const res = await service.getListCD();
      if (res.status === 200) {
        dispatch(setList(res.data));
      }
    } catch (error) {
      toast.error("Lấy danh sách thất bại", { position: "top-center" });
      console.log(error);
    }
  };

  const onChange = () => {
    setIsCheck(!isCheck);
  };

  const onSubmit = () => {
    service
      .updateCongNV(congNV)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Cập nhật thành công", { position: "top-center" });
          fetchStages();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Cập nhật thất bại", { position: "top-center" });
      });
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const newData = {
        ...values,
        nhanVien: { id: values.nhanVien },
      };
      if (editingStage) {
        const res = await service.updateCD(newData);
        if (res.status === 200) {
          dispatch(updateCD(res.data));
        }
      } else {
        const res = await service.insterCD(newData);
        if (res.status === 200) {
          console.log(res.data);

          dispatch(addCD(res.data));
        }
      }
      setModalVisible(false);
      toast.success("Lưu thành công", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error("Lưu thất bại", { position: "top-center" });
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const res = await service.deleteCD(id);
      if (res.status === 200) {
        dispatch(deleteCD(id));
        toast.success("Xóa thành công", { position: "top-center" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Xóa thất bại", { position: "top-center" });
    }
  };

  const columns = [
    { title: "Mã công đoạn", dataIndex: "id", key: "id" },
    { title: "Tên công đoạn", dataIndex: "tenCongDoan", key: "tenCongDoan" },
    {
      title: "Giá phụ liệu",
      dataIndex: "giaMuaNguyenLieu",
      key: "giaMuaNguyenLieu",
    },
    { title: "Khấu hao máy", dataIndex: "khauHaoMay", key: "khauHaoMay" },
    { title: "Hệ số thu mua", dataIndex: "heSoThuMua", key: "heSoThuMua" },
    { title: "Công nhân viên", dataIndex: "congNV", key: "congNV" },
    {
      title: "Hệ số tiền công",
      dataIndex: "heSoTienCong",
      key: "heSoTienCong",
    },
    { title: "KPI gốc", dataIndex: "kpiGoc", key: "kpiGoc" },
    // { title: "Người quản lý", dataIndex: "nhanVien", render: (nhanVien) => nhanVien.hoTen },
    {
      title: "Hành động",
      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật" color="blue">
            <Button
              color="blue"
              variant="outlined"
              icon={<EditOutlined />}
              onClick={() => {
                setEditingStage(record);
                form.setFieldsValue({ ...record });
                setModalVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Xóa" color="red">
            <Popconfirm
              title="Xóa công đoạn này?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle">
        {/* Bên trái */}
        <Col>
          <Button
            type="primary"
            style={{ marginBottom: "1%" }}
            onClick={() => {
              setEditingStage(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Thêm Công Đoạn
          </Button>
        </Col>

        {/* Bên phải */}
        <Col>
          <Row gutter={8} align="middle">
            <Col>
              <Checkbox onChange={onChange}>Chỉnh sửa</Checkbox>
            </Col>
            <Col>
              <InputNumber
                min={1}
                value={congNV}
                onChange={(value) => {
                  setCongNV(value);
                }}
                style={{ width: "100%" }}
                disabled={!isCheck}
                addonAfter="%"
              />
            </Col>
            {isCheck && (
              <Col>
                <Button onClick={onSubmit} type="primary">
                  Xác nhận
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={filtersData}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingStage ? "Chỉnh sửa công đoạn" : "Thêm công đoạn"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSave} layout="vertical">
          <Form.Item name="id" label="ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="tenCongDoan"
            label="Tên công đoạn"
            rules={[{ required: true, message: "Vui lòng nhập tên công đoạn" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="giaMuaNguyenLieu"
            label="Giá phụ liệu"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="khauHaoMay"
            label="Khấu hao máy"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="heSoThuMua"
            label="Hệ số thu mua"
            rules={[{ required: true, message: "Vui lòng nhập hệ số" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="kpiGoc"
            label="KPI gốc"
            rules={[{ required: true, message: "Vui lòng kpi cho nhân viên" }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="heSoTienCong"
            label="Hệ số tiền công nhân viên"
            rules={[{ required: true, message: "Vui lòng nhập hệ số" }]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CongDoanList;
