import React, { useEffect, useState } from "react";
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
} from "antd";
import ModalDonHang from "./ModalDonHang";
import { CiCirclePlus } from "react-icons/ci";
import { BiSolidArrowToTop } from "react-icons/bi";
import { DeleteOutlined} from "@ant-design/icons";
import MoalExcel from "../common/ModalExcel";
import { API_FILE } from "../../services/constans";




const { Title, Text } = Typography;

const BaoGiaDonHang = ( {getData}) => {
  const [openDraw, setOpenDraw] = useState(false)
  const [openFile, setOpenFile] = useState(false)
  const TAX_RATE = 0.1; 
  const [discount, setDiscount] = useState(0)
  const [products, setProducts] = useState([]);
  const API = API_FILE+"/upload/image"

  const onOpenFile = () =>{
    setOpenFile(true)
  }
  const handleCancelFile = ()=>{
    setOpenFile(false)
  }

  const onOpen = () =>{
    setOpenDraw(true)
  }
  const handleCancel = ()=>{
    setOpenDraw(false)
  }
  const handleOk = (data) =>{
    setOpenDraw(false)
    console.log(data);
    
  }

  const addSp = (data) =>{
    const newData = {
      id: data.id,
      tenSP: data.tenSP,
      ghiChu: "",
      chieuDai: 1,
      chieuRong: 1,
      gia: data.gia,
      giaGoc: data.gia,
      soLuong: 1
    }

    setProducts((prev) => [...prev, newData]);
 
    
  }

  const getGiaChietkhau = (gia,soLuong) =>{
    if(soLuong > 1000){
      return gia-gia*0.05
    }
    if(soLuong > 500){
      return gia-gia*0.03
    }
    return gia
  }
  

  const updateQuantity = (key, quantity) => {
    setProducts(
      products.map((product) =>
        product.id === key ? { ...product, soLuong: quantity || 1,gia: getGiaChietkhau(product.gia, quantity) } : product
      )
    );
  };
  const updateDai = (key, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === key
          ? {
              ...product,
              chieuDai: quantity || 1,
              gia: product.giaGoc * (quantity || 1) * product.chieuRong,
            }
          : product
      )
    );
  };
  
  const updateRong = (key, quantity) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === key
          ? {
              ...product,
              chieuRong: quantity || 1,
              gia: product.giaGoc * product.chieuDai * (quantity || 1),
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
      (sum, product) => sum + (product.gia * product.soLuong ),
      0
    );
  };

  

  
  const subtotal = calculateSubtotal()
  const tax = subtotal * TAX_RATE;
  const discountPrime =  subtotal * (discount/100) ;
  const total = subtotal + tax - discountPrime;


  const onChange = (value) =>{
    
    setDiscount(value)
  }

  const onRemove = (data)=>{
    const newProducs = products.filter(i=> i.id !== data)
    setProducts(newProducs)
  } 

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "tenSP",
      key: "tenSP",
      width: "30%",
    },
    {
      title: "Ghi chú",
      dataIndex: "ghiChu",
      key: "ghiChu",
      width: "30%",
      render: (_, record) => (
        <Input
      
          value={record.ghiChu}
        />
      )
    },
    {
      title: "Chiều dài",
      dataIndex: "chieuDai",
      key: "chieuDai",
      width: "10%",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.chieuDai}
          formatter={(value) => `${value} mm`}
          parser={(value) => value?.replace("mm", " ")}
          onChange={(value) => updateDai(record.id, value)}
          className="w-20"
        />
      ),
    },
    {
      title: "Chiều rộng",
      dataIndex: "chieuRong",
      key: "chieuRong",
      width: "10%",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.chieuRong}
          formatter={(value) => `${value} mm`}
          parser={(value) => value?.replace("mm", " ")}
          onChange={(value) => updateRong(record.id, value)}
          className="w-20"
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "gia",
      key: "gia",
      width: "10%",
      render: (_,record) => formatCurrency(record.gia),
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
      title: "Thành tiền",
      key: "total",
      width: "30%",
      render: (_, record) => formatCurrency(record.gia * record.soLuong),
    },
    {
      title: "",
      key: "action",
      
      render: (_, record) =>{
        return (<Space>
        
          <Tooltip title="Xóa" color="red">
          <Popconfirm
            title="Xóa khách hàng này?"
            onConfirm={() => onRemove(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          </Tooltip>
          <Tooltip title="Gửi thiết kế" color="blue">
          <Button color="blue" variant="outlined" icon={<BiSolidArrowToTop />} onClick={onOpenFile} />
          </Tooltip>
        </Space>)
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Title>Bảng giá sản phẩm</Title>
        </div>
        <Button type="primary" color="blue" variant="text" onClick={onOpen}><CiCirclePlus /> Thêm sản phẩm</Button>
        <Card className="mb-8">
          
          <Table
            columns={columns}
            dataSource={products}
            pagination={false}
          />
        </Card>

        <Card style={{ padding: "2%", marginTop: "3%" }}></Card>

        <Card style={{ padding: "2%", marginTop: "3%" }}>
          <Row style={{ marginBottom: "3%" }}>
            <Col span={6}>
              <Text>Tạm tính</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(subtotal)}</Text>
            </Col>
          </Row>
          <Row style={{ marginBottom: "3%" }}>
            <Col span={6}>
              <Text>Thuế VAT</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text>{formatCurrency(tax)}</Text>
            </Col>
          </Row>
          <Row style={{ height: "1%" }}>
            <Col span={6}>
              <Text>Chiết khấu</Text>
            </Col>
            <Col span={10} offset={8} style={{ textAlign: "right" }}>
              <InputNumber
                defaultValue={0}
                min={0}
                max={100}
                formatter={(value) => `${value}`}
                addonAfter="%"
                style={{width: "100px"}}
                onChange={onChange}
              />
            </Col>
          </Row>
          <Divider />
          <Row>
            <Col span={6}>
              <Text strong style={{fontSize: "20px"}}>Tổng</Text>
            </Col>
            <Col span={6} offset={12} style={{ textAlign: "right" }}>
              <Text strong style={{fontSize: "20px"}}>{formatCurrency(total)}</Text>
            </Col>
          </Row>
        </Card>

        <Divider/>
        <Row>
          <Button style={{marginLeft:"46%"}} type="primary" onClick={() =>getData(products, total)}>Lên đơn</Button>
        </Row>
      </div>
      <ModalDonHang open={openDraw} handleOk={handleOk} handleCancel={handleCancel} products={products}  addSp={addSp}/>
      <MoalExcel open={openFile} onCloseM={handleCancelFile} API={API}/>
    </div>
  );
};

export default BaoGiaDonHang;
