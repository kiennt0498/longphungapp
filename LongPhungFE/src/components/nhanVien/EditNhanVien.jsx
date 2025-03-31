import { Button, Drawer, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";

const EditNhanVien = ({ onClose, open, onChange, data, bp, cv, tv }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data); // Cập nhật dữ liệu vào form khi data thay đổi
    }
  }, [data, form]);

  const dataBP = bp.map((i) => {
    const data1 = {
      label: `${i.description}`,
      value: i.name,
    };
    return data1;
  });

  const dataCV = cv.map((i) => {
    const data2 = {
      label: `${i.description}`,
      value: i.name,
    };
    return data2;
  });

  const dataTV = tv.map((i) => {
    const data3 = {
      label: `${i.description}`,
      value: i.name,
    };
    return data3;
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      onChange(values);
      form.resetFields();
      onClose();
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <Drawer
      title="Cập nhật thông tin nhân"
      width={500}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Hủy</Button>
          <Button type="primary" onClick={handleSubmit}>
            OK
          </Button>
        </Space>
      }
    >
      <Form
        layout="vertical"
        className="Form"
        form={form}
        initialValues={data}
        key={data.id}
      >
        <Form.Item
          label="Mã nhân viên"
          key={data.id}
          name="id"
          initialValue={data.id}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Họ và tên"
          name="hoTen"
          initialValue={data.hoTen}
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ và tên",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="diaChi" initialValue={data.diaChi}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name={["taiKhoan", "sdt"]}
          initialValue={data.taiKhoan ? data.taiKhoan.sdt : ""}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Bộ phận"
          name="boPhan"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn bộ phận",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn bộ phận"
            optionFilterProp="label"
            options={dataBP}
          />
        </Form.Item>
        <Form.Item
          label="Chức vụ"
          name="chucVu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn chức vụ",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn chức vụ"
            optionFilterProp="label"
            options={dataCV}
          />
        </Form.Item>
        <Form.Item
          label="Tác vụ"
          name="tacVu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn tác vụ",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="chọn tác vụ"
            optionFilterProp="label"
            options={dataTV}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditNhanVien;
