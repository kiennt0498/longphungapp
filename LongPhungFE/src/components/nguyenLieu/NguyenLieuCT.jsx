import {
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
} from "antd";
import { Option } from "antd/es/mentions";
import React, { useEffect, useState } from "react";
import SanPhamService from "../../services/SanPhamService";
import { toast } from "react-toastify";
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";

dayjs.locale("vi");

function NguyenLieuCT({ open, handleOK, handleCancel, data }) {
  const [form] = Form.useForm();
  const [doViTinh, setDoViTinh] = useState([]);
  const [chatLieu, setChatLieu] = useState([]);
  const serviceSP = new SanPhamService();

  const getData = async () => {
    const res = await serviceSP.getDonVi();

    const resTruong = await serviceSP.getTruong();

    setChatLieu(resTruong.data.chatLieuSP);
    setDoViTinh(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const optionLoai = data.map((item) => {
    return { value: item.name, label: item.description };
  });

  const optionDV = doViTinh.map((item) => {
    return { value: item.id, label: item.ten };
  });
  const optionChatLieu = chatLieu.map((item) => {
    return { value: item.id, label: item.ten };
  });

  const onOk = async () => {
    try {
      const data = await form.validateFields();
      handleOK(data);
    } catch (error) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      console.log(error);
    }
  };

  return (
    <ConfigProvider locale={locale}>
      <Modal open={open} onOk={onOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" onFinish={handleOK}>
          <Form.Item
            name="tenNguyenLieu"
            label="Tên nguyên/phụ liệu"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="loai" label="Loại" rules={[{ required: true }]}>
            <Select
              options={optionLoai}
              placeholder="VD: Nguyên liệu, phụ liệu"
            />
          </Form.Item>

          <Form.Item
            name="doVitinh"
            label="Đơn vị tính"
            rules={[{ required: true, message: "Vui lòng chọn đơn vị!" }]}
          >
            <Select options={optionDV} placeholder="VD: kg, mét, cuộn,..." />
          </Form.Item>

          <Form.Item
            name="soLuong"
            label="Số lượng cần mua"
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="kichThuoc" label="Kích thước / Quy cách">
            <Input placeholder="VD: dài 10cm, dày 2mm" />
          </Form.Item>

          <Form.Item name="mauSac" label="Màu sắc">
            <Input />
          </Form.Item>

          <Form.Item
            name="chatLieu"
            label="Chất liệu"
            rules={[{ required: true, message: "Vui lòng chọn chất liệu!" }]}
          >
            <Select options={optionChatLieu} />
          </Form.Item>

          <Form.Item name="tieuChuan" label="Tiêu chuẩn chất lượng">
            <Input placeholder="VD: ISO, ROHS,..." />
          </Form.Item>

          <Form.Item
            name="hanThuMua"
            label="Ngày cần hàng"
            rules={[{ required: true }]}
          >
            <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
          </Form.Item>

          <Form.Item name="giaDuTinh" label="Giá tham khảo (VND)">
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="ghiChu" label="Ghi chú">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}

export default NguyenLieuCT;
