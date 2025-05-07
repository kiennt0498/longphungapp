import { Form, InputNumber, Modal } from "antd";
import React, { use, useEffect } from "react";

function ModalNhapGia({ open, onClose, onOK, edit}) {
  const [form] = Form.useForm();

  const themGia = async () =>{
    const data = await form.getFieldsValue()
    onOK(data)
  }

  const setData = () =>{
    if(edit && edit.id){
      form.setFieldsValue(edit)
      return
    }
    form.resetFields()
  }

  useEffect(()=>{
    setData()
  },[edit])

  return (
    <Modal title="Nhập giá thu mua" open={open} onCancel={onClose} onOk={themGia}>
      <Form form={form} layout="vertical">
        <Form.Item label="Đơn giá sản phẩm"  name="donGia">
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Phí vận chuyển" name="phiVC">
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalNhapGia;
