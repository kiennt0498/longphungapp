import { Button, Card, Col, Row, Typography } from "antd";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import { useState } from "react";
import ImageService from "../../services/ImageService";
import { API_FILE } from "../../services/constans";
const { Text } = Typography;

const JobCard = ({
  item,
  showButton,
  onButtonClick,
  onButtonClick2,
  textButton,
  textButton2,
  extra,
  showButton2,
}) => {
  const downFile = async (filename) => {
    const response = await fetch(`${API_FILE}/image/${filename}`);

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  return (
    <Card
      title={
        <div style={{ textAlign: "center", width: "100%" }}>
          {item.donHangCT?.donHang?.maDonHang}
        </div>
      }
      extra={extra}
      style={{
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {item.tacVu === "THIET_KE" ? (
        <div>
          <Text>Công đoạn: Thiết kế</Text> <br />
          <Text>Loại sản phẩm: {item.donHangCT?.loaiSp?.ten}</Text> <br />
          <Text>
            Hình dáng: {item.donHangCT?.hinhDang?.ten || "Không xác định"}
          </Text>
          <br />
          <Text>
            Kích thước: {item.donHangCT?.kichThuoc || "Không xác định"}
          </Text>
          <br />
          <Text>
            Nội dung thiết kế:{" "}
            {item.donHangCT?.noiDungThietKe || "Không xác định"}
          </Text>
          <br />
          <Text>
            Yêu cầu đặc biệt:{" "}
            {item.donHangCT?.yeuCauDacbiet || "Không xác định"}
          </Text>
          
        </div>
      ) : (
        <div>
          <Text>Tên sản phẩm: {item.donHangCT?.sanPham?.tenSP}</Text> <br />
          <Text>Công đoạn: {item.congDoan?.tenCongDoan || "Thiết kế"}</Text>
          <Row>
            <Text>Số lượng: {item.donHangCT?.soLuong}</Text>
          </Row>
          <Row justify="space-between">
            <Col>Hạn: {formatDate(item.ngayGiao)}</Col>
            <Col>KPI: {formatCurrency(item.kpi * item.donHangCT?.soLuong)}</Col>
          </Row>
        </div>
      )}
      {showButton && (
        <div style={{ marginTop: "1%" }}>
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
