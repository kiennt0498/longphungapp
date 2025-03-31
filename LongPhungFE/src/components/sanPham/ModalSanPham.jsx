import { Button, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";

const ModalSanPham = ({ open, onClose, choose ,nhomSP,theLoaiSP,chatLieuSP}) => {
  const [form] = Form.useForm();

  const onOK = async () => {
    const data = await form.validateFields()
   console.log(data);
   
  };

  const listNhomSP = (nhomSP ?? []).map((item)=>({
    value: item,
    label: item,
  }))
  const listTheLoaiSP = (theLoaiSP ?? []).map((item)=>({
    value: item,
    label: item,
  }))
  const listChatLieuSP = (chatLieuSP ?? []).map((item)=>({
    value: item,
    label: item,
  }))

  return (
    <>
      <Modal
        title={choose ? "Thêm nhóm sản phẩm" : "Thêm đơn vị tính"}
        open={open}
        onOk={onOK}
        onCancel={onClose}
      >
        {choose ? (<Form name="basic" layout="vertical" className="Form" form={form}>
          <Form.Item label="nhóm sản phẩm" name = "nhomSP">
            <Select
              
              allowClear
              options={listNhomSP}
              placeholder="select it"
            />
          </Form.Item>
          <Form.Item label="Thể loại sản phẩm" name = "theLoaiSP">
            <Select
              
              allowClear
              options={listTheLoaiSP}
              placeholder="select it"
            />
          </Form.Item>
          <Form.Item label="chất liệu sản phẩm" name = "chatLieuSP">
            <Select
             

              allowClear
              options={listChatLieuSP}
              placeholder="select it"
            />
          </Form.Item>
        </Form>) : (<Form name="basic" layout="vertical" className="Form" form={form}>
            <Form.Item name="ten" label="Đơn vị tính">
            <Input  title="Đơn vị tính" placeholder="Nhập đơn vị tính" rules={[{ required: true, message: "Vui lòng nhập đơn vị tính!" }]}/>
            </Form.Item>
        </Form>) }
      </Modal>
    </>
  );
};

export default ModalSanPham;
