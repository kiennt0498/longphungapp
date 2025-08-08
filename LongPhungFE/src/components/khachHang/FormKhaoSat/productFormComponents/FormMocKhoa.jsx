import React from "react";
import { Form, Input, InputNumber, Select, Row, Col } from "antd";
import TinhTienField from "./TinhTienField";
import { useWatch } from "antd/es/form/Form";
import { useSelector } from "react-redux";

const { Option } = Select;



const FormMocKhoa = ({index,setGia,sanPham}) => {

  const listHD = useSelector((state) => state.SanPham.hinhDang);

  const shapes = listHD.map(i=>{
    return {
      value: i.id,
      label: i.ten
    }
  })


  return (
  <>
    <Row gutter={16}>
      <Col xs={24}>
        <Form.Item name="tenSanPham" label="Tên mẫu móc khóa (tùy chọn)">
          <Input placeholder="Ví dụ: Móc khóa logo công ty ABC" size="large" />
        </Form.Item>
      </Col>

      <Col xs={12} md={12}>
        <Form.Item name="kichThuoc" label="Kích thước" >
          <Input placeholder="VD: 50 x 60" size="large" style={{ width: "100%" }}/>
        </Form.Item>
      </Col>

      <Col xs={12} md={12}>
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

      {/* <Col xs={24}><TinhTienField index={index} setGia={setGia} sanPham={sanPham}/></Col> */}
    </Row>
  </>
)};

export default FormMocKhoa;
