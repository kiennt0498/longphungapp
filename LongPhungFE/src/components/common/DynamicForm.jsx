import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Space } from "antd";

function DynamicForm({ setListNV, cancel }) {
  var __rest =
    (this && this.__rest) ||
    function (s, e) {
      var t = {};
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (
          var i = 0, p = Object.getOwnPropertySymbols(s);
          i < p.length;
          i++
        ) {
          if (
            e.indexOf(p[i]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(s, p[i])
          )
            t[p[i]] = s[p[i]];
        }
      return t;
    };
  const onFinish = (values) => {
    setListNV(values.list);
  };
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      autoComplete="off"
    >
      <Form.List name="list">
        {(fields, { add, remove }) => (
          <>
            {fields.map((_a) => {
              var { key, name } = _a,
                restField = __rest(_a, ["key", "name"]);
              return (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "maNV"]}
                    rules={[{ required: true, message: "Nhập mã nhân viên" }]}
                  >
                    <Input placeholder="Mã nhân viên" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "soLuong"]}
                    rules={[{ required: true, message: "Nhập số lượng" }]}
                  >
                    <InputNumber min={1} placeholder="Số lượng" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Thêm nhân viên
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button onClick={cancel}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
}

export default DynamicForm;
