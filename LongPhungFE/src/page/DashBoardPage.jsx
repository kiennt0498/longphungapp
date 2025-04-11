import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Form, Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import TaiKhoanform from "../components/taiKhoan/TaiKhoanForm";
import NhanVienList from "../components/nhanVien/NhanVienList";
import NhanVienForm from "../components/nhanVien/NhanVienForm";
import KhachHangList from "../components/khachHang/KhachHangList";
import { FaBox, FaRegAddressBook } from "react-icons/fa6";
import SanPhamList from "../components/sanPham/SanPhamList";
import SanPhamForm from "../components/sanPham/SanPhamForm";
import DonHangList from "../components/donHang/DonHangList";
import QuyTrinhList from "../components/quyTrinh/QuyTrinhList";
import { MdPrecisionManufacturing, MdReceiptLong } from "react-icons/md";
import CongDoanList from "../components/congDoan/CongDoanList";
import DonHangCT from "../components/donHang/DonHangCT";
import DonHangForm from "../components/donHang/DonHangForm";
import NhanViecForm from "../components/congViec/NhanViecForm";
import FormSanPham from "../components/sanPham/FormSanPham";
import TaiKhoanForm from "../components/taiKhoan/TaiKhoanForm";
import ListNguyenLieu from "../components/nguyenLieu/ListNguyenLieu";

const { Header, Sider, Content } = Layout;
const DashBoardPage = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["8"]}
          items={[
            {
              key: "1",
              icon: <FaRegAddressBook />,
              label: "Khách hàng",
              onClick: () => navigate("/khachhang"),
            },
            {
              key: "2",
              icon: <GrGroup />,
              label: "Nhân viên",
              onClick: () => navigate("/nhanvien"),
            },
            {
              key: "3",
              icon: <FaBox />,
              label: "Sản phẩm",
              children:[
                {key: "3.1", label: "Danh sách sản phẩm",onClick: () => navigate("/sanpham")},
                {key: "3.2", label: "Nguyên liệu",onClick: () => navigate("/nguyenlieu")}
              ],
              
            },
            {
              key: "4",
              icon: <MdReceiptLong />,
              label: "Đơn hàng",
              children: [
                {
                  key: "4.1",
                  label: "Danh sách đơn hàng",
                  onClick: () => navigate("/donhang"),
                },
                {
                  key: "4.2",
                  label: "Tạo đơn",
                  onClick: () => navigate("/donhang/taodon"),
                },
              ],
            },
            {
              key: "5",
              icon: <MdPrecisionManufacturing />,
              label: "Quản lý quy trình",
              children: [
                {
                  key: "5.1",
                  label: "Quy trình",
                  onClick: () => navigate("/quytrinh"),
                },
                {
                  key: "5.2",
                  label: "Công đoạn",
                  onClick: () => navigate("/congdoan"),
                },
              ],
            },
            {
              key: "6",
              icon: <MdPrecisionManufacturing />,
              label: "Công việc",
              children: [
                {
                  key: "6.1",
                  label: "Thiết kế",
                  onClick: () => navigate("congviec/thietke"),
                },
                {
                  key: "6.2",
                  label: "Sản xuất",
                  onClick: () => navigate("congviec/sanxuat"),
                },
              ],
            },
            {
              key: "7",
              icon: <UserOutlined />,
              label: "Tài khoản",
              onClick: () => navigate("/taikhoan"),
            },
            {
              key: "8",
              icon: <AiOutlineLogin />,
              label: "Đăng nhập",
              onClick: () => navigate("/"),
            },

            {
              key: "9",
              icon: <AiOutlineLogout />,
              label: "Đăng xuất",
              onClick: () => navigate("/dangxuat"),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="content-panel">
            <Routes>
              {/* Auth */}
              <Route path="/" element={<Login />} />

              {/* Tài khoản */}
              <Route path="taikhoan" element={<TaiKhoanForm />} />

              {/* Nhân viên */}
              <Route path="nhanvien">
                <Route index element={<NhanVienList />} />
                <Route path="them" element={<NhanVienForm />} />
              </Route>

              {/* Khách hàng */}
              <Route path="khachhang" element={<KhachHangList />} />

              {/* Sản phẩm */}
              <Route path="sanpham">
                <Route index element={<SanPhamList />} />
                <Route path="them" element={<FormSanPham />} />
                <Route path="edit" element={<FormSanPham />} />
              </Route>

              {/* Đơn hàng */}
              <Route path="donhang">
                <Route index element={<DonHangList />} />
                <Route path="taodon" element={<DonHangForm />} />
                <Route path=":id" element={<DonHangCT />} />
              </Route>

              {/* Quy trình & Công đoạn */}
              <Route path="quytrinh" element={<QuyTrinhList />} />
              <Route path="congdoan" element={<CongDoanList />} />

              {/* Công việc */}
              <Route path="congviec">
                <Route path="thietke" element={<NhanViecForm />} />
                <Route path="sanxuat" element={<NhanViecForm />} />
              </Route>
              {/*Nguyên liệu */}
              <Route path="nguyenlieu" >
                <Route index element={<ListNguyenLieu />}/>
                <Route path="thumua" element={<thuMuaList />}/>
               
              </Route>
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashBoardPage;
