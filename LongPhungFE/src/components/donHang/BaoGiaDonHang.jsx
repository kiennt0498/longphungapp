import React, { use, useEffect, useState } from "react";
import {
  Card,
  Table,
  Typography,
  Button,
  Space,
  Tag,
  InputNumber,
  Form,
  Row,
  Col,
  Divider,
  Input,
  Tooltip,
  Popconfirm,
  Select,
  Checkbox,
} from "antd";
import ModalDonHang from "./ModalDonHang";
import { CiCirclePlus } from "react-icons/ci";
import { BiSolidArrowToTop } from "react-icons/bi";
import { DeleteOutlined } from "@ant-design/icons";
import MoalExcel from "../common/ModalExcel";
import { API_FILE } from "../../services/constans";
import SanPhamService from "../../services/SanPhamService";
import { capNhatGia } from "../../helpers/CongThucTinhGia";
import ExportPDF from "../common/ExportPDF";
import { formatCurrency } from "../../helpers/formatData";

const { Title, Text } = Typography;

const BaoGiaDonHang = ({ getData }) => {
  const [openDraw, setOpenDraw] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  const [tienThucTe,setTienThucTe] = useState()
  const [openExport,setOpenExport] = useState(false)
  const [check, setCheck] = useState(true);
  const API = API_FILE + "/upload/image";
  const service = new SanPhamService();
  const TAX_RATE = 0.1;

  const onOpenFile = () => {
    setOpenFile(true);
  };
  const handleCancelFile = () => {
    setOpenFile(false);
  };

  const onOpenExport = () => {
    const newData = products.map((item)=>{
      return {...item, donGia:item.gia-item.gia*discount/100}
    })
    setProducts(newData)
    setOpenExport(true);
  };
  const handleCancelExport = () => {
    setOpenExport(false);
  };
  

  const onOpen = () => {
    setOpenDraw(true);
  };
  const handleCancel = () => {
    setOpenDraw(false);
  };
  const handleOk = (data) => {
    setOpenDraw(false);
  };
  const onChangeChek = () => {
    setCheck(!check);
    if (!check) {
      setDiscount(0);
      setTienThucTe(0)
    }
  };
  const onChangeTong = (value) => {
    const subtotal = calculateSubtotal();
    const chietKhau = (subtotal - value)/subtotal*100
    setDiscount(chietKhau)
  };

  const addSp = async (data) => {
    let loiNhuan = [];
    const res = await service.getLoiNhuan(data.id);
    if (res && res.data) {
      loiNhuan = res.data;
    }

    console.log(data);
    
    const congDoans = data.quyTrinh?.quyTrinhCongDoans.map((item) => item.congDoan)

    console.log(congDoans);
    

    const newData = {
      id: data.id,
      tenSP: data.tenSP,
      ghiChu: "",
      chieuDai: 1,
      chieuRong: 1,
      gia: capNhatGia({
        quyTrinh: {congDoans: congDoans},
        nguyenVatLieus: data.nguyenVatLieus,
        loiNhuan: loiNhuan,
        chieuDai: 1,
        chieuRong: 1,
        soLuong: 1,
      }),
      donGia: capNhatGia({
        quyTrinh: {congDoans: congDoans},
        nguyenVatLieus: data.nguyenVatLieus,
        loiNhuan: loiNhuan,
        chieuDai: 1,
        chieuRong: 1,
        soLuong: 1,
      }),
      soLuong: 1,
      loiNhuan: loiNhuan,
      quyTrinh: {...data.quyTrinh ,congDoans: congDoans},
      nguyenVatLieus: data.nguyenVatLieus,
    };

    setProducts((prev) => [...prev, newData]);
  };

  
  

  const updateDai = (key, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === key
          ? {
              ...product,
              chieuDai: value || 1,
              gia: capNhatGia(product, { chieuDai: value || 1 }),
              donGia: capNhatGia(product, { chieuDai: value || 1 }),
              
            }
          : product
      )
    );
  };

  const updateRong = (key, value) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === key
          ? {
              ...product,
              chieuRong: value || 1,
              gia: capNhatGia(product, { chieuRong: value || 1 }),
              donGia: capNhatGia(product, { chieuRong: value || 1 }),
            }
          : product
      )
    );
  };

  const updateQuantity = (key, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === key
          ? {
              ...product,
              soLuong: quantity || 1,
              gia: capNhatGia(product, { soLuong: quantity || 1 }),
              donGia: capNhatGia(product, { soLuong: quantity || 1 }),
            }
          : product
      )
    );
  };

  const calculateSubtotal = () => {
    if (!Array.isArray(products)) {
      return 0;
    }
    return products.reduce(
      (sum, product) => sum + product.gia,
      0
    );
  };

  const calculateSubtotalfinaly = () => {
    if (!Array.isArray(products)) {
      return 0;
    }
    return products.reduce(
      (sum, product) => sum + (product.gia-product.gia*discount/100) * product.soLuong,
      0
    );
  };
  
  const subtotalfinaly = calculateSubtotalfinaly();
  const tax = subtotalfinaly * TAX_RATE;
  const total = subtotalfinaly + tax;

  const onChange = (value) => {
    setDiscount(value || 0);
  };

  const onRemove = (data) => {
    const newProducs = products.filter((i) => i.id !== data);
    setProducts(newProducs);
  };

  

  const finalyData = () =>{
    const newData = products.map((item)=>{
      return {...item, donGia:item.gia-item.gia*discount/100}
    })
    getData(newData,total)
  }

  const summary = (pageData) => {
    let totalDonGia = 0;
    let totalThanhTien = 0;
    let totalChietKhau = 0;
    let totalGiaConLai = 0;
    let totalTienConLai = 0;
  
    pageData.forEach(({ gia, soLuong }) => {
      const chietKhauTien = (gia * discount) / 100;
      const donGiaConLai = gia - chietKhauTien;
      const thanhTien = gia * soLuong;
      const tienConLai = donGiaConLai * soLuong;
  
      totalDonGia += gia;
      totalThanhTien += thanhTien;
      totalChietKhau += chietKhauTien;
      totalGiaConLai += donGiaConLai;
      totalTienConLai += tienConLai;
    });
  
    return (
      <Table.Summary fixed>
        <Table.Summary.Row>
          <Table.Summary.Cell index={0} colSpan={5}>
            <Text strong>TỔNG TIỀN HÀNG</Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={5} align="center">
            {formatCurrency(totalDonGia)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={6} align="center">
            <Text strong style={{ color: "#0000FF", whiteSpace: "nowrap" }}>
              {formatCurrency(totalThanhTien)}
            </Text>
          </Table.Summary.Cell>
          <Table.Summary.Cell index={7} align="center">
            {formatCurrency(totalChietKhau)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={8} align="center">
            {formatCurrency(totalGiaConLai)}
          </Table.Summary.Cell>
          <Table.Summary.Cell index={9} colSpan={2} align="center">
            <Text strong style={{ color: "#0000FF" }}>
              {formatCurrency(totalTienConLai)}
            </Text>
          </Table.Summary.Cell>
        </Table.Summary.Row>
      </Table.Summary>
    );
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "tenSP",
      key: "tenSP",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",

      render: (_, record) => <Input value={record.ghiChu} />,
    },
    {
      title: "Chiều dài(mm')",
      dataIndex: "chieuDai",
      key: "chieuDai",

      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.chieuDai}
          onChange={(value) => updateDai(record.id, value)}
          className="w-20"
        />
      ),
    },
    {
      title: "Chiều rộng(mm)",
      dataIndex: "chieuRong",
      key: "chieuRong",

      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.chieuRong}
          onChange={(value) => updateRong(record.id, value)}
          className="w-20"
        />
      ),
    },

    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",

      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.soLuong}
          onChange={(value) => updateQuantity(record.id, value)}
          className="w-20"
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "gia",
      key: "gia",

      render: (_, record) => formatCurrency(record.gia),
    },
    {
      title: "Thành tiền",
      key: "total",
      render: (_, record) => formatCurrency(record.gia * record.soLuong),
    },
    {
      title: "Chiết khấu",
      key: "discountPrime",
      render: (_, record) => formatCurrency((record.gia * discount) / 100),
    },
    {
      title: "Giá còn lại",
      key: "giaConLai",
      render: (_, record) =>
        formatCurrency(record.gia - record.gia * discount / 100),
    },
    {
      title: "Tiền còn lại",
      key: "tienConLai",
      render: (_, record) =>
        formatCurrency(
          record.gia * record.soLuong -
            ((record.gia * discount) / 100) * record.soLuong
        ),
    },
    {
      title: "",
      key: "action",

      render: (_, record) => {
        return (
          <Space>
            <Tooltip title="Xóa" color="red">
              <Popconfirm
                title="Xóa khách hàng này?"
                onConfirm={() => onRemove(record.id)}
              >
                <Button icon={<DeleteOutlined />} danger />
              </Popconfirm>
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title>Bảng giá sản phẩm</Title>
        </div>
        <Row style={{ marginBottom: "1%" }}>
          <Col span={10}>
            <Button type="primary" color="blue" variant="text" onClick={onOpen}>
              <CiCirclePlus /> Thêm sản phẩm
            </Button>
          </Col>
          <Col span={14}>
            <Checkbox onChange={onChangeChek}>Điều chỉnh giá bán</Checkbox>

            <label style={{ marginLeft: "1%" }}>Chiết khấu thực tế (%): </label>
            <InputNumber value={discount} disabled={check} onChange={onChange} />

            <label style={{ marginLeft: "1%" }}>Giá bán thực tế: </label>
            <InputNumber
              min={0}
              value={tienThucTe}
              disabled={check}
              onChange={onChangeTong}
              style={{ width: "30%" }}              
            />
          </Col>
        </Row>
        <Card className="mb-8">
          <Table
            bordered
            rowKey="id"
            columns={columns}
            dataSource={products}
            pagination={false}
            summary={summary}
          />
        </Card>

        <Divider />

        <Card style={{ padding: "2%", marginTop: "3%" }}>
          <Row style={{ marginBottom: "3%" }}>
            <Col span={6}>
              <Text>Tạm tính</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(subtotalfinaly)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: "3%" }}>
            <Col span={6}>
              <Text>Thuế VAT(10%)</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(tax)}</Text>
            </Col>
          </Row>
          <Row style={{ height: "1%" }}>
            <Col span={6}>
              <Text>Chiết khấu</Text>
            </Col>
            <Col span={10} offset={8} style={{ textAlign: "right" }}></Col>
          </Row>
          <Divider />
          <Row>
            <Col span={6}>
              <Text strong style={{ fontSize: "20px" }}>
                Tổng
              </Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text strong style={{ fontSize: "20px" }}>
                {formatCurrency(total)}
              </Text>
            </Col>
          </Row>
        </Card>

        <Divider />
        <Row gutter={1}>
          <Col span={12}><Button
            style={{ marginLeft: "80%" }}
            type="primary"
            onClick={() => finalyData()}
          >
            Lên đơn
          </Button></Col>
          <Col><Button
            
            type="primary"
            onClick={() => onOpenExport()}
          >
            Xuất file PDF
          </Button></Col>
        </Row>
      </div>
      <ModalDonHang
        open={openDraw}
        handleOk={handleOk}
        handleCancel={handleCancel}
        products={products}
        addSp={addSp}
      />
      <MoalExcel open={openFile} onCloseM={handleCancelFile} API={API} />
      <ExportPDF open={openExport} onClose={handleCancelExport} products={products} />

   
    </div>
  );
};

export default BaoGiaDonHang;
