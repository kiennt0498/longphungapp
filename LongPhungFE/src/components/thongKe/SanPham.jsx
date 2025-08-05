import { Button, Col, Row, Table } from "antd";
import React, { use, useEffect, useState } from "react";
import ThongKeService from "../../services/ThongKeService";
import { formatCurrency } from "../../helpers/formatData";
import { API_FILE } from "../../services/constans";
import { PlusOutlined } from "@ant-design/icons";

function SanPham() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState([]);

  const locale = {
  triggerDesc: "Bấm để sắp xếp giảm dần",
  triggerAsc: "Bấm để sắp xếp tăng dần",
  cancelSort: "Bấm để hủy sắp xếp",
};
  // Initialize the service

  const service = new ThongKeService();

  

  const fetchData = async () => {
    try {
      const res = await service.getThongKeSanPham();
      console.log(res);
      res && res.data && setData(res.data);
      res && res.data && setFilters(res.data.map((item, index) => ({
        text: item.tenSP,
        value: item.tenSP,
      })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data from the service and set it to state

    fetchData();
  }, []);

  const downFileExcel = () => {
      window.location.href = API_FILE+"/download/bao-cao-san-pham";
    }

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1, // Automatically generate index as STT
    },
    { title: "Tên sản phẩm", dataIndex: "tenSP", key: "tenSP",
      filters: filters,
      onFilter: (value, record) => record.tenSP.includes(value),
      filterSearch: true,
     },
    {
  title: "Số lượng bán ra",
  dataIndex: "soLuong",
  key: "soLuong",
  align: "center",
  sorter: {
    compare: (a, b) => a.soLuong - b.soLuong,
    multiple: 1,
  },
},
{
  title: "Doanh thu",
  dataIndex: "doanhThu",
  key: "doanhThu",
  align: "center",
  sorter: {
    compare: (a, b) => a.doanhThu - b.doanhThu,
    multiple: 2,
  },
  render: (text) => formatCurrency(text),
},
{
  title: "Chi phí",
  dataIndex: "giaGoc",
  key: "giaGoc",
  align: "center",
  sorter: {
    compare: (a, b) => a.giaGoc - b.giaGoc,
    multiple: 3,
  },
  render: (text) => formatCurrency(text),
},
{
  title: "Lợi nhuận",
  dataIndex: "loiNhuan",
  key: "loiNhuan",
  align: "center",
  sorter: {
    compare: (a, b) => a.loiNhuan - b.loiNhuan,
    multiple: 1,
  },
  render: (text) => formatCurrency(text),
},
  ];
  return (
    <>
      <h1>Thống kê sản phẩm</h1>
       <Row>
        <Col span={12}>
          <Button
            style={{ marginBottom: "1%" }}
            color="green"
            variant="solid"
            icon={<PlusOutlined />}
            onClick={() => downFileExcel()}>
            Xuất excel
          </Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="stt"
        locale={locale}
      />
    </>
  );
}

export default SanPham;
