import React, { use, useEffect, useState } from "react";
import { Form, Input, Button, Table, Descriptions } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import DonHangService from "../../services/DonHangService";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";

const DonHangCT = () => {
  const service = new DonHangService();
  const donHang = useSelector((state) => state.DonHang.donHang);
  const { id } = useParams();
  const navigate = useNavigate();

  const [sanPhams, setSanPhams] = useState([]);
  const columns = [
    {
      title: "Mã sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (text) => <span>{text.id}</span>,
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (text) => <span>{text.tenSP}</span>,
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: "Giá",
      dataIndex: "sanPham",
      key: "sanPham",
      render: (text) => <span>{text.gia}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (text) => <span>{text}</span>,
    },
  ];

  const getData = async () => {
    try {
      const res = await service.getDonHangCT(id);
      if (res.status === 200) {
        console.log(res.data);
        setSanPhams(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Button type="primary" variant="outlined" onClick={onBack}>
        <FaArrowLeft />
      </Button>
      <Descriptions title={<h2>Chi tiết đơn hàng</h2>} bordered>
        <Descriptions.Item label="Mã đơn hàng">
          {donHang.maDonHang}
        </Descriptions.Item>
        <Descriptions.Item label="Tên khách hàng">
          {donHang.khachHang.tenKhachHang}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {donHang.khachHang.sdt}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày nhận đơn">
          {donHang.ngayChotDon}
        </Descriptions.Item>
        <Descriptions.Item label="Ngày giao đơn">
          {donHang.ngayGiaoHang}
        </Descriptions.Item>
        <Descriptions.Item label="Tình trạng đơn">
          {donHang.trangThai}
        </Descriptions.Item>
      </Descriptions>

      <Table
        dataSource={sanPhams}
        columns={columns}
        pagination={false}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};

export default DonHangCT;
