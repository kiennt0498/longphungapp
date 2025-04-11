import { Button, Card, Col, List, Row, Tag, Typography } from "antd";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import React, { use, useState } from "react";
import axios from "axios";
import { API_FILE } from "../../services/constans";
import { toast } from "react-toastify";

const DonHangTabsCD = ({ listCD, handleDuyetSP, handleLamLai }) => {
  const { Text } = Typography;
  const [check, setCheck] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "green";
      case "pending":
        return "orange";
      case "accepted":
        return "blue";
      case "completed":
        return "purple";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "available":
        return <IoBriefcaseOutline size={16} />;
      case "pending":
        return <CiClock2 size={16} />;
      case "accepted":
        return <CiInboxIn size={16} />;
      case "completed":
        return <FiCheckCircle size={16} />;
      default:
        return null;
    }
  };

  const downFile = async (data) => {
    try {
      const res = await axios.get(
        `${API_FILE}/image/${data.donHangCT.images.tenTep}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      Object.assign(document.createElement("a"), {
        href: url,
        download: data.donHangCT.images.tenTep,
      }).click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Không thể tải file!");
    }
  };

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listCD}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <Card
              title={<span>{i.donHangCT.donHang.maDonHang}</span>}
              style={{
                padding: "2%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <div>
                <Text>Tên sản phẩm: {i.donHangCT.sanPham.tenSP} </Text>
                <Row>
                  <Text>Số lượng: {i.donHangCT.soLuong} </Text>
                </Row>
                <Row>
                  <Col span={12}>Hạn: {i.ngaGiao}</Col>
                  <Col span={6} offset={6}>
                    KPI: {i.kpi}
                  </Col>
                </Row>
              </div>
              <div style={{ marginTop: "auto", marginLeft: "5%" }}>
                <Row gutter={16}>
                  <Col>
                    <Button type="primary" block onClick={() => downFile(i)}>
                      Tải file
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      block
                      onClick={() => handleDuyetSP(i.id)}
                    >
                      Duyệt
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      type="primary"
                      block
                      onClick={() => handleLamLai(i)}
                    >
                      Làm lại
                    </Button>
                  </Col>
                </Row>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};

export default DonHangTabsCD;
