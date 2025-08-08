import React, { use, useEffect, useMemo, useState } from "react";
import { GrGroup } from "react-icons/gr";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Col, Dropdown, Layout, Menu, Row, Space } from "antd";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Login from "../components/Login";

import NhanVienList from "../components/nhanVien/NhanVienList";
import NhanVienForm from "../components/nhanVien/NhanVienForm";
import KhachHangList from "../components/khachHang/KhachHangList";
import { FaBox, FaRegAddressBook, FaWarehouse } from "react-icons/fa6";
import SanPhamList from "../components/sanPham/SanPhamList";

import DonHangList from "../components/donHang/DonHangList";
import QuyTrinhList from "../components/quyTrinh/QuyTrinhList";
import {
  MdInventory,
  MdPrecisionManufacturing,
  MdReceiptLong,
} from "react-icons/md";
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
import AuthService from "../services/AuthService";
import PrivateRoute from "../components/common/PrivateRoute";
import QuanLyChatLuong from "../components/chatLuong/QuanLyChatLuong";
import TongKPIList from "../components/thongKe/TongKPIList";
import QuangCao from "../components/thongKe/SanPham";
import SanPham from "../components/thongKe/SanPham";
import PPDonHang from "../components/danhSachDon/PPDonHang";
import KhachHangTiemNang from "../components/khachHang/KhachHangTiemNang";
import FormKhaoSat from "../components/khachHang/FormKhaoSat/FormKhaoSat";

