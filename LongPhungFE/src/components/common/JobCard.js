import { Button, Card, Col, Row, Typography } from "antd";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import { useState } from "react";
const { Text } = Typography;

const JobCard = ({ item, showButton, onButtonClick,onButtonClick2, textButton, textButton2, extra, showButton2 }) => {

  
  return (
    <Card
      title={<span>{item.donHangCT?.donHang?.maDonHang}</span>}
      extra={extra}
      style={{
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <div>
        <Text>Tên sản phẩm: {item.donHangCT?.sanPham?.tenSP}</Text> <br/>
        <Text>Công đoạn: {item.congDoan?.tenCongDoan || "Thiết kế"}</Text>
        <Row>
          <Text>Số lượng: {item.donHangCT?.soLuong}</Text>
        </Row>
        <Row justify="space-between">
          <Col>Hạn: {formatDate(item.ngayGiao)}</Col>
          {item.tacVu === "THIET_KE" ? (
            <Col>KPI: {formatCurrency(item.kpi)}</Col>
          ) : (
            <Col>KPI: {formatCurrency(item.kpi * item.donHangCT?.soLuong)}</Col>
          )}
        </Row>
      </div>
        {showButton && (
        <div style={{ marginTop: "auto" }}>
          <Button type="primary" block onClick={() => onButtonClick(item)}>
            {textButton}
          </Button>
        </div>
      )}
      {showButton2 && (
        <div style={{ marginTop: "1%" }}>
          <Button type="primary" block onClick={() => onButtonClick2(item)}>
            {textButton2}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default JobCard;
