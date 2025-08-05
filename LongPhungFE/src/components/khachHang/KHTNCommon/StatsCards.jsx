import React from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import "../KHTNStyles/StatsCards.scss";
import {getStatusCount} from '../KHTNCommon/utils'; // Assuming you have a utility function to get status counts

function StatsCards({ leads }) {
  const stats = [
    {
      title: "Tổng số",
      value: getStatusCount(leads, "all"),
      icon: <UserOutlined />,
      color: "#1890ff",
    },
    {
      title: "Đã báo giá",
      value: getStatusCount(leads, "quoted"),
      icon: <MailOutlined />,
      color: "#722ed1",
    },
    {
      title: "Đã chốt",
      value: getStatusCount(leads, "closed"),
      icon: <CalendarOutlined />,
      color: "#52c41a",
    },
    {
      title: "Chưa gọi",
      value: getStatusCount(leads, "not_called"),
      icon: <PhoneOutlined />,
      color: "#8c8c8c",
    },
  ];

  return (
    <div className="stats-container">
      <Row gutter={[16, 16]} wrap className="stats-row">
        {stats.map((stat, index) => (
          <Col
            key={index}
            span={6}
            className="stats-col"
          >
            <Card className="stat-card">
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StatsCards;
