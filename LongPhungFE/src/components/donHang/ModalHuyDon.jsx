import { Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const ModalHuyDon = ({ openHuy, onCancel, onComfirm, form }) => {
  
  return (
    <Modal
      title="Lý do hủy đơn hàng"
      open={openHuy}
      onOk={onComfirm}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="lyDo"
          label="Lý do hủy"
          rules={[{ required: true, message: 'Vui lòng nhập lý do hủy' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalHuyDon;
