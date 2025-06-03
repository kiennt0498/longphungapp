import React from "react";
import { List } from "antd";
import JobCard from "../common/JobCard";

const DuyetCV = ({ listDuyet }) => {
  console.log("listDuyet", listDuyet);
  
  return (
    <List
      grid={{ gutter: 16, column: 4 }}
      dataSource={listDuyet}
      renderItem={(i) => (
        <List.Item key={i.id}>
          <JobCard item={i} showButton={false} />
        </List.Item>
      )}
    />
  );
};

export default DuyetCV;
