import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  List,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import JobCard from "../common/JobCard";
import ModalExcel from "../common/ModalExcel";
import { API_FILE } from "../../services/constans";
import DynamicForm from "../common/DynamicForm";
import { toast } from "react-toastify";


const DaNhanCV = ({
  listDaNhan,
  handleNopViec,
  handleCancel,
  isModalOpen,
  setIsUpload,
  setFileUp,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [congViec, setCongViec] = useState({});
  const [isChecked, setIsChecked] = useState(true);

  const showModal = (data) => {
    setIsOpen(true);
    setCongViec(data);
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

  // Tính màu dựa trên thời gian còn lại
  const getBackgroundColor = (createdAt) => {
    const totalMs = 24 * 60 * 60 * 1000; // 24h
    const elapsed = Date.now() - new Date(createdAt).getTime();
    const ratio = Math.min(elapsed / totalMs, 1); // 0 -> 1

    if (ratio < 0.5) return "#ffffff"; // trắng
    if (ratio < 0.8) return "#ffe5b4"; // cam nhạt
    return "#ffb4b4"; // đỏ nhạt
  };

  // Tính giờ còn lại
  const getRemainingHours = (createdAt) => {
    const deadline = new Date(createdAt).getTime() + 24 * 60 * 60 * 1000;
    return (deadline - Date.now()) / (1000 * 60 * 60);
  };

  // Sort theo thời gian còn lại
  const sortedList = useMemo(() => {
    return [...listDaNhan].sort(
      (a, b) => getRemainingHours(a.ngayTao) - getRemainingHours(b.ngayTao)
    );
  }, [listDaNhan]);

  return (
    <>
      <List
        className="CongViec"
        grid={{
          gutter: 16,
          xs: 1, // mobile: 1 cột
          sm: 2, // tablet nhỏ: 2 cột
          md: 2, // tablet lớn: 2 cột
          lg: 3, // desktop: 3 cột
          xl: 3,
          xxl: 4,
        }}
        dataSource={sortedList}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard
              showTime={true}
              bgColor={getBackgroundColor(i.ngayTao)}
              item={i}
              showButton={true}
              onButtonClick={handleNopViec}
              onButtonClick2={showModal}
              textButton="Nộp việc"
              textButton2="Hoàn đơn"
              showButton2={isChecked}
              extra={
                i.donHangCT?.images && (
                  <a
                    href={`${API_FILE}/image/${i.donHangCT.images.tenTep}?download=true`}
                    download={i.donHangCT.images.tenTep}
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    Tải mẫu
                  </a>
                )
              }
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
      <Modal
        open={isOpen}
        title="Chia đơn"
        onCancel={cancel}
        footer={true}
      ></Modal>
    </>
  );
};

export default DaNhanCV;
