import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, Tooltip, Popconfirm, InputNumber } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CongDoanService from "../../services/CongDoanService";
import { addCD, deleteCD, setList, updateCD } from "../../redux/slide/CongDoanSlice";
import NhanVienSerivce from "../../services/NhanVienService";
import { toast } from "react-toastify";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CongDoanList = () => {
  const service = new CongDoanService();
  const serviceNV = new NhanVienSerivce()

  const congDoans = useSelector((state) => state.CongDoan.congDoans);
  const congDoan = useSelector((state) => state.CongDoan.congDoan);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStage, setEditingStage] = useState(null);
  const [nvSanXuat, setNvSanXuat] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages = async () => {
    try {
        const res = await service.getListCD();
    if (res.status === 200) {
      dispatch(setList(res.data));
    }
    } catch (error) {
     console.log(error);
        
    }
  };



  const handleSave = async (values) => {
    setLoading(true);
    try {
        const newData = {
            ...values,  nhanVien: { id: values.nhanVien }
        }
      if (editingStage) {
        const res = await service.updateCD(newData);
        if(res.status === 200){
            dispatch(updateCD(res.data));
        }
      } else {
        const res = await service.insterCD(newData);
        if(res.status === 200){
            console.log(res.data);
            
          dispatch(addCD(res.data));
      }
    }
      setModalVisible(false);
      toast.success("Lưu thành công", { position: "top-center" });
    } catch (error) {
      console.log(error);
      toast.error("Lưu thất bại",{ position: "top-center" });
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
      toast.error("Xóa thất bại",{ position: "top-center" });
    }
    
  };

  const columns = [
    { title: "Mã công đoạn", dataIndex: "id", key: "id" },
    { title: "Tên công đoạn", dataIndex: "tenCongDoan", key: "tenCongDoan" },
    { title: "Giá phụ liệu", dataIndex: "giaMuaNguyenLieu", key: "giaMuaNguyenLieu" },
    { title: "Khấu hao máy", dataIndex: "khauHaoMay" , key: "khauHaoMay"},
    { title: "Công nhân viên", dataIndex: "congNV" , key: "congNV"},
    { title: "Hệ số thu mua", dataIndex: "heSoThuMua" , key: "heSoThuMua"},
    { title: "Hệ số tiền công", dataIndex: "heSoTienCong" , key: "heSoTienCong"},
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
                form.setFieldsValue({...record});
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
      <Table
        columns={columns}
        dataSource={congDoans}
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
            <Form.Item
                name="id"
                label="ID"
                hidden>
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
           <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="khauHaoMay"
            label="Khấu hao máy"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            
          >
           <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="congNV"
            label="Công nhân viên"
            rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            
          >
           <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="heSoThuMua"
            label="Hệ số thu mua"
            rules={[{ required: true, message: "Vui lòng nhập hệ số" }]}
            
          >
           <InputNumber style={{ width: "100%" }} />
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
