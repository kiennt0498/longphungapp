import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NhanVienSerivce from "../../services/NhanVienService";
import { useForm } from "antd/es/form/Form";
import { addEmp } from "../../redux/slide/NhanVienSlice";
import { toast } from "react-toastify";

const service = new NhanVienSerivce();

const NhanVienForm = () => {
  const [form] = Form.useForm();

  const bp = useSelector((state) => state.NhanVien.boPhans);
  const cv = useSelector((state) => state.NhanVien.chucVus);
  const tv = useSelector((state) => state.NhanVien.tacVus);
  const dispatch = useDispatch();

  const dataBP = bp.map((i) => {
    const data1 = {
      label: `${i.description}`,
      value: i.name,
    };
    return data1;
  });

  const dataCV = cv.map((i) => {
    const data2 = {
      label: `${i.description}`,
      value: i.name,
    };
    return data2;
  });

  const dataTV = tv.map((i) => {
    const data3 = {
      label: `${i.description}`,
      value: i.name,
    };
    return data3;
  });

  const navigate = useNavigate();

 

  const onBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {...values,taiKhoan:{sdt: values.taiKhoan}}
      
      const res = await service.insterEmp(data);
      if (res.status === 201) {
        dispatch(addEmp(res.data));
        toast.success("Thêm mới thành công ", {
          position: "top-center",
        });
        form.resetFields()
      }
      
    } catch (error) {
      toast.error("Thêm mới thất bại")
    }
  };
  return (
    <>
      <Button type="primary" variant="outlined" onClick={onBack}>
        <FaArrowLeft />
      </Button>
      <h1 className="heardthongtin"> Thêm nhân viên</h1>
      <Row>
        <Col span={12}>
          <div className="icontaikhoan">
            <FaUserCircle />
          </div>
        </Col>
        <Col span={12}>
          <Form layout="vertical" className="Form" form={form}>
            <Form.Item label="Mã nhân viên" name="id">
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Họ và tên"
              name="hoTen"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ và tên",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Địa chỉ" name="diaChi">
              <Input />
            </Form.Item>

            <Form.Item label="Số điện thoại" name="taiKhoan" rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại"
                },
                {
                  min: 10,
                  message: "Nhập tối thiểu 10 số"
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "Chỉ nhập số"
                }
              ]}>
              <Input maxLength={13} minLength={10}/>
            </Form.Item>

            <Row gutter={82} >
              <Col>
                <Form.Item
                  label="Bộ Phận"
                  name="boPhan"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn bộ phận",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn bộ phận"
                    optionFilterProp="label"
                    options={dataBP}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Chức vụ"
                  name="chucVu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn chức vụ",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn chức vụ"
                    optionFilterProp="label"
                    options={dataCV}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="Tác vụ"
                  name="tacVu"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn tác vụ",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Chọn Tác vụ"
                    optionFilterProp="label"
                    options={dataTV}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label={null}>
              <Button type="primary" onClick={handleSubmit}>
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default NhanVienForm;
