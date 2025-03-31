import { Button, Divider, Form, Input, Select, Space, Steps } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import TranferCD from "./TranferCD";
import QuyTrinhService from "../../services/QuyTrinhService";
import NhanVienService from "../../services/NhanVienService";
import { useDispatch, useSelector } from "react-redux";

import { setListEmp } from "../../redux/slide/NhanVienSlice";
import CongDoanService from "../../services/CongDoanService";
import { setList } from "../../redux/slide/CongDoanSlice";

const FormQuyTrinh = ({
  currentStep,
  setCurrentStep,
  onNext,
  onSubmit,
  setListCongDoan,
  listCongDoan,
  form,
}) => {
  const serviceNV = new NhanVienService();
  const serviceCD = new CongDoanService();

  const [options, setOptions] = useState([]);

  const congDoans = useSelector((state) => state.CongDoan.congDoans);
  const nhanViens = useSelector((state) => state.NhanVien.nhanViens);

  const disphatch = useDispatch();

  const handleOnStepChange = (steps) => {
    setListCongDoan(steps);
  };

  const getDataList = async () => {
    try {
      const res = await serviceCD.getListCD();
      if (res.status === 200 && res.data) {
        disphatch(setList(res.data));
        console.log(res.data);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataNhanVien = async () => {
    const res = await serviceNV.getListEmp();
    if (res && res.data) {
      disphatch(setListEmp(res.data));
    }

    if (nhanViens) {
      const data = nhanViens.map((i) => ({ value: i.id, label: i.hoTen }));
      setOptions(data);
    }
  };

  useEffect(() => {
    getDataList();
  }, []);

  useEffect(() => {
    getDataNhanVien();
    console.log(options);
    
  }, []);

  const processSteps = [
    {
      title: "Tên quy trình",
      content: "Tạo tên quy trình",
      icon: <SettingOutlined />,
    },
    {
      title: "thêm công đoan",
      content: "Chọn công đoạn",
      icon: <SettingOutlined />,
    },
  ];
  return (
    <>
      <Form form={form} layout="vertical">
        <Steps current={currentStep} items={processSteps} />

        <Divider />

        {currentStep === 0 && (
          <>
            <Form.Item
              name="tenQuyTrinh"
              label="Tên quy trình"
              rules={[
                { required: true, message: "Vui lòng nhập tên quy trình" },
              ]}
            >
              <Input placeholder="Nhập tên quy trình" />
            </Form.Item>

            <Form.Item
              name="nhanVienQL"
              label="Nhân viên quản lý"
              rules={[{ required: true, message: "Vui lòng chọn nhân viên" }]}
            >
              <Select
                showSearch
                placeholder="Chọn nhân viên"
                options={options}
              />
            </Form.Item>
          </>
        )}

        {currentStep === 1 && (
          <TranferCD
            data={congDoans}
            listCongDoan={listCongDoan}
            handleOnStepChange={handleOnStepChange}
          />
        )}

        <Form.Item style={{ marginTop: 16 }}>
          <Space>
            {currentStep > 0 && (
              <Button onClick={() => setCurrentStep(currentStep - 1)}>
                Quay lại
              </Button>
            )}
            {currentStep < processSteps.length - 1 && (
              <Button type="primary" onClick={onNext}>
                Tiếp tục
              </Button>
            )}
            {currentStep === processSteps.length - 1 && (
              <Button type="primary" onClick={onSubmit}>
                Lưu
              </Button>
            )}
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormQuyTrinh;
