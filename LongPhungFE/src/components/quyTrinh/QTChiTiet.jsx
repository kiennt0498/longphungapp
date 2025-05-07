import { Select } from "antd";
import React from "react";

function QTChiTiet({ data,onSelectChange }) {
  const optinons = data.map((item) => {
    return {
      value: item.id,
      label: item.hoTen,
    };
  });

  const hanldChange = (value) => {
    onSelectChange(value)
  };

  return (
    <>
      <Select
        name="nhanVienQL"
        style={{ width: "100%" }}
        options={optinons}
        showSearch
        placeholder="Chọn nhân viên quản lý"
        filterOption={(input, option) => {
          var _a;
          return (
            (_a =
              option === null || option === void 0 ? void 0 : option.label) !==
              null && _a !== void 0
              ? _a
              : ""
          )
            .toLowerCase()
            .includes(input.toLowerCase());
        }}
        onChange={hanldChange}
      />
    </>
  );
}

export default QTChiTiet;
