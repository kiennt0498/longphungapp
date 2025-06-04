import React, { useState, useEffect } from "react";
import AccService from "../../services/AccService";
import { Card, Col, Divider, Row, Statistic, Table } from "antd";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import { useSelector } from "react-redux";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

function LichSuLamViec() {
  const [lichSuLamViec, setLichSuLamViec] = useState([]);
  const [congViecDaNhan, setCongViecDaNhan] = useState(0);
  const [congViecHoanThanh, setCongViecHoanThanh] = useState(0);
  const [congViecBiHuy, setCongViecBiHuy] = useState(0);
  const [kpiDaNhan, setKPIDaNhan] = useState(0);
  const [kpiNhanThem, setKPINhanThem] = useState(0);
  const [kpiBiTru, setKPIBiTru] = useState(0);
  const [tongKPI, setTongKPI] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const service = new AccService();
  const maNV = localStorage.getItem("maNV");

  const getData = async () => {
    const data = {
      maNV: maNV,
      start: "2025-05-01",
      end: "2025-05-31",
    };

    try {
      const res = await service.getListCV(data);
      setLichSuLamViec(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(lichSuLamViec);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Công việc",
      dataIndex: "congViecCT",
      key: "congViecCT",
      render: (_, record) => {
        const congViec = record.congViecCT;
        const congDoan = !congViec
          ? "Lên"
          : congViec.congDoan
          ? congViec.congDoan.tenCongDoan
          : "Thiết kế";

        const maDon = congViec?.donHangCT?.donHang?.maDonHang || "";

        return (
          <label>
            {congDoan} đơn {maDon}
          </label>
        );
      },
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "ngayHT",
      key: "ngayHT",
      render: (_, record) => formatDate(record.ngayHoanThanh),
    },
    {
      title: "Tình trạng",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (value) => {
        let newText = "";
        let color = "";
        let fontWeight = "normal";

        if (value === "DA_GIAO") {
          newText = "Đã giao";
          color = "green";
          fontWeight = "bold";
        } else if (value === "DANG_SAN_XUAT") {
          newText = "Đang sản xuất";
          color = "orange";
        } else if (value === "HUY") {
          newText = "Bị hủy";
          color = "red";
          fontWeight = "bold";
        } else {
          newText = value;
        }

        return <span style={{ color, fontWeight }}>{newText}</span>;
      },
    },
    {
      title: "KPI",
      dataIndex: "kpi",
      key: "kpi",
      render: (_, record) => <span>{formatCurrency(record.kpi)}</span>,
    },
  ];

  useEffect(() => {
    const daNhan = lichSuLamViec.length;

    const hoanThanhList = lichSuLamViec.filter(
      (item) => item.trangThai === "DA_GIAO"
    );

    const biHuy = lichSuLamViec.filter(
      (item) => item.trangThai === "HUY"
    ).length;

    const kpiNhan = hoanThanhList.reduce((sum, item) => {
      return sum + (item.kpi || 0); // phòng khi item.kpi bị null hoặc undefined
    }, 0);

    const tongKPI = kpiNhan + kpiNhanThem - kpiBiTru;

    setCongViecDaNhan(daNhan);
    setCongViecHoanThanh(hoanThanhList.length);
    setCongViecBiHuy(biHuy);
    setKPIDaNhan(kpiNhan);
    setKPINhanThem(kpiNhanThem);
    setKPIBiTru(kpiBiTru);
    setTongKPI(tongKPI.toFixed(2));
  }, [lichSuLamViec]);

  useEffect(() => {
    setIsLoading(true);
    getData();
    setIsLoading(false);
  }, []);

  return (
    <>
      <Row gutter={[16,16]} style={{ textAlign: "center" }}>

        <Col span={6}>
          <Card>
            <Statistic
              title={<strong>Công việc đã nhận</strong>}
              value={congViecDaNhan}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={<strong>Công việc hoàn thành</strong>}
              value={congViecHoanThanh}
              valueStyle={{ color: "green" }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title={<strong>Công việc bị hủy</strong>}
              value={congViecBiHuy}
              valueStyle={{ color: "red" }}
            />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic
              title={<strong>KPI yêu cầu</strong>}
              value={congViecBiHuy}
              valueStyle={{ color: "yellowgreen" }}
              precision={2}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>

         <Col span={6}>
          <Card>
            <Statistic
              title={<strong>KPI nhận được</strong>}
              value={kpiDaNhan}
              precision={2}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </Card>
        </Col>

         <Col span={6}>
          <Card>
            <Statistic
              title={<strong>KPI nhận thêm</strong>}
              value={kpiNhanThem}
              precision={2}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "blue" }}
            />
          </Card>
        </Col>

         <Col span={6}>
          <Card>
            <Statistic
              title={<strong>KPI bị trừ</strong>}
              value={kpiBiTru}
              precision={2}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "#FFFF00" }}
            />
          </Card>
        </Col>
        
        <Col span={6}>
          <Card>
            <Statistic
              title={<strong>Tổng đã nhận</strong>}
              value={tongKPI}
              precision={2}
              formatter={(value) => formatCurrency(Number(value))}
              valueStyle={{ color: "green" }}
            />
          </Card>
        </Col>

        
      </Row>
      <Divider />
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={lichSuLamViec}
        rowKey={"id"}
      />
    </>
  );
}

export default LichSuLamViec;
