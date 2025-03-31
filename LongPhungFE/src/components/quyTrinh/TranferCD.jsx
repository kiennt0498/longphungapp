import { Transfer } from "antd";
import React, { useEffect, useState } from "react";

const TranferCD = ({ handleOnStepChange, listCongDoan, data }) => {
  const [mockData, setMockData] = useState([]);

  const getData = () => {
    if (data) {
      const list = data.map((i) => ({
        key: i.id,
        title: i.tenCongDoan,
        description: i.tenCongDoan,
      }));
      
      setMockData(list);
    }else{
      setMockData([])
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  const filterOption = (inputValue, option) =>
    option.description.indexOf(inputValue) > -1;
  const handleChange = (newTargetKeys) => {
    handleOnStepChange(newTargetKeys);
  };
  
  return (
    <Transfer
      dataSource={mockData}
      showSearch
      oneWay
      filterOption={filterOption}
      targetKeys={listCongDoan}
      onChange={handleChange}
      render={(item) => item.title}
    />
  );
};

export default TranferCD;
