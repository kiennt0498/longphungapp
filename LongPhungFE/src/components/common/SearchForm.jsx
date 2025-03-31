import { Col, Input, Radio, Row } from "antd";
import { useEffect, useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [choose, setchoose] = useState(1);
  const [valuse, setValue] = useState("");
  const onChoose = (e) => {
    setchoose(e.target.value);
    setValue("");
  };
  const onChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(choose, valuse);
    }, 500);

    return () => clearTimeout(timeout);
  }, [valuse, choose]);
  return (
    <Row align="middle" gutter={[16, 16]}>
      <Col span={11} offset={2}>
        <Radio.Group
          onChange={onChoose}
          value={choose}
          options={[
            {
              value: 1,
              label: "Tên",
            },
            {
              value: 2,
              label: "Mã",
            },
            {
              value: 3,
              label: "SDT",
            },
          ]}
        />
      </Col>
      <Col span={11}>
        <Input value={valuse} onChange={onChange} />
      </Col>
    </Row>
  );
};

export default SearchForm;
