import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../components/Login";
import TaiKhoanform from "../components/taiKhoan/TaiKhoanForm"
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
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon:  <FaRegAddressBook />,
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
              onClick: () => navigate("/sanpham"),
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
              onClick: () => navigate("/dangnhap"),
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
              <Route path="/dangnhap" element={<Login />} />
              <Route path="/taikhoan" element={<TaiKhoanform />} />
              <Route path="/nhanvien" element={<NhanVienList />} />
              <Route path="/nhanvien/them" element={<NhanVienForm />} />
              <Route path="/khachhang" element={<KhachHangList />} />
              <Route path="/sanpham" element={<SanPhamList />} />
              <Route path="/sanpham/them" key={31} element={<SanPhamForm />} />
              <Route path="/sanpham/edit" key={32} element={<SanPhamForm />} />
              <Route path="/donhang" element={<DonHangList />} />
              <Route path="/donhang/taodon" element={<DonHangForm />} />
              <Route path="/donhang/:id" element={<DonHangCT />} />
              <Route path="/quytrinh" element={<QuyTrinhList />}/>
              <Route path="/congdoan" element={<CongDoanList />}/>
              <Route path="/congviec/thietke" key={61} element={<NhanViecForm />}/>
              <Route path="/congviec/sanxuat" key={62} element={<NhanViecForm />}/>
            </Routes>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashBoardPage;
