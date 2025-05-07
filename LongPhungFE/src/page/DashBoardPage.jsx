import React, { useState } from "react";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { GrGroup } from "react-icons/gr";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Dropdown,
  Image,
  Layout,
  Menu,
  Row,
  Space,
  theme,
} from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../components/Login";

import NhanVienList from "../components/nhanVien/NhanVienList";
import NhanVienForm from "../components/nhanVien/NhanVienForm";
import KhachHangList from "../components/khachHang/KhachHangList";
import { FaBox, FaRegAddressBook, FaWarehouse } from "react-icons/fa6";
import SanPhamList from "../components/sanPham/SanPhamList";

import DonHangList from "../components/donHang/DonHangList";
import QuyTrinhList from "../components/quyTrinh/QuyTrinhList";
import { MdInventory, MdPrecisionManufacturing, MdReceiptLong } from "react-icons/md";
import CongDoanList from "../components/congDoan/CongDoanList";
import DonHangCT from "../components/donHang/DonHangCT";
import DonHangForm from "../components/donHang/DonHangForm";
import NhanViecForm from "../components/congViec/NhanViecForm";
import FormSanPham from "../components/sanPham/FormSanPham";
import TaiKhoanForm from "../components/taiKhoan/TaiKhoanForm";
import ListNguyenLieu from "../components/nguyenLieu/ListNguyenLieu";
import ThuMuaList from "../components/nguyenLieu/ThuMuaList";
import ListGiaNguyenLieu from "../components/nguyenLieu/ListGiaNguyenLieu";
import XuatNhapKho from "../components/kho/XuatNhapKho";
import Phieu from "../components/kho/Phieu";
import ListVatTu from "../components/kho/ListVatTu";
import FloatButtonPage from "./FloatButtonPage";
import LichSuLamViec from "../components/taiKhoan/LichSuLamViec";
import BangLocData from "../components/common/BangLocData";
import { FaTasks } from "react-icons/fa";

