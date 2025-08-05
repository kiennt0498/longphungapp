import React, { useEffect, useState, useMemo } from "react";
import { Card, Form, Select, Row, Col, Button } from "antd";
import productFormComponents from "./productFormComponents";
import { useDispatch, useSelector } from "react-redux";
import SanPhamService from "../../../../services/SanPhamService";
import { setListSP, setSanPham } from "../../../../redux/slide/SanPhamSlice";

const { Option } = Select;

const SingleProductCard = ({ id, loaiSP, setGia, onRemove, onFormReady,  initialValues , index}) => {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState(null);
  const dispatch = useDispatch();
  const service = new SanPhamService();
  const [sanPhamList, setSanPhamList] = useState([])
  const [selectedSanPham, setSelectedSanPham] = useState(null);

  useEffect(() => {
  onFormReady?.(id, form);
  if (initialValues) {
    form.setFieldsValue(initialValues);
    setSelectedType(initialValues.loaiSP); 
  }
}, []);

  const loaiOptions = useMemo(
    () => loaiSP.map((item) => ({ value: item.id, label: item.ten })),
    [loaiSP]
  );

  const sanPhamOptions = useMemo(
    () => sanPhamList.map((item) => ({ value: item.id, label: item.tenSP })),
    [sanPhamList]
  );

  const SelectedForm = productFormComponents?.[String(selectedType)];

  const handleLoaiChange = async (value) => {
    setSelectedType(value);
    form.setFieldValue("sanPham", undefined);
    const res = await service.getListByLoai(value);
    res && res.data && setSanPhamList(res.data);
    dispatch(setListSP(res.data));
  };

  useEffect(() => {
  const fetchSanPhamList = async () => {
    if (initialValues?.loaiSP) {
      const res = await service.getListByLoai(initialValues.loaiSP);
      if (res?.data) setSanPhamList(res.data);
    }
  };
  fetchSanPhamList();
}, []);

  const handleSanPhamChange = (value) => {
  const sp = sanPhamList.find((item) => item.id === value);
  if (sp) {
    setSelectedSanPham(sp); 
  }
};

  return (
    <Card
      title="Thông tin sản phẩm"
      style={{ marginBottom: 16 }}
      extra={
        <Button danger type="link" onClick={() => onRemove(id)}>
          Xoá
        </Button>
      }
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="loaiSP"
              label="Loại sản phẩm"
              rules={[{ required: true, message: "Chọn loại sản phẩm" }]}
            >
              <Select placeholder="Chọn loại sản phẩm" onChange={handleLoaiChange}>
                {loaiOptions.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="sanPham"
              label="Mã sản phẩm"
              rules={[{ required: true, message: "Chọn mã sản phẩm" }]}
            >
              <Select placeholder="Chọn sản phẩm" onChange={handleSanPhamChange} showSearch>
                {sanPhamOptions.map((item) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        {SelectedForm ? <SelectedForm form={form} index={index} setGia={setGia} sanPham={selectedSanPham} /> : null}
      </Form>
    </Card>
  );
};

export default SingleProductCard;
