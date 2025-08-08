import { Button, Empty, Row } from "antd";
import React, { useState } from "react";
import ModalChotDon from "./ModalChotDon";
import DonHangService from "../../services/DonHangService";
import { IoMdTrash } from "react-icons/io";
import OrderCard from "../common/OrderCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setDonHang } from "../../redux/slide/DonHangSlice";

const service = new DonHangService();

const DonHangTabsXN = ({ listXN, format, showModalHuy }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bill, setBill] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  console.log(listXN);
  
  
  const handleChotDon = async (data) => {
    dispatch(setDonHang(data))
    navigate("/donhang/chot-don")
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
                onClick={() => handleChotDon(item)}
                style={{ width: "100%" }}
                type="primary"
              >
                Chốt đơn hàng
              </Button>
            )}
          />
        ))}
      </Row>
    </div>
  );
};

export default DonHangTabsXN;
