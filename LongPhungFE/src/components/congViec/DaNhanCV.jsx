import React, { useEffect, useState } from "react";
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

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listDaNhan}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard
              item={i}
              showButton={true}
              onButtonClick={handleNopViec}
              onButtonClick2={showModal}
              textButton="Nộp việc"
              // textButton2="Hoàn đơn"
              // showButton2={isChecked}
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
      >
    
      </Modal>
    </>
  );
};

export default DaNhanCV;
