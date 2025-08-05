import React from "react";
import { Row, Col, Input, Select, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import "../KHTNStyles/FilterBar.scss"; // SCSS file

const { Option } = Select;

function FilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  professionFilter,
  setProfessionFilter,
  statusConfig,
  professionColors,
}) {
  return (
    <div className="filter-bar">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={8}>
          <Input
            className="filter-bar__input"
            placeholder="Tìm kiếm theo tên, SĐT hoặc email..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </Col>
        <Col xs={24} sm={8}>
          <Select
            className="filter-bar__select"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            style={{ width: "100%" }}
          >
            <Option value="all">Tất cả trạng thái</Option>
            {Object.entries(statusConfig).map(([key, config]) => (
              <Option key={key} value={key}>
                {config.label}
              </Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={8}>
          <Select
            className="filter-bar__select"
            value={professionFilter}
            onChange={setProfessionFilter}
            allowClear
            style={{ width: "100%" }}
          >
            <Option value="all">Tất cả nghề nghiệp</Option>
            {Object.keys(professionColors).map((prof) => (
              <Option key={prof} value={prof}>
                {prof}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
    </div>
  );
}

export default FilterBar;
