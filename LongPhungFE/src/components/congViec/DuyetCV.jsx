import React from "react";
import { List } from "antd";
import JobCard from "../common/JobCard";


const DuyetCV = ({ listDuyet }) => {
  console.log("listDuyet", listDuyet);

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
      dataSource={listDuyet}
      renderItem={(i) => (
        <List.Item key={i.id}>
          <JobCard item={i} showButton={false} showButton2={false} showTime={true}/>
        </List.Item>
      )}
    />
  );
};

export default DuyetCV;
