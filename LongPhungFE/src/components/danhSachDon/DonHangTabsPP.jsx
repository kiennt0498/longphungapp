import { Button, Card, Col, List, Row, Tag, Typography } from "antd";
import React, { use, useState } from "react";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import ModalDonCT from "../donHang/ModalDonCT";

const DonHangTabsPP = ({ listDPP, handleHoanDon }) => {
  const { Text } = Typography;
  const [bill, setBill] = useState({})
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("List PP:", listDPP);
  

  const showModal = (data) => {
    setBill(data)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };  

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listDPP}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <Card
              title={<span>{i.donHang.maDonHang}</span>}
              style={{
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Row justify="space-between">
                  <Col>Xưởng: {i.xuong.tenXuong}</Col>
                  <Col>Khu vực: {i.khu.ten}</Col>
                </Row>
                
                <Row justify="space-between">
                  <Col>Hạn: {formatDate(i.ngayGiao)}</Col>
                  <Col>Giá: {formatCurrency(i.donHang.gia)}</Col>
                </Row>
              </div>
              <Row gutter={16} justify="space-between" style={{ marginTop: "auto", }}>
                <Col >
                  <Button type="primary" block onClick={() => showModal(i)}>
                    Chi tiết
                  </Button>
                </Col>
                <Col >
                  <Button type="primary" block onClick={() => handleHoanDon(i)}>
                    Hoàn đơn
                  </Button>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
      <ModalDonCT isModalOpen={isModalOpen} handleCancel={handleCancel} data={bill}/>
    </>
  );
};

export default DonHangTabsPP;