const { Header, Sider, Content } = Layout;
const DashBoardPage = () => {
  const username = "NV00001";

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const filterConfig = {
    khachhang: [],
    nhanvien: ["boPhan","chucVu","tacVu"],
    sanpham: [],
    nguyenlieu: ["dateRange"]
  }

  const location = useLocation();
  const baseRoute = location.pathname.split("/")[1];
  const dynamikeys = filterConfig[baseRoute] || []

  const isFullWith = ['donhang', 'kho',''].includes(baseRoute)

  const items =[
        {
          key: "9.1",
          label: "Tài khoản",
          onClick: () => navigate("/taikhoan"),
        },
        {
          key: "9.2",
          label: "Lịch sử làm việc",
          onClick: () => navigate("/taiKhoan/lich-su-lam-viec"),
        },
        // ...username && {
        //   key: "9.3",
        //   label: "Đăng nhập",
        //   onClick: () => navigate("/"),
        // },
        {
          key: "9.4",
          label: "Đăng xuất",
          onClick: () => {
            localStorage.removeItem("username");
            navigate("/");
          },
        },
      ]
    

  return (
    <Layout>
      <Header
        style={{ display: "flex", alignItems: "center", padding: "0 20px" }}
      >
        <Row style={{ display: "flex", width: "100%" }} align="middle">
          {/* Logo */}
          <Col flex="100px" style={{ display: "flex", alignItems: "center" }}>
            <div className="logo">
              <a href="/">
                <img
                  src="/image/logoWeb.jpg"
                  alt="Logo"
                  style={{
                    height: "50px", // Chiều cao cố định
                    objectFit: "contain", // Giữ tỉ lệ gốc
                  }}
                />
              </a>
            </div>
          </Col>

          {/* Menu Chính */}
          <Col flex="auto">
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
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
                  onClick: () => navigate("/sanpham"),
                },
                {
                  key: "4",
                  icon: <MdInventory />,
                  label: "Nguyên liệu",
                  children: [
                    {
                      key: "4.1",
                      label: "Danh sách nguyên liệu",
                      onClick: () => navigate("/nguyenlieu"),
                    },
                    {
                      key: "4.2",
                      label: "Danh sách đơn thu mua",
                      onClick: () => navigate("/nguyenlieu/thu-mua"),
                    },
                  ],
                },
                {
                  key: "5",
                  icon: <MdReceiptLong />,
                  label: "Đơn hàng",
                  children: [
                    {
                      key: "5.1",
                      label: "Danh sách đơn hàng",
                      onClick: () => navigate("/donhang"),
                    },
                    {
                      key: "5.2",
                      label: "Tạo đơn",
                      onClick: () => navigate("/donhang/tao-don"),
                    },
                  ],
                },
                {
                  key: "6",
                  icon: <MdPrecisionManufacturing />,
                  label: "Quản lý quy trình",
                  children: [
                    {
                      key: "6.1",
                      label: "Quy trình",
                      onClick: () => navigate("/quytrinh"),
                    },
                    {
                      key: "6.2",
                      label: "Công đoạn",
                      onClick: () => navigate("/congdoan"),
                    },
                  ],
                },
                {
                  key: "7",
                  icon: <FaTasks />,
                  label: "Công việc",
                  children: [
                    {
                      key: "7.1",
                      label: "Thiết kế",
                      onClick: () => navigate("/congviec/thiet-ke"),
                    },
                    {
                      key: "7.2",
                      label: "Sản xuất",
                      onClick: () => navigate("/congviec/san-xuat"),
                    },
                    {
                      key: "7.3",
                      label: "In",
                      onClick: () => navigate("/congviec/in"),
                    },
                  ],
                },
                {
                  key: "8",
                  icon: <FaWarehouse />,
                  label: "Quản lý kho",
                  children: [
                    {
                      key: "8.1",
                      label: "Danh sách tồn kho",
                      onClick: () => navigate("/kho"),
                    },
                    {
                      key: "8.2",
                      label: "Lịch sử xuất nhập",
                      onClick: () => navigate("/kho/phieu"),
                    },
                    {
                      key: "8.3",
                      label: "Xuất nhập kho",
                      onClick: () => navigate("/kho/xuat-nhap"),
                    },
                  ],
                },
              ]}
              style={{ minWidth: 0 }}
            />
          </Col>

          {/* Tài khoản */}
          <Col style={{ flex: "0 0 200px", textAlign: "right" }}>
            <Dropdown menu={{items}} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                <UserOutlined />
                  Tài khoản
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
      <div style={{ padding: "2%" }}>
        <Layout>
          <Content
            style={{
              padding: "24px",
              background: "#fff",
              flex: 1,
              overflow: "auto",
              transition: "all 0.3s", 
              width: isFullWith? "100%" : undefined// thêm animation mượt
            }}
          >
            <div className="content-panel">
              <Routes>
                {/* Auth */}
                <Route path="/" element={<Login />} />

                {/* Tài khoản */}
                <Route path="taikhoan">
                  <Route index element={<TaiKhoanForm />} />
                  <Route path="lich-su-lam-viec" element={<LichSuLamViec />} />
                </Route>

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
                  <Route path="tao-don" element={<DonHangForm />} />
                  <Route path=":id" element={<DonHangCT />} />
                </Route>

                {/* Quy trình & Công đoạn */}
                <Route path="quytrinh" element={<QuyTrinhList />} />
                <Route path="congdoan" element={<CongDoanList />} />

                {/* Công việc */}
                <Route path="congviec">
                  <Route
                    path="thiet-ke"
                    element={<NhanViecForm tacVu="THIET_KE" />}
                  />
                  <Route
                    path="san-xuat"
                    element={<NhanViecForm tacVu="SAN_XUAT" />}
                  />
                  <Route path="in" element={<NhanViecForm tacVu="IN" />} />
                </Route>
                {/*Nguyên liệu */}
                <Route path="nguyenlieu">
                  <Route index element={<ListNguyenLieu />} />
                  <Route path="thu-mua" element={<ThuMuaList />} />
                  <Route
                    path="danh-sach-gia/:id"
                    element={<ListGiaNguyenLieu />}
                  />
                </Route>
                <Route path="kho">
                  <Route index element={<ListVatTu />} />
                  <Route path="xuat-nhap" element={<XuatNhapKho />} />
                  <Route path="phieu" element={<Phieu />} />
                </Route>
              </Routes>
            </div>
          </Content>
          {!isFullWith && (
            <Sider
              width={300}
              style={{
                background: "#fff",
                overflow: "hidden",
                borderLeft: "1px solid #f0f0f0",
                display: "flex",
                flexDirection: "column",
              }}
              breakpoint="md"
              collapsedWidth="0"
              onCollapse={(collapsed) => {
                setCollapsed(collapsed);
              }}
            >
              <div style={{ flex: 1, overflowY: "auto" }}>
                <BangLocData dynamicKeys={dynamikeys} />
              </div>
            </Sider>
          )}
        </Layout>
      </div>
      <FloatButtonPage />
    </Layout>
  );
};
export default DashBoardPage;
