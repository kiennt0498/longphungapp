import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { FaUserCircle } from "react-icons/fa";
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = () => (
  <div style={{padding: 20}}>
    <div className='iconlogin'>
    <FaUserCircle />
    </div>
    <Form
    name="basic"
    className='formLogin'
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Số điện thoại"
      name="sdt"
      rules={[
        {
          required: true,
          message: 'Vui lòng nhập mật khẩu',
        },
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Mật Khẩu"
      name="matKhau"
      rules={[
        {
          required: true,
          message: 'Vui lòng nhập mật khẩu',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    {/* <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Đăng nhập
      </Button>
    </Form.Item>
  </Form>
  </div>
);
export default Login;