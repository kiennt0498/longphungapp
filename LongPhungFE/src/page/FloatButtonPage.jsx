import React, { useState } from "react";
import { CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { RiRobot3Fill } from "react-icons/ri";
import ThongBaoList from "../components/common/thongBao/ThongBaoList";

const FloatButtonPage = () => {
  const [openChat, setOpenChat] = useState(false);

  const toggleChat = () => {
    setOpenChat(!openChat);
  };

  return (
    <>
      {/* Nút bật chat */}
      <FloatButton
        icon={<RiRobot3Fill />}
        type="primary"
        style={{ insetInlineEnd: 24, insetBlockEnd: 24 }}
        onClick={toggleChat}
      />

      {/* Popup Chat Bot */}
      {openChat && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            right: 24,
            width: 320,
            height: 500,
            background: "white",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            borderRadius: "10px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header Chat */}
          <div
            style={{
              background: "#1677ff",
              color: "white",
              padding: "12px",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "16px",
            }}
          >
            <RiRobot3Fill style={{ marginRight: 8 }} />
            Hệ thống Trợ lý
          </div>

          {/* Nội dung Chat */}
          <ThongBaoList />
        </div>
      )}
    </>
  );
};

export default FloatButtonPage;
