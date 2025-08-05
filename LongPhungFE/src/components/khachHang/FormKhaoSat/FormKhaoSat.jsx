import React, { use, useEffect, useState } from "react";
import {
  Steps,
  Form,
  Button,
  Card,
  Typography,
  Space,
  Divider,
  message,
  Alert,
} from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  BgColorsOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import KeychainCustomerInfo from "./KeychainCustomerInfo";
import KeychainProductInfo from "./KeychainProductInfo";
import KeychainDesignInfo from "./KeychainDesignInfo";

import "./FormKhaoSat.scss"; // Assuming you have a CSS file for styles
import { useDispatch, useSelector } from "react-redux";
import SanPhamService from "../../../services/SanPhamService";
import { setListSP, setLoaiSP } from "../../../redux/slide/SanPhamSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import DonHangService from "../../../services/DonHangService";

const { Step } = Steps;
const { Title, Text } = Typography;

const FormKhaoSat = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [formList, setFormList] = useState([{ id: uuidv4(), form: null }]);
  const [sanPhams, setSanPhams] = useState([]);
  const [gia, setGia] = useState([]);
  const [listGia, setListGia] = useState([]);
  const loaiSP = useSelector((state) => state.SanPham.loaiSP);
  const sanPhamList = useSelector((state) => state.SanPham.sanPhams);
  const dispatch = useDispatch();
  const maNV = localStorage.getItem("maNV");
  const serviceDonHang = new DonHangService();

  useEffect(() => {
    const fetchLoaiSP = async () => {
      const res = await new SanPhamService().getLoaiSP();
      if (res?.data) dispatch(setLoaiSP(res.data));
    };
    fetchLoaiSP();
  }, []);

  const getTenSP = (id) => {
    const sp = sanPhamList.find((item) => item.id === id);
    return sp?.tenSP;
  };

  // Rehydrate formList from saved data
  useEffect(() => {
    if (currentStep === 1 && formData?.sanPhams?.length) {
      const restored = formData.sanPhams.map((sp) => ({
        id: uuidv4(),
        form: null,
        initialValues: sp,
      }));
      setFormList(restored);
    }
  }, [currentStep]);

  const handleFormReady = (id, instance) => {
    setFormList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, form: instance } : item))
    );
  };

  const setGiaList = (index, gia) => {
    setListGia((prev) => {
      const newList = [...prev];
      newList[index] = gia;
      return newList;
    });
  };

  const tinhGia = () => {
    const tongGia = listGia.reduce((sum, gia) => sum + (gia || 0), 0);
    setGia(tongGia);
  };

  console.log("gia: ", gia);
  console.log("list gia: ", listGia);

  useEffect(() => {
    tinhGia();
  }, [listGia]);

  const handleSetDataProductList = async () => {
    const data = [];
    for (const { form } of formList) {
      if (!form) return false;
      try {
        const values = await form.validateFields();
        data.push(values);
      } catch {
        return false;
      }
    }
    setSanPhams(data);
    return true;
  };

  const nextStep = async () => {
    try {
      const values = await form.validateFields();
      let updatedSanPhams = sanPhams;

      if (currentStep === 1) {
        const ok = await handleSetDataProductList();
        if (!ok) return;
        updatedSanPhams = formList.map(({ form }) => form.getFieldsValue());
        setSanPhams(updatedSanPhams);
      }

      if (currentStep === 2) {
        const values = await form.validateFields();
        const { designs = [] } = values;
        tinhGia();
        // 👉 Merge các trường còn lại vào sanPhams
        const mergedSanPhams = sanPhams.map((sp, index) => ({
          ...sp,
          hasDesignFile: designs[index]?.hasDesignFile ?? false,
          noiDungThietKe: designs[index]?.noiDungThietKe ?? "",
          yeuCauDacBiet: designs[index]?.yeuCauDacBiet ?? "",
          image: designs[index]?.fileUpload?.file?.response ?? null,
        }));

        const newSanPhams = mergedSanPhams.map((item) => {
          return {
            ...item,
            sanPham: { id: item.sanPham },
          };
        });

        setSanPhams(newSanPhams);
        setFormData((prev) => ({
          ...prev,
          ...values,
          sanPhams: newSanPhams,
        }));
      }

      setFormData((prev) => ({
        ...prev,
        ...values,
        ...(currentStep === 1 ? { sanPhams: updatedSanPhams } : {}),
      }));

      setCurrentStep((prev) => prev + 1);
    } catch {
      message.error("Vui lòng điền đầy đủ thông tin.");
    }
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const finalData = {
        ...formData,
        ...values,
        sanPhams,
        gia,
        maNhanVien: maNV,
      };

      

      console.log("📦 Data to send:", finalData);

      const res = await serviceDonHang.createDonAo(finalData );
      console.log(res);
       
      if (res?.status === 201) {
        toast.success("Tạo đơn hàng thành công!");
        form.resetFields();
        setFormData({});
        setFormList([{ id: uuidv4(), form: null }]);
        setCurrentStep(0);
      } else {
        toast.error("Tạo đơn không thành công");
      }
    } catch (err) {
      toast.error("Lỗi khi gửi đơn hàng.");
      console.error("Lỗi gửi đơn:", err);
    }
  };

  const steps = [
    { title: "Thông tin khách hàng", icon: <UserOutlined /> },
    { title: "Thông tin sản phẩm", icon: <ShoppingOutlined /> },
    { title: "Thiết kế", icon: <BgColorsOutlined /> },
    { title: "Xác nhận", icon: <CheckCircleOutlined /> },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <KeychainCustomerInfo />;
      case 1:
        return (
          <KeychainProductInfo
            loaiSP={loaiSP}
            setGia={setGiaList}
            sanPhams={sanPhams}
            formList={formList}
            setFormList={setFormList}
            onFormReady={handleFormReady}
          />
        );
      case 2:
        return <KeychainDesignInfo sanPhams={sanPhams} />;
      case 3:
        return (
          <Card title="Xác nhận đơn hàng">
            <Alert
              message="Vui lòng kiểm tra lại thông tin trước khi gửi đơn hàng"
              type="info"
              showIcon
              style={{ marginBottom: 24 }}
            />

            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <Card size="small" title="Thông tin khách hàng" type="inner">
                <p>
                  <Text strong>Họ tên:</Text> {formData.tenKhachHang}
                </p>
                <p>
                  <Text strong>Số điện thoại:</Text> {formData.sdt}
                </p>
                {formData.email && (
                  <p>
                    <Text strong>Email:</Text> {formData.email}
                  </p>
                )}
              </Card>

              {formData.sanPhams &&
                formData.sanPhams.map((sp, index) => (
                  <Card
                    size="small"
                    title="Thông tin sản phẩm"
                    type="inner"
                    key={index}
                  >
                    <p>
                      <Text strong>Tên sản phẩm:</Text>{" "}
                      {sp.tenSanPham || "Chưa xác định"}
                    </p>
                    <p>
                      <Text strong>Mã sản phẩm:</Text>{" "}
                      {getTenSP(sp.sanPham) || "Chưa xác định"}
                    </p>
                    <p>
                      <Text strong>Số lượng:</Text> {sp.soLuong}
                    </p>
                    <p>
                      <Text strong>Kích thước:</Text>{" "}
                      {`${sp.chieuDai || 1} x ${sp.chieuRong || 1}` ||
                        "Chưa xác định"}
                    </p>
                    <p>
                      <Text strong>Hình dạng:</Text> {sp.hinhDang}
                    </p>
                    <p>
                      <Text strong>File thiết kế:</Text>{" "}
                      {sp.hasDesignFile ? "Có" : "Không"}
                    </p>
                    <p>
                      <Text strong>Mô tả thiết kế:</Text> {sp.noiDungThietKe}
                    </p>
                    {sp.specialRequests && (
                      <p>
                        <Text strong>Yêu cầu đặc biệt:</Text> {sp.yeuCauDacBiet}
                      </p>
                    )}
                  </Card>
                ))}
            </Space>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="keychain-wrapper">
      <div className="form-wrapper">
        <Card>
          <div className="form-header">
            <Title level={2}>Khảo sát ý kiến sản phẩm</Title>
            <Text type="secondary">
              Hoàn thành các bước để tạo đơn hàng theo yêu cầu
            </Text>
          </div>

          <Steps current={currentStep} style={{ marginBottom: 32 }}>
            {steps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </Steps>

          <Form
            form={form}
            layout="vertical"
            size="large"
            initialValues={formData}
          >
            {renderStepContent()}
            <Divider />
            <div className="step-buttons">
              <Space size="middle">
                {currentStep > 0 && (
                  <Button size="large" onClick={prevStep}>
                    Quay lại
                  </Button>
                )}
                {currentStep < steps.length - 1 && (
                  <Button type="primary" size="large" onClick={nextStep}>
                    Tiếp theo
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: "#52c41a",
                      borderColor: "#52c41a",
                    }}
                  >
                    Tạo đơn hàng ảo
                  </Button>
                )}
              </Space>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default FormKhaoSat;
