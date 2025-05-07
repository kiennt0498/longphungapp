import React, { useState, useEffect, useRef } from "react";
import { Input, Button, Avatar } from "antd";
import { SendOutlined, UserOutlined } from "@ant-design/icons";
import "../../../styles/ThongBaoList.scss";

const ThongBaoList = () => {
  const [thongBaoList, setThongBaoList] = useState([
    {
      id: 1,
      nguoiGui: "Emily Wilson",
      noiDung: "Can we schedule a meeting to go over the roadmap for Q3?",
      thoiGian: new Date(new Date()),
    },
    {
      id: 2,
      nguoiGui: "Sarah Chen",
      noiDung: "Hi John, do you have time to review the latest design updates?",
      thoiGian: new Date(new Date().setDate(new Date().getDate() - 1)),
    },
  ]);
  const [noiDungMoi, setNoiDungMoi] = useState("");
  const chatBodyRef = useRef(null);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [thongBaoList]);

  const handleSend = () => {
    if (!noiDungMoi.trim()) return;
    const newThongBao = {
      id: Date.now(),
      nguoiGui: "Bạn",
      noiDung: noiDungMoi,
      thoiGian: new Date(),
    };
    setThongBaoList([...thongBaoList, newThongBao]);
    setNoiDungMoi("");
  };

  const formatDateHeader = (date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hôm nay";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "hôm qua";
    } else {
      return date.toLocaleDateString();
    }
  };

  const groupedMessages = thongBaoList
  .sort((a, b) => a.thoiGian - b.thoiGian) // 🔥 Sort trước khi group
  .reduce((groups, message) => {
    const dateKey = message.thoiGian.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(message);
    return groups;
  }, {});

  return (
    <div className="chat-container">
      <div className="chat-body" ref={chatBodyRef}>
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date}>
            <div className="date-header">{formatDateHeader(new Date(date))}</div>
            {messages.map((tinNhan) => {
              const isMine = tinNhan.nguoiGui === "Bạn";
              return (
                <div
                  key={tinNhan.id}
                  className={`message-row ${isMine ? "mine" : "theirs"}`}
                >
                  {!isMine && (
                    <Avatar
                      style={{ backgroundColor: "#87d068", marginRight: 8 }}
                      icon={<UserOutlined />}
                    />
                  )}
                  <div className="message-content">
                    {tinNhan.noiDung}
                  </div>
                  {isMine && (
                    <Avatar
                      style={{ backgroundColor: "#1890ff", marginLeft: 8 }}
                      icon={<UserOutlined />}
                    />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <Input
          placeholder="Type a message..."
          value={noiDungMoi}
          onChange={(e) => setNoiDungMoi(e.target.value)}
          onPressEnter={handleSend}
          style={{ flex: 1, marginRight: 8 }}
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
      </div>
    </div>
  );
};

export default ThongBaoList;
