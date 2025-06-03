import React from "react";
import { List } from "antd";
import JobCard from "../common/JobCard";
import ModalExcel from "../common/ModalExcel";
import { API_FILE } from "../../services/constans";

const DaNhanCV = ({ listDaNhan, handleNopViec, handleCancel, isModalOpen, setIsUpload, setFileUp }) => {
  console.log("list da nhan",listDaNhan);
  
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
              textButton="Nộp Việc"
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
    </>
  );
};

export default DaNhanCV;
