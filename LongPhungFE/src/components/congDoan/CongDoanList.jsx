import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, Space, Tooltip, Popconfirm } from "antd";
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
    getNhanVien();
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

  const getNhanVien = async () => {
    try {
        const res = await serviceNV.getListEmpSX();
        
    if (res.status === 200 && res.data.length > 0) {
        const data = res.data.map((item) => {
            return {
                value: item.id,
                label: item.hoTen,
            };
        });
        setNvSanXuat(data);
      
    }
    } catch (error) {
        console.log(error);
        
    }
  }


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
    { title: "Thứ tự", dataIndex: "id" },
    { title: "Tên công đoạn", dataIndex: "tenCongDoan" },

    { title: "Người quản lý", dataIndex: "nhanVien", render: (nhanVien) => nhanVien.hoTen },
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
                form.setFieldsValue({...record, nhanVien: record.nhanVien.id});
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
        rowKey="congDoans.id"
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
            name="nhanVien"
            label="Người quản lý"
            rules={[{ required: true, message: "Vui lòng nhập thời gian" }]}
          >
            <Select
              showSearch
              
              placeholder="Chọn người quản lý"
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={nvSanXuat}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CongDoanList;
