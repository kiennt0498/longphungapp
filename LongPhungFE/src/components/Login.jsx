import React, { use } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { FaUserCircle } from "react-icons/fa";
import AuthService from "../services/AuthService";

import { setIsLogin } from "../redux/slide/TaiKhoanSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const service = new AuthService();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const acc = { username: values.sdt, password: values.matKhau };
      const res = await service.login(acc);
      console.log(res);
      if (res.status === 200) {
        const data = res.data;
        
        localStorage.setItem("username", values.sdt);
        localStorage.setItem("name", data?.name || "");
        localStorage.setItem("maNV", data?.maNV || "");
        localStorage.setItem("chucVu", data?.chucVu || "");
        localStorage.setItem("xuong", data?.xuong || "");
        localStorage.setItem("khu", data?.khu || "");
        localStorage.setItem("boPhan", data?.boPhan || "");

        // Chỉ lưu nếu không null/undefined
        if (data?.xuong !== null && data?.xuong !== undefined)
          localStorage.setItem("xuong", data.xuong);
        else localStorage.removeItem("xuong"); // tránh lưu "null"

        if (data?.khu !== null && data?.khu !== undefined)
          localStorage.setItem("khu", data.khu);
        else localStorage.removeItem("khu");

        sessionStorage.setItem("isLogin", "true");
        dispatch(setIsLogin(data));
        toast.success("Đăng nhập thành công");
        navigate("/taikhoan/lich-su-lam-viec");
      } else {
        toast.error("Đăng nhập thất bại");
      }
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div className="iconlogin">
        <FaUserCircle />
      </div>
      <Form
        name="basic"
        className="formLogin"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Số điện thoại"
          name="sdt"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="matKhau"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
