import React, { useState, useEffect } from "react";
import AccService from "../../services/AccService";
import { Card, Col, Divider, Row, Statistic, Table } from "antd";
import { formatDate } from "../../helpers/formatData";

function LichSuLamViec() {
  const [lichSuLamViec, setLichSuLamViec] = useState([]);
  const [congViecDaNhan, setCongViecDaNhan] = useState(0);
  const [congViecHoanThanh, setCongViecHoanThanh] = useState(0);
  const [congViecBiHuy, setCongViecBiHuy] = useState(0);
  const [tongKPI, setTongKPI] = useState(0);

  const sampleData = [
    {
      stt: 1,
      congViec: "Lập kế hoạch dự án",
      ngayLam: "2025-04-25",
      ngayHT: "2025-04-26",
      tinhTrang: "Hoàn thành",
      KPI: 8.5,
    },
    {
      stt: 2,
      congViec: "Nghiên cứu thị trường",
      ngayLam: "2025-04-24",
      ngayHT: "2025-04-24",
      tinhTrang: "Đã nhận",
      KPI: 7.0,
    },
    {
      stt: 3,
      congViec: "Tạo báo cáo tài chính",
      ngayLam: "2025-04-20",
      ngayHT: "2025-04-22",
      tinhTrang: "Hoàn thành",
      KPI: 9.0,
    },
    {
      stt: 4,
      congViec: "Phân tích dữ liệu khách hàng",
      ngayLam: "2025-04-18",
      ngayHT: "2025-04-19",
      tinhTrang: "Bị hủy",
      KPI: 0.0,
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Công việc",
      dataIndex: "congViec",
      key: "congViec",
    },
    {
      title: "Ngày làm",
      dataIndex: "ngayLam",
      key: "ngayLam",
      render: (_, record) => formatDate(record.ngayLam)
    },
    {
      title: "Ngày hoàn thành",
      dataIndex: "ngayHT",
      key: "ngayHT",
      render: (_, record) => formatDate(record.ngayHT)
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrang",
      key: "tinhTrang",
      render: (text) => {
        let color = "";
        let fontWeight = "normal";
        if (text === "Hoàn thành") {
          color = "green";
          fontWeight = "bold";
        } else if (text === "Đã nhận") {
          color = "orange";
        } else if (text === "Bị hủy") {
          color = "red";
          fontWeight = "bold";
        }

        return <span style={{ color, fontWeight }}>{text}</span>;
      },
    },
    {
      title: "KPI",
      dataIndex: "KPI",
      key: "KPI",
      render: (text) => (
        <span style={{ color: text >= 8 ? "green" : "red" }}>{text}</span>
      ),
    },
  ];

  useEffect(() => {
    // Sử dụng dữ liệu mẫu trong khi phát triển
    const res = sampleData;
    setLichSuLamViec(res);

    // Cập nhật các chỉ số thống kê từ dữ liệu mẫu
    const congViecDaNhan = res.filter(item => item.tinhTrang === 'Đã nhận').length;
    const congViecHoanThanh = res.filter(item => item.tinhTrang === 'Hoàn thành').length;
    const congViecBiHuy = res.filter(item => item.tinhTrang === 'Bị hủy').length;
    const tongKPI = res
      .filter(item => item.tinhTrang === "Hoàn thành")
      .reduce((sum, item) => sum + (item.KPI || 0), 0);

    setCongViecDaNhan(congViecDaNhan);
    setCongViecHoanThanh(congViecHoanThanh);
    setCongViecBiHuy(congViecBiHuy);
    setTongKPI(tongKPI.toFixed(2));
  }, []);

  return (
    <>
      <Row gutter={16} style={{ textAlign: "center" }}>
        <Col span={6}>
          <Card >
            <Statistic
              title={<strong>Công việc đã nhận</strong>}
              value={congViecDaNhan}
              
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card >
            <Statistic
              title={<strong>Công việc hoàn thành</strong>}
              value={congViecHoanThanh}
              valueStyle={{ color: 'green' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card >
            <Statistic
              title={<strong>Công việc bị hủy</strong>}
              value={congViecBiHuy}
              valueStyle={{ color: 'red' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card >
            <Statistic
              title={<strong>Tổng KPI</strong>}
              value={tongKPI}
              precision={2}
              style={{ color: "#faad14", fontWeight: "bold" }}
            />
          </Card>
        </Col>
      </Row>
      <Divider />
      <Table columns={columns} dataSource={lichSuLamViec} />
    </>
  );
}

export default LichSuLamViec;
