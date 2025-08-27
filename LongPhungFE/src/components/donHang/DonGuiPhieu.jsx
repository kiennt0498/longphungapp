import { List, Modal } from "antd";
import React, { useEffect, useState } from "react";
import JobCard from "../common/JobCard";
import { API_FILE } from "../../services/constans";
import ModalExcel from "../common/ModalExcel";
import ModalGuiPhieu from "./ModalGuiPhieu";
import DonHangService from "../../services/DonHangService";
import NhanVienSerivce from "../../services/NhanVienService";

function DonGuiPhieu({
  listGuiPhieu,
  handleGuiPhieu,
  handleCancel,
  isModalOpen,
  setIsUpload,
  setFileUp,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [congViec, setCongViec] = useState({});
  const [dataDon, setDataDon] = useState({});
  const [nhanViens, setNhanViens] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const getData = async (data) => {
    try {
      const service = new DonHangService();
      const serverNV = new NhanVienSerivce();
      const res = await service.getDonPhieu(data);
      const resNV = await serverNV.getNhanVienInPhieu();
      if (resNV && resNV.data) {
        setNhanViens(resNV.data);
      }
      if (res && res.data) {
        setCongViec(res.data);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const showModal = (data) => {
    getData(data.maDonHang);
    setDataDon(data);
    setIsOpen(true);
  };

  useEffect(() => {
    const tacVu = localStorage.getItem("tacVu");
    if (tacVu === "THIET_KE") {
      setIsChecked(false);
    }
  }, []);

  const cancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listGuiPhieu}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard
              item={i}
              showButton={true}
              onButtonClick={() => showModal(i)}
              textButton="Gửi phiếu"
              showButton2={isChecked}
              showTime={true}
            />
          </List.Item>
        )}
      />
      <ModalExcel
        open={isModalOpen}
        onCloseM={handleCancel}
        API={API_FILE + "/upload/image"}
        isUpload={() => setIsUpload(true)}
        setFileUp={setFileUp}
      />
      <ModalGuiPhieu
        openPhieu={isOpen}
        setOpenPhieu={setIsOpen}
        handleGuiPhieu={handleGuiPhieu}
        congViec={congViec}
        nhanViens={nhanViens}
      />
    </>
  );
}

export default DonGuiPhieu;
