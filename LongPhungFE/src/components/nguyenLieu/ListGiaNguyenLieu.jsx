import { Button, Card, Col, Divider, Row, Space, Table, Tooltip } from "antd";
import React, { use, useEffect, useRef, useState } from "react";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import { HiPlus } from "react-icons/hi";
import ModalNhapGia from "./ModalNhapGia";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { MdDownloadDone } from "react-icons/md";
import { API_SOCKET } from "../../services/constans";
import NguyenLieuService from "../../services/NguyenLieuService";
import { CiEdit } from "react-icons/ci";

function ListGiaNguyenLieu() {
  const [open, setOpen] = useState(false);
  const [don, setDon] = useState([]);
  const [listGia, setListGia] = useState([]);
  const [edit, setEdit] = useState({});
  const navigate = useNavigate();
  const stompClient = useRef(null);
  const service = new NguyenLieuService();
  const { id } = useParams();
  const maNV = "NV00001";

  const getDonThuMua = async (id) => {
    const res = await service.getDonThuMua(id);
    setDon(res.data);
  };

  console.log(don);
  

  useEffect(() => {
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        stompClient.current.subscribe("/topic/giathumua/" + id, (message) => {
          const newBill = JSON.parse(message.body);

          const sortBill = newBill.sort((a, b) => {
            const tongA = thanhTien(a) + a.phiVC;
            const tongB = thanhTien(b) + b.phiVC;
            if (tongA === tongB) {
              return a.phiVC - b.phiVC;
            }
            return tongA - tongB;
          });

          setListGia((prevBill) => {
            if (JSON.stringify(prevBill) !== JSON.stringify(sortBill)) {
              return sortBill;
            }
            return prevBill; // Không cập nhật nếu dữ liệu không đổi
          });
        });
        stompClient.current.publish({
          destination: "/app/getGiaThuMua",
          body: JSON.stringify(id),
        });
      },
    });
    stompClient.current.activate();
    getDonThuMua(id);

    return () => {
      stompClient.current.deactivate();
    };
  }, [id]);

  useEffect(() => {
    if (!don.hanThuMua || listGia.length === 0) return;

    const now = new Date();
    const hanThuMua = new Date(don.hanThuMua);
    if (hanThuMua <= now) {
      const giaTotNhat = listGia[0];
      console.log(giaTotNhat);
    }
  }, [listGia, don]);

  

  const onClose = () => {
    setOpen(false);
  };

  const onCreate = () => {
    setEdit({});
    onOpen();
  };

  const onOpen = () => {
    setOpen(true);
  };

  const editGia = (record) => {
    setEdit(record);
    onOpen();
  };
  const chotGia = (record) => {
    const newData = {...don, phiVanChuyen: record.phiVC, giaThuMua: record.donGia, done: true}
    
    
    try {
      if (stompClient.current) {
        stompClient.current.publish({
          destination: "/app/chotGia",
          body: JSON.stringify(newData),
        });
      }
      navigate(-1);
    } catch (error) {
      console.log(error);
      
    }
    
  };

  const columns = [
    {
      title: "Người thu mua",
      key: "nhanVien",
      dataIndex: "nhanVien",
      render: (_, record) => <p>{record.nhanVien?.hoTen || "Không có"}</p>,
    },
    {
      title: "Đơn giá",
      key: "dongia",
      dataIndex: "donGia",
      render: (value) => formatCurrency(value),
    },

    {
      title: "Thành tiền",
      key: "gia",
      render: (_, record) => formatCurrency(thanhTien(record)),
    },
    {
      title: "Phí vận chuyển",
      key: "phiVC",
      dataIndex: "phiVC",
      render: (value) => formatCurrency(value),
    },
    {
      title: "Tổng",
      key: "tong",
      render: (_, record) => formatCurrency(tongTien(record)),
    },
    {
      key: "action",
      render: (_, record) => {
        const button = []
        if (record.nhanVien.id === maNV) {
          button.push(
          
              <Tooltip title="Sửa giá thu mua" color="blue">
                <Button
                  icon={<CiEdit />}
                  color="primary"
                  variant="outlined"
                  onClick={() => editGia(record)}
                />
              </Tooltip>
          
          );
        }
        if (don?.nguoiLenDon?.id === maNV) {
          button.push(
         
              <Tooltip title="Chốt giá" color="green">
                <Button
                  icon={<MdDownloadDone />}
                  color="green"
                  variant="outlined"
                  onClick={() => chotGia(record)}
                />
              </Tooltip>
         
          );
        }
        return <Space>{button}</Space>;
      },
    },
  ];

  const columnsDH = [
    {
      title: "Tên nguyên liệu",
      dataIndex: "tenNguyenLieu",
      key: "tenNguyenLieu",
      widdth: "25%",
    },
    {
      title: "Ngày cần hàng",
      dataIndex: "hanThuMua",
      key: "hanThuMua",
      width: "25%",
      render: (value) => formatDate(value),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      width: "25%",
    },
    {
      title: "Đơn giá dự tính",
      dataIndex: "giaDuTinh",
      key: "giaDuTinh",
      width: "25%",
      render: (value) => formatCurrency(value),
    },
  ];
  const columnsCT = [
    {
      title: "Chất liệu",
      dataIndex: "chatLieu",
      key: "chatLieu",
      width: "25%",
      render: (_, record) => <p>{record.chatLieu?.ten || "Không có"}</p>,
    },

    {
      title: "Kích thước",
      dataIndex: "kichThuoc",
      key: "kichThuoc",
      width: "25%",
    },

    {
      title: "Tiêu chuẩn",
      dataIndex: "tieuChuan",
      key: "tieuChuan",
      width: "25%",
    },

    {
      title: "Màu sắc",
      dataIndex: "mauSac",
      key: "mauSac",
      width: "25%",
    },
  ];

  const onThemGia = (data) => {
    const newData = { ...data, donThuMua: don.id, maNV: maNV };
    
    if (stompClient.current) {
      stompClient.current.publish({
        destination: "/app/setGiaThuMua",
        body: JSON.stringify(newData),
      });
    }
    onClose();
  };

  const thanhTien = (record) => {
    return record.donThuMua.soLuong * record.donGia;
  };
  const tongTien = (record) => {
    return record.donThuMua.soLuong * record.donGia + record.phiVC;
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        <FaArrowLeft />
      </Button>
      <Card title="Thông tin đơn hàng">
        <Table
          columns={columnsDH}
          dataSource={[don]}
          rowKey="key"
          pagination={false}
          bordered
        />
        <Table
          columns={columnsCT}
          dataSource={[don]}
          rowKey="key"
          pagination={false}
          bordered
        />
      </Card>
      <Divider />
      <Row align="middle" justify="space-between">
        <Col>
          <h1>List Nguyên Liệu</h1>
        </Col>
        <Col>
          <Button type="primary" icon={<HiPlus />} onClick={onCreate}>
            Thêm giá thu mua
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={listGia} rowKey="key" />
      <ModalNhapGia
        open={open}
        onClose={onClose}
        onOK={onThemGia}
        edit={edit}
      />
    </div>
  );
}

export default ListGiaNguyenLieu;
