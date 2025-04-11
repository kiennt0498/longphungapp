import { Button, Card, Col, Empty, Popconfirm, Row, Tooltip } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ModalChotDon from "./ModalChotDon";
import { IoMdTrash } from "react-icons/io";
import DonHangService from "../../services/DonHangService"


const DonHangTabsXN = ({ listXN, format, showModalHuy }) => {
  const service = new DonHangService()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState({});
  const [products, setProducts] = useState([])

  const showModal = (data) => {
    getHoaDonCT(data.maDonHang)
    setBill(data)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getHoaDonCT = async (id)=>{
    try {
      const res = await service.getDonHangCT(id)
      if(res && res.data){
        setProducts(res.data)
      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  if (listXN.length === 0) {
    return <Empty />;
  }
  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[5, 5]}>
        {listXN.map((item) => (
          <Col span={6} key={item.maDonHang}>
            <Card
              title={item.maDonHang}
              extra={
                <Row>
                  <Col span={11}>
                    <Popconfirm
                      title="Hủy đơn"
                      description="Bạn thực sự muốn hủy đơn nàynày?"
                      onConfirm={()=>showModalHuy(item.id)}
                      okText="Xác nhận"
                      cancelText="Không"
                    >
                      <Tooltip title="Hủy đơn hàng" color="red">
                        <Button
                          color="red"
                          variant="outlined"
                         
                        >
                          <IoMdTrash />
                        </Button>
                      </Tooltip>
                    </Popconfirm>
                  </Col>
                </Row>
              }
              style={{ padding: "3%", width: "100%" }}
            >
              <p>
                Khách hàng:{" "}
                {item.khachHang ? item.khachHang.tenKhachHang : "N/A"}
              </p>
              <p>
                Số điện thoại: {item.khachHang ? item.khachHang.sdt : "N/A"}
              </p>
              <p>Ngày chốt đơn: {item.ngayChotDon}</p>
              <p>Ngày giao hàng: {item.ngayGiaoHang}</p>
              <p>Giá: {format(item.gia)}</p>
              <p>Trạng thái: {item.trangThai}</p>

              <Row>
                <Button
                  onClick={() => showModal(item)}
                  style={{ width: "100%" }}
                  type="primary"
                >
                  Chốt đơn hàng
                </Button>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      <ModalChotDon
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        data={bill}
        products={products}
      />
    </div>
  );
};

export default DonHangTabsXN;
