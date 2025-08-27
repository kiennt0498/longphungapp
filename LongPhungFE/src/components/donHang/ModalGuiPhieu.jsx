import { Button, Card, Col, Modal, Row, Select, Typography } from "antd";

import React, { use, useEffect, useState } from "react";
import ModalExcel from "../common/ModalExcel";
import { formatCurrency } from "../../helpers/formatData";
import { API_FILE } from "../../services/constans";

function ModalGuiPhieu({
  openPhieu,
  setOpenPhieu,
  handleGuiPhieu,
  congViec,
  nhanViens,
}) {
  const { Text, Title } = Typography;
  const [isModal, setIsModal] = useState(false);
  const [file, setFile] = useState({});
  const [nguoiNhan, setNguoiNhan] = useState("");
  const [donct, setDonct] = useState({});

  const options = nhanViens.map((nv) => ({
    value: nv.id,
    label: nv.hoTen,
  }));

  const handleSelectNguoiNhan = (donCtId, value) => {
    setNguoiNhan((prev) => ({
      ...prev,
      [donCtId]: value,
    }));
  };

  const showModal = (data) => {
    setIsModal(true);
    setDonct(data);
  };

  const setFileUp = (value) => {
    const data = {
      donHangCT: donct,
      nguoiNhan: { id: nguoiNhan[donct.id] },
      phieu: value,
    };
    setIsModal(false);
    handleGuiPhieu(data);
  };

  return (
    <>
      <Modal
        title="Gửi phiếu"
        footer={null}
        open={openPhieu}
        onCancel={() => setOpenPhieu(false)}
      >
        <Card title="Thông tin đơn hàng">
          <Text strong>Mã Đơn hàng: </Text>
          <Text>{congViec.don?.maDonHang || "Không xác định"}</Text> <br />
          <Text strong>Tổng giá tiền: </Text>
          <Text>{formatCurrency(congViec.don?.gia) || "Không xác định"}</Text>
        </Card>

        {congViec?.donCT?.map((i) => {
          return (
            <Card key={i.id} style={{ marginTop: 10 }}>
              <Row gutter={24}>
                <Col>
                  <Text strong>Tên sản phẩm: </Text>
                  <Text>{i.sanPham.tenSP}</Text>
                </Col>
                <Col>
                  <Text strong>Số lượng: </Text>
                  <Text>{i.soLuong}</Text>
                </Col>
                <Col>
                  <Text strong>Chiều dài: </Text>
                  <Text>{i.chieuDai}</Text>
                </Col>
                <Col>
                  <Text strong>Chiều rộng: </Text>
                  <Text>{i.chieuRong}</Text>
                </Col>
              </Row>

              {i.images && (
                <>
                  <Text strong>Tên file: </Text>
                  <Text>{i.images.tenAnh}</Text>
                  <br />
                </>
              )}

              <Text strong>Người nhận: </Text>
              <Select
                options={options}
                value={nguoiNhan[i.id]}
                onChange={(value) => handleSelectNguoiNhan(i.id, value)}
                style={{ width: "100%" }}
                placeholder="Chọn người nhận"
              />
              <br />

              <Button
                style={{ marginTop: 10 }}
                onClick={() => showModal(i)}
                disabled={!nguoiNhan[i.id]} // ✅ disable khi chưa chọn
              >
                {i.images ? "Tải lại phiếu" : "Nhập phiếu"}
              </Button>
            </Card>
          );
        })}
      </Modal>
      <ModalExcel
        open={isModal}
        onCloseM={() => setIsModal(false)}
        API={API_FILE + "/minio/upload"}
        setFileUp={setFileUp}
      />
    </>
  );
}

export default ModalGuiPhieu;
