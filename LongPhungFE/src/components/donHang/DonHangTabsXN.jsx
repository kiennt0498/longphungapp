import { Button, Empty, Row } from "antd";
import React, { useState } from "react";
import ModalChotDon from "./ModalChotDon";
import DonHangService from "../../services/DonHangService";
import { IoMdTrash } from "react-icons/io";
import OrderCard from "../common/OrderCard";
import { toast } from "react-toastify";

const service = new DonHangService();

const DonHangTabsXN = ({ listXN, format, showModalHuy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState({});
  const [products, setProducts] = useState([]);

  console.log(listXN);
  
  
  const showModal = async (data) => {
    try {
      const res = await service.getDonHangCT(data.maDonHang);
      if (res?.data) {
        console.log(res.data);
        
        setProducts(res.data);
        setBill(data);
        setIsModalOpen(true);
      }
    } catch (error) {
      toast.error(" Lỗi service ");
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  if (!listXN.length) return <Empty />;

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[5, 5]}>
        {listXN.map((item) => (
          <OrderCard
            key={item.maDonHang}
            item={item}
            format={format}
            onCancel={showModalHuy}
            cancelIcon={<IoMdTrash />}
            customActions={(item) => (
              <Button
                onClick={() => showModal(item)}
                style={{ width: "100%" }}
                type="primary"
              >
                Xác nhận thanh toán
              </Button>
            )}
          />
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
