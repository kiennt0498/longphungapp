import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { FaUserCircle } from "react-icons/fa";
import DoiMatKhauModai from "./DoiMatKhauModai";
import withRouter from "../../helpers/withRouter";

const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};



const TaiKhoanForm = () => {
  const [disabledForm, setDisabledForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const onCancel = () =>{
    setModalShow(false)
  }

  const onChangePass = (values)=> {
    console.log(values);
    
  }
  return (
    <>
      <h1 className="heardthongtin"> Thông tin tài khoản</h1>
      <Row>
        <Col span={12}>
          <div className="icontaikhoan">
            <FaUserCircle />
          </div>
        </Col>
        <Col span={12}>
          <Row className="narBar">
            <Checkbox
              
              checked={disabledForm}
              onChange={(e) => setDisabledForm(e.target.checked)}
            >
              Sửa thông tin
            </Checkbox>
            <Button type="primary" onClick={()=>setModalShow(true)}>Đổi mật khẩu</Button>
          </Row>
          <Form
            layout="vertical"
            className="Form"
            disabled={!disabledForm}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Mã nhân viên" name="id">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Họ và tên"
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="diaChi">
              <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="taiKhoan">
              <Input disabled />
            </Form.Item>

            <Form.Item label="Bộ phận" name="boPhan">
              <Input disabled />
            </Form.Item>

            <Form.Item label={null} hidden={!disabledForm}>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <DoiMatKhauModai
        show = {modalShow}
        close = {onCancel}
        change = {onChangePass}
      />
    </>
  );
};
export default TaiKhoanForm;
