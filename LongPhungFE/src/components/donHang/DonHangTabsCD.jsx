import { Button, Card, Col, List, Row, Tag, Typography } from "antd";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import React, { use, useState } from "react";
import axios from "axios";
import { API_FILE } from "../../services/constans";
import { toast } from "react-toastify";
import { formatCurrency, formatDate } from "../../helpers/formatData";

const DonHangTabsCD = ({ listCD, handleDuyetSP, handleLamLai }) => {
  const { Text } = Typography;
  const [check, setCheck] = useState(true);


  const downFile = async (data) => {
    try {
      const res = await axios.get(
        `${API_FILE}/image/${data.images.tenTep}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(res.data);
      Object.assign(document.createElement("a"), {
        href: url,
        download: data.images.tenTep,
      }).click();
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Không thể tải file!");
      console.log("Error downloading file:", error);
      
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
          <Text>Công đoạn: Thiết kế</Text> <br />
          <Text>Loại sản phẩm: {i.donHangCT?.loaiSp?.ten}</Text> <br />
          <Text>
            Hình dáng: {i.donHangCT?.hinhDang?.ten || "Không xác định"}
          </Text>
          <br />
          <Text>
            Kích thước: {i.donHangCT?.kichThuoc || "Không xác định"}
          </Text>
          <br />
          <Text>
            Nội dung thiết kế:{" "}
            {i.donHangCT?.noiDungThietKe || "Không xác định"}
          </Text>
          <br />
          <Text>
            Yêu cầu đặc biệt:{" "}
            {i.donHangCT?.yeuCauDacbiet || "Không xác định"}
          </Text>
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
