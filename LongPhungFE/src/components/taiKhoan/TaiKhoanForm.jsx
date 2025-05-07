import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { FaUserCircle } from "react-icons/fa";
import DoiMatKhauModai from "./DoiMatKhauModai";
import AccService from "../../services/AccService";
import { useDispatch, useSelector } from "react-redux";
import { setTaiKhoan } from "../../redux/slide/TaiKhoanSlice";

const TaiKhoanForm = () => {
  const [disabledForm, setDisabledForm] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const userName = "NV00001";
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const acc = useSelector((state) => state.TaiKhoan.taiKhoan);
  const service = new AccService();

  const onCancel = () => {
    setModalShow(false);
  };

  const onChangePass = (values) => {
    console.log(values);
  };

  const getData = async () => {
    try {
      const res = await service.getAcc(userName);
      dispatch(setTaiKhoan(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData(); // Fetch data from API
  }, []);

  useEffect(() => {
    if (acc && form) {
      form.setFieldsValue(acc); // Only update form fields when acc data is available
    }
  }, [acc, form]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
            <Button type="primary" onClick={() => setModalShow(true)}>
              Đổi mật khẩu
            </Button>
          </Row>
          <Form
            layout="vertical"
            form={form}
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

            <Form.Item label="Số điện thoại" name={['taiKhoan', 'sdt']}>
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
        show={modalShow}
        close={onCancel}
        change={onChangePass}
      />
    </>
  );
};
export default TaiKhoanForm;
