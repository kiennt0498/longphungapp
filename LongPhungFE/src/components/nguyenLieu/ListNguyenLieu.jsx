import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from "antd";
import { FaCartPlus } from "react-icons/fa6";
import { EditOutlined, PlusCircleFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import NguyenLieuService from "../../services/NguyenLieuService";
import NguyenLieuCT from "./NguyenLieuCT";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

const ListNguyenLieu = () => {
  const service = new NguyenLieuService();
  const [form] = Form.useForm();
  const maNV = localStorage.getItem("maNV");

  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCTModalOpen, setIsCTModalOpen] = useState(false);

  const [listNL, setListNL] = useState([]);
  const [loaiVatTu, setLoaiVatTu] = useState([]);
  const [chatLieuOptions, setChatLieuOptions] = useState([]);
  const [donThuMua, setDonThuMua] = useState(null);

  const { filters } = useFilters();
  const filteredData = filterData(listNL, filters, { search: "ten" }, []);

  useEffect(() => {
    fetchNguyenLieu();
    fetchOptions();
  }, []);

  const fetchNguyenLieu = async () => {
    try {
      const res = await service.getListNL();
      setListNL(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOptions = async () => {
    setIsLoading(true);
    try {
      const [resLoai, resChatLieu] = await Promise.all([
        service.getListLoaiVatTu(),
        service.getListChatLieu(),
      ]);
      if (resLoai.status === 200) setLoaiVatTu(resLoai.data);
      if (resChatLieu.status === 200) setChatLieuOptions(resChatLieu.data);
    } catch (error) {
      toast.warning(`Lỗi: ${error.message}`);
    }
    setIsLoading(false);
  };

  const handleUpdateSubmit = async () => {
    const values = form.getFieldsValue();
    const updatedData = {
      ...values,
      ten: values.vatTu,
      chatLieu: { id: values.chatLieu },
      giaNhap: parseFloat(values.gia),
      heSoBu: parseFloat(values.heSoBu),
      heSoThuMua: parseFloat(values.heSoThuMua),
    };
    
    try {
      const res = await service.updateVatTu(updatedData);
      if (res.status === 200) {
        toast.success("Cập nhật thành công");
        setIsEditModalOpen(false);
        fetchNguyenLieu();
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch (err) {
      toast.error("Lỗi khi cập nhật");
      console.error(err);
    }
  };

  const handleThuMua = async (record) => {
    try {
      const res = await service.getDonThuMuaByVT(record.id);
      setDonThuMua(res.data);
    } catch (error) {
      if (error.response?.status === 400) {
        setDonThuMua({
          tenNguyenLieu: record.ten,
          loai: record.loaiVatTu,
          doVitinh: record.doViTinh,
          chatLieu: record.chatLieu,
          giaDuTinh: record.giaNhap,
        });
      } else {
        toast.error(`Lỗi: ${error.message}`);
      }
    }
    setIsCTModalOpen(true);
  };

  const handleCreateDTM = async (data) => {
    const payload = {
      ...data,
      doViTinh: { id: data.doViTinh },
      chatLieu: { id: data.chatLieu },
      nguoiLenDon: { id: maNV },
    };

    try {
      const res = await service.insterDTM(payload);
      if (res.status === 201) {
        toast.success("Thêm mới thành công");
        setIsCTModalOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (record) => {
    form.setFieldsValue({
      id: record.id,
      vatTu: record.ten,
      gia: record.giaNhap,
      heSoBu: record.heSoBu,
      heSoThuMua: record.heSoThuMua,
      chatLieu: record.chatLieu.id,
    });
    setIsEditModalOpen(true);
  };

  const columns = [
    { title: "Id", dataIndex: "id" },
    { title: "Tên", dataIndex: "ten" },
    { title: "Giá nhập", dataIndex: "giaNhap" },
    { title: "Hệ số bù", dataIndex: "heSoBu" },
    { title: "Hệ số thu mua", dataIndex: "heSoThuMua" },
    {
      title: "Chất liệu",
      dataIndex: ["chatLieu", "ten"],
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <Space>
          <Tooltip title="Mua nguyên liệu" color="green">
            <Button icon={<FaCartPlus />} color="green" variant="outlined" onClick={() => handleThuMua(record)} />
          </Tooltip>
          <Tooltip title="Cập nhật" color="blue">
            <Button icon={<EditOutlined />} color="primary" variant="outlined" onClick={() => openEditModal(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <h1>Danh sách vật tư</h1>
        </Col>
        <Col>
          <Button
            type="primary"
            icon={<PlusCircleFilled />}
            onClick={() => setIsCTModalOpen(true)}
          >
            Thêm nguyên liệu mới
          </Button>
        </Col>
      </Row>

      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />

      <NguyenLieuCT
        open={isCTModalOpen}
        handleCancel={() => setIsCTModalOpen(false)}
        handleOK={handleCreateDTM}
        data={loaiVatTu}
        donTM={donThuMua}
      />

      <Modal
        title="Sửa số liệu tồn kho"
        open={isEditModalOpen}
        onOk={handleUpdateSubmit}
        onCancel={() => setIsEditModalOpen(false)}
        confirmLoading={isLoading}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="vatTu" label="Tên vật tư" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gia" label="Giá nhập" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="heSoBu" label="Hệ số bù" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="heSoThuMua" label="Hệ số thu mua" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="chatLieu" label="Chất liệu" rules={[{ required: true }]}>
            <Select placeholder="Chọn chất liệu">
              {chatLieuOptions.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListNguyenLieu;
