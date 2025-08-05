import React from "react";
import { Form, Input, InputNumber, Select, Row, Col } from "antd";
import TinhTienField from "./TinhTienField";
import { useWatch } from "antd/es/form/Form";

const { Option } = Select;

const shapes = [
  { value: "tron", label: "Hình tròn" },
  { value: "vuong", label: "Hình vuông" },
  { value: "chu_nhat", label: "Hình chữ nhật" },
  { value: "trai_tim", label: "Hình trái tim" },
  { value: "ngoi_sao", label: "Hình ngôi sao" },
  { value: "thiet_ke", label: "Hình tự do theo thiết kế" },
];

const FormMocKhoa = ({index,setGia,sanPham}) => {

  return (
  <>
    <Row gutter={16}>
      <Col xs={24}>
        <Form.Item name="tenSanPham" label="Tên mẫu móc khóa (tùy chọn)">
          <Input placeholder="Ví dụ: Móc khóa logo công ty ABC" size="large" />
        </Form.Item>
      </Col>

      <Col xs={12} md={12}>
        <Form.Item name="chieuDai" label="Chiều dài (mm)" >
          <InputNumber placeholder="VD: 50" size="large" style={{ width: "100%" }}/>
        </Form.Item>
      </Col>

      <Col xs={12} md={12}>
        <Form.Item name="chieuRong" label="Chiều rộng (mm)">
          <InputNumber placeholder="VD: 30" size="large" style={{ width: "100%" }}/>
        </Form.Item>
      </Col>

      <Col xs={24}>
        <Form.Item
          name="hinhDang"
          label="Hình dạng móc khóa"
          rules={[{ required: true, message: "Vui lòng chọn hình dạng!" }]}
        >
          <Select placeholder="Chọn hình dạng" size="large">
            {shapes.map((s) => (
              <Option key={s.value} value={s.value}>
                {s.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col xs={24}><TinhTienField index={index} setGia={setGia} sanPham={sanPham}/></Col>
    </Row>
  </>
)};

export default FormMocKhoa;
