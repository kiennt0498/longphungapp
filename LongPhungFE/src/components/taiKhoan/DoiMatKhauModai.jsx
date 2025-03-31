import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

const DoiMatKhauModai = ({ show, close, change }) => {
  const [form] = Form.useForm(); 
  const [loading, setLoading] = useState(false);

  
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); 
      setLoading(true);
      await change(values); 
      setLoading(false);
      form.resetFields(); 
      close(); 
    } catch (error) {
      console.error("Lỗi form:", error);
    }
  };

  return (
    <Modal
      title="Đổi mật khẩu"
      open={show}
      onOk={handleSubmit} 
      confirmLoading={loading} 
      onCancel={close}
      okText="Xác nhận"
      cancelText="Hủy"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="matKhau"
          label="Mật khẩu cũ"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu cũ" />
        </Form.Item>
        <Form.Item
          name="matKhauMoi"
          label="Mật khẩu mới"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name="xacNhan"
          label="Xác nhận mật khẩu"
          dependencies={["matKhauMoi"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("matKhauMoi") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Mật khẩu xác nhận không khớp");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DoiMatKhauModai;
