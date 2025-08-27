import React from "react";
import { List } from "antd";
import JobCard from "../common/JobCard";


const HoanThanhCV = ({ listHoanThanh }) => {
  return (
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
      dataSource={listHoanThanh}
      renderItem={(i) => (
        <List.Item key={i.id}>
          <JobCard item={i} showButton={false} showButton2={false} showTime={false}/>
        </List.Item>
      )}
    />
  );
};

export default HoanThanhCV;
