import React from "react";
import { List } from "antd";
import JobCard from "../common/JobCard";

const HoanThanhCV = ({ listHoanThanh }) => {
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={listHoanThanh}
      renderItem={(i) => (
        <List.Item key={i.id}>
          <JobCard item={i} showButton={false} />
        </List.Item>
      )}
    />
  );
};

export default HoanThanhCV;
