import { Button, Card, Col, List, message, Row, Tag, Typography } from "antd";
import { IoBriefcaseOutline } from "react-icons/io5";
import { CiClock2, CiInboxIn } from "react-icons/ci";
import { FiCheckCircle } from "react-icons/fi";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import { API_FILE, API_SOCKET } from "../../services/constans";
import { formatDate } from "../../helpers/formatData";
import JobCard from "../common/JobCard";

const NhanCV = ({ listNhan, handleNhanViec }) => {
  const { Text } = Typography;

  console.log("list nhan: ",listNhan);
  

  return (
    <>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listNhan}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard 
           item={i}
              showButton={true}
              onButtonClick={handleNhanViec}
              textButton="Nhận việc"
              showButton2={false}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default NhanCV;
