import React, { useState, useEffect } from "react";
import AccService from "../../services/AccService";
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Row,
  Statistic,
  Table,
  DatePicker,
} from "antd";
import viVN from "antd/es/locale/vi_VN";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { formatCurrency, formatDate } from "../../helpers/formatData";

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
  const [form] = Form.useForm();
  const service = new AccService();
  const maNV = localStorage.getItem("maNV");

  const getData = async () => {
    setIsLoading(true);
    try {
      const today = dayjs();
      const firstDayOfMonth = today.startOf("month");
      const res = await service.getListCV({
        maNV,
        start: firstDayOfMonth.format("YYYY-MM-DD"),
        end: today.format("YYYY-MM-DD"),
      });
      setLichSuLamViec(res.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const locData = async () => {
    const { startDate, endDate } = form.getFieldsValue();

    if (!startDate || !endDate) {
      toast.warning("Vui lòng chọn ngày bắt đầu và ngày kết thúc");
      return;
    }

    if (endDate.isBefore(startDate)) {
      toast.warning("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
      return;
    }

    setIsLoading(true);
    try {
      const res = await service.getListCV({
        maNV,
        start: startDate.format("YYYY-MM-DD"),
        end: endDate.format("YYYY-MM-DD"),
      });
      setLichSuLamViec(res.data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const daNhan = lichSuLamViec.length;
    const hoanThanhList = lichSuLamViec.filter((item) => item.trangThai === "DA_GIAO");
    const biHuy = lichSuLamViec.filter((item) => item.trangThai === "HUY").length;
    const kpiNhan = hoanThanhList.reduce((sum, item) => sum + (item.kpi || 0), 0);
    const tong = kpiNhan + kpiNhanThem - kpiBiTru;

    setCongViecDaNhan(daNhan);
    setCongViecHoanThanh(hoanThanhList.length);
    setCongViecBiHuy(biHuy);
    setKPIDaNhan(kpiNhan);
    setTongKPI(tong.toFixed(2));
  }, [lichSuLamViec]);

  const columns = [
    {
      title: "STT",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Công việc",
      render: (_, record) => {
        const congViec = record.congViecCT;
        const congDoan = congViec?.congDoan?.tenCongDoan || "Thiết kế";
        const maDon = congViec?.donHangCT?.donHang?.maDonHang || "";
        return <label>{`${congDoan} đơn ${maDon}`}</label>;
      },
    },
    {
      title: "Ngày hoàn thành",
      render: (_, record) => formatDate(record.ngayHoanThanh),
    },
    {
      title: "Tình trạng",
      dataIndex: "trangThai",
      render: (value) => {
        let text = value;
        let color = "";
        let fontWeight = "normal";

        if (value === "DA_GIAO") {
          text = "Đã giao";
          color = "green";
          fontWeight = "bold";
        } else if (value === "DANG_SAN_XUAT") {
          text = "Đang sản xuất";
          color = "orange";
        } else if (value === "HUY") {
          text = "Bị hủy";
          color = "red";
          fontWeight = "bold";
        }

        return <span style={{ color, fontWeight }}>{text}</span>;
      },
    },
    {
      title: "KPI",
      dataIndex: "kpi",
      render: (value) => <span>{formatCurrency(value)}</span>,
    },
  ];

  return (
    <ConfigProvider locale={viVN}>
      <Form form={form} layout="inline">
        <Row gutter={[16, 16]} style={{ textAlign: "center" }}>
          <Col>
            <Form.Item label="Từ" name="startDate">
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item label="Đến" name="endDate">
              <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" onClick={locData}>
              Lọc
            </Button>
          </Col>
        </Row>
      </Form>

      <Row gutter={[16, 16]} style={{ textAlign: "center", marginTop: 16 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Công việc đã nhận" value={congViecDaNhan} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Công việc hoàn thành" value={congViecHoanThanh} valueStyle={{ color: "green" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Công việc bị hủy" value={congViecBiHuy} valueStyle={{ color: "red" }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="KPI yêu cầu" value={congViecBiHuy} precision={2} valueStyle={{ color: "yellowgreen" }} formatter={(val) => formatCurrency(Number(val))} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="KPI nhận được" value={kpiDaNhan} precision={2} formatter={(val) => formatCurrency(Number(val))} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="KPI nhận thêm" value={kpiNhanThem} precision={2} valueStyle={{ color: "blue" }} formatter={(val) => formatCurrency(Number(val))} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="KPI bị trừ" value={kpiBiTru} precision={2} valueStyle={{ color: "#FFFF00" }} formatter={(val) => formatCurrency(Number(val))} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Tổng đã nhận" value={tongKPI} precision={2} valueStyle={{ color: "green" }} formatter={(val) => formatCurrency(Number(val))} />
          </Card>
        </Col>
      </Row>

      <Divider />

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={lichSuLamViec}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </ConfigProvider>
  );
}

export default LichSuLamViec;