const { Header, Sider, Content } = Layout;
const DashBoardPage = () => {
  const username = localStorage.getItem("username");
  const chucVu = localStorage.getItem("chucVu");
  const boPhan = localStorage.getItem("boPhan");
  const authService = new AuthService();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const filterConfig = {
    khachhang: [],
    nhanvien: ["boPhan", "chucVu", "tacVu"],
    sanpham: [],
    nguyenlieu: ["dateRange"],
  };

  const location = useLocation();
  const baseRoute = location.pathname.split("/")[1];
  const dynamikeys = useMemo(() => filterConfig[baseRoute] || [], [baseRoute]);

  const isFullWith = ["donhang", "kho", "", "taikhoan", "thongke","khach-hang-tiem-nang","khao-sat-khach-hang","sanpham/them"].includes(baseRoute);

  const itemMenu = [
    {
      key: "1",
      icon: <FaRegAddressBook />,
      label: "Khách hàng",
      children: [
        {
          key: "1.1",
          label: "Danh sách khách hàng",
          onClick: () => navigate("/khachhang")
        },
        {
          key: "1.2",
          label: "Khách hàng tiềm năng",
          onClick: () => navigate("/khach-hang-tiem-nang")
        },
      ],
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
          label: "Tạo đơn hàng",
          onClick: () => navigate("/donhang/tao-don"),
        },
        {
          key: "5.3",
          label: "Chốt đơn",
          onClick: () => navigate("/donhang/chot-don"),
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
      onClick: () => navigate("/congviec"),
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
     {
      key: "thongke",
      icon: <FaWarehouse />,
      label: "Báo cáo",
      children: [
        {
          key: "thongkesanpham",
          label: "Sản phẩm",
          onClick: () => navigate("thongke/sanpham"),
        },
        {
          key: "thongkeVL",
          label: "Nguyên vật liệu",
          onClick: () => navigate("thongke/vatlieu"),
        },
        {
          key: "thongkeKPI",
          label: "KPI",
          onClick: () => navigate("thongke/kpi"),
        },
        
      ],
    },
    {
      key: "phanphoi",
      icon: <FaWarehouse />,
      label: "Phân phối đơn",
      onClick: () => navigate("/phanphoi"),
    }
  ];

  const allowedLabelsByRole = {
    8: ["Khách hàng", "Sản phẩm", "Đơn hàng", "Công việc"],
    3: ["Công việc"],
  };

  console.log(boPhan);
  

  const isQuanLy = chucVu === 1;

  const filteredItems = isQuanLy
    ? itemMenu
    : itemMenu.filter((item) =>
        (allowedLabelsByRole[boPhan] || []).includes(item.label)
      );

 const items = useMemo(() => {
  if (username) {
    return [
      {
        key: "9.1",
        label: "Tài khoản",
        onClick: () => navigate("/taikhoan"),
      },
      {
        key: "9.2",
        label: "Lịch sử làm việc",
        onClick: () => navigate("/taikhoan/lich-su-lam-viec"),
      },
      {
        key: "9.4",
        label: "Đăng xuất",
        onClick: () => {
          localStorage.clear();
          authService.logout();
          sessionStorage.setItem("isLogin", false);
          navigate("/login");
        },
      },
    ];
  } else {
    return [
      {
        key: "9.3",
        label: "Đăng nhập",
        onClick: () => navigate("/login"),
      },
    ];
  }
}, [username, navigate]);

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
              // items={filteredItems}
              items={itemMenu}
              style={{ minWidth: 0 }}
            />
          </Col>

          {/* Tài khoản */}
          <Col style={{ flex: "0 0 200px", textAlign: "right" }}>
            <Dropdown menu={{ items }} trigger={["click"]}>
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
              width: isFullWith ? "100%" : undefined, // thêm animation mượt
            }}
          >
            <div className="content-panel">
              <Routes>
                {/* Auth */}
                <Route index path="/" element={<LichSuLamViec />} />
                <Route path="/login" element={<Login />} />

                {/* Tài khoản */}
                <Route path="taikhoan">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <TaiKhoanForm />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="lich-su-lam-viec"
                    element={
                      <PrivateRoute>
                        <LichSuLamViec />
                      </PrivateRoute>
                    }
                  />
                </Route>

                {/* Nhân viên */}
                <Route path="nhanvien">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <NhanVienList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="them"
                    element={
                      <PrivateRoute>
                        <NhanVienForm />
                      </PrivateRoute>
                    }
                  />
                </Route>

                {/* Khách hàng */}
                <Route
                  path="khachhang"
                  element={
                    <PrivateRoute>
                      <KhachHangList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/khach-hang-tiem-nang"
                  element={
                    <PrivateRoute>
                      <KhachHangTiemNang />
                    </PrivateRoute>
                  }
                />

                <Route
                  path="/khao-sat-khach-hang/:phone"
                  element={
                    <PrivateRoute>
                      <FormKhaoSat />
                    </PrivateRoute>
                  }
                />

                {/* Sản phẩm */}
                <Route path="sanpham">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <SanPhamList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="them"
                    element={
                      <PrivateRoute>
                        <FormSanPham />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="edit"
                    element={
                      <PrivateRoute>
                        <FormSanPham />
                      </PrivateRoute>
                    }
                  />
                </Route>

                {/* Đơn hàng */}
                <Route path="donhang">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <DonHangList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="chot-don"
                    element={
                      <PrivateRoute>
                        <DonHangForm />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path=":id"
                    element={
                      <PrivateRoute>
                        <DonHangCT />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="chat-luong"
                    element={
                      <PrivateRoute>
                        <QuanLyChatLuong />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="tao-don"
                    element={
                      <PrivateRoute>
                        <FormKhaoSat />
                      </PrivateRoute>
                    }
                  />
                </Route>
                

                {/* Quy trình & Công đoạn */}
                <Route
                  path="quytrinh"
                  element={
                    <PrivateRoute>
                      <QuyTrinhList />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="congdoan"
                  element={
                    <PrivateRoute>
                      <CongDoanList />
                    </PrivateRoute>
                  }
                />

                {/* Công việc */}
                <Route path="congviec"
                  element={
                      <PrivateRoute>
                        <NhanViecForm />
                      </PrivateRoute>
                    }
                />
                  
                    
                
                
                {/*Nguyên liệu */}
                <Route path="nguyenlieu">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <ListNguyenLieu />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="thu-mua"
                    element={
                      <PrivateRoute>
                        <ThuMuaList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="danh-sach-gia/:id"
                    element={
                      <PrivateRoute>
                        <ListGiaNguyenLieu />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route path="kho">
                  <Route
                    index
                    element={
                      <PrivateRoute>
                        <ListVatTu />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="xuat-nhap"
                    element={
                      <PrivateRoute>
                        <XuatNhapKho />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="phieu"
                    element={
                      <PrivateRoute>
                        <Phieu />
                      </PrivateRoute>
                    }
                  />
                </Route>

                <Route path="thongke">
                  <Route
                    index
                    path="sanpham"
                    element={
                      <PrivateRoute>
                        <SanPham />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="vatlieu"
                    element={
                      <PrivateRoute>
                        <QuangCao />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="kpi"
                    element={
                      <PrivateRoute>
                        <TongKPIList />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route
                  path="phanphoi"
                  element={
                    <PrivateRoute>
                      <PPDonHang/>
                    </PrivateRoute>
                  }
                />
              </Routes>
            </div>
          </Content>
          
        </Layout>
      </div>
      <FloatButtonPage />
    </Layout>
  );
};
export default DashBoardPage;
