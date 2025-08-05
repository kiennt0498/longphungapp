import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Upload } from "antd";
import { toast } from "react-toastify";
const { Dragger } = Upload;

const ModalExcel = ({ open, onCloseM, API, isUpload, setFileUp }) => {
  const props = {
    name: "file",
    multiple: true,
    action: API,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        toast.success(`${info.file.name} nhập file thành công.`);

        // Kiểm tra trước khi gọi
        if (typeof isUpload === "function") {
          isUpload();
        }

        if (typeof setFileUp === "function") {
          setFileUp(info.file.response);
        }
      } else if (status === "error") {
        toast.error(`${info.file.name} nhập file thất bại.`);
      }
    },
  };
  return (
    <Modal title="Vùng tải file" open={open} onCancel={onCloseM} footer={[]}>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Nhấn vào hoặc kéo file vào vùng</p>
        <p className="ant-upload-hint">chỉ tải 1 file 1 lần</p>
      </Dragger>
    </Modal>
  );
};

export default ModalExcel;
