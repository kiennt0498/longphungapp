import { List, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import JobCard from '../common/JobCard';
import { API_FILE } from '../../services/constans';
import ModalExcel from '../common/ModalExcel';

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
        dataSource={listGuiPhieu}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard
              item={i}
              showButton={true}
              onButtonClick={handleGuiPhieu}
              onButtonClick2={showModal}
              textButton="Nộp việc"
              textButton2="Hoàn đơn"
              showButton2={isChecked}
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
}

export default DonGuiPhieu