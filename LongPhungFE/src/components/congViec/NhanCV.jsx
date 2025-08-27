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

  console.log("list nhan: ", listNhan);

  return (
    <>
      <List
        name="CongViec"
        grid={{
          gutter: 16,
          xs: 1, // mobile: 1 cột
          sm: 2, // tablet nhỏ: 2 cột
          md: 2, // tablet lớn: 2 cột
          lg: 3, // desktop: 3 cột
          xl: 3,
          xxl: 4,
        }}
        dataSource={listNhan}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard
              item={i}
              showButton={true}
              onButtonClick={handleNhanViec}
              textButton="Nhận việc"
              showButton2={false}
              showTime={true}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default NhanCV;
