import { Form, Modal, Select } from "antd";
import React, { useEffect } from "react";

function ModalPhanPhoi({
  isModalOpen,
  listXuong,
  listKhu,
  handleOk,
  handleCancel,
}) {
  const [form] = Form.useForm(); // ✅ fix ở đây
  const chucVuId = Number(localStorage.getItem("chucVu") || 0); // ✅ ép kiểu về số

  const optionXuong = listXuong.map((item) => ({
    label: item.tenXuong,
    value: item.id,
  }));

  const optionKhu = listKhu.map((item) => ({
    label: item.ten,
    value: item.id,
  }));

  const handleOkForm = () => {
    form.validateFields().then((values) => {
      handleOk(values);
    });
  }

  useEffect(() => {
  if (isModalOpen) {
    form.resetFields();
  }
}, [isModalOpen]);

  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOkForm}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        {chucVuId === 1 && (
          <Form.Item name="xuong" label="Xưởng nhận đơn">
          <Select options={optionXuong} />
        </Form.Item>)}
        
          <Form.Item name="khu" label="Khu nhận đơn">
            <Select options={optionKhu} />
          </Form.Item>
        
      </Form>
    </Modal>
  );
}

export default ModalPhanPhoi;
