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
  Checkbox,
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
import {
  setHinhDang,
  setListSP,
  setLoaiSP,
} from "../../../redux/slide/SanPhamSlice";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import DonHangService from "../../../services/DonHangService";
import KhachHangSerivce from "../../../services/KhachHangService";
import { setListKH, setKhachHang } from "../../../redux/slide/KhachHangSlice";

const { Step } = Steps;
const { Title, Text } = Typography;

const FormKhaoSat = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});
  const [formList, setFormList] = useState([{ id: uuidv4(), form: null }]);
  const [sanPhams, setSanPhams] = useState([]);
  const [thietKe, setThietKe] = useState(false);
  const [gia, setGia] = useState([]);
  const [listGia, setListGia] = useState([]);
  const loaiSP = useSelector((state) => state.SanPham.loaiSP);
  const sanPhamList = useSelector((state) => state.SanPham.sanPhams);
  const hinhDangList = useSelector((state) => state.SanPham.hinhDang);
  const khachHang = useSelector((state) => state.KhachHang.khachHang);
  const dispatch = useDispatch();
  const maNV = localStorage.getItem("maNV");
  const serviceDonHang = new DonHangService();

  useEffect(() => {
    const fetchLoaiSP = async () => {
      const res = await new SanPhamService().getLoaiSP();
      const resHD = await new SanPhamService().getHinhDang();
      const resKhachhang = await new KhachHangSerivce().getListCus();
      if (res?.data) dispatch(setLoaiSP(res.data));
      resHD?.data && dispatch(setHinhDang(resHD.data));
      resKhachhang.data && dispatch(setListKH(resKhachhang.data));
    };
    fetchLoaiSP();
  }, []);

  const getHinhDang = (hinhDang) => {
    const id = typeof hinhDang === "object" ? hinhDang?.id : hinhDang;
    const sp = hinhDangList.find((item) => item.id === id);
    return sp?.ten;
  };
  const getTenLoai = (loai) => {
    console.log(loai);

    if (!loaiSP || !loai) return null;

    const id = typeof loai === "object" ? loai?.id : loai;
    const found = loaiSP.find((item) => item.id === id);

    return found?.ten || "Chưa xác định";
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

  // const setGiaList = (index, gia) => {
  //   setListGia((prev) => {
  //     const newList = [...prev];
  //     newList[index] = gia;
  //     return newList;
  //   });
  // };

  // const tinhGia = () => {
  //   const tongGia = listGia.reduce((sum, gia) => sum + (gia || 0), 0);
  //   setGia(tongGia);
  // };

  // console.log("gia: ", gia);
  // console.log("list gia: ", listGia);

  // useEffect(() => {
  //   tinhGia();
  // }, [listGia]);

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

      if(currentStep)

      if (currentStep === 1) {
        const ok = await handleSetDataProductList();
        if (!ok) return;
        updatedSanPhams = formList.map(({ form }) => form.getFieldsValue());
        setSanPhams(updatedSanPhams);
      }

      if (currentStep === 2) {
        const values = await form.validateFields();
        const { designs = [] } = values;
        console.log(designs);

        // tinhGia();
        // 👉 Merge các trường còn lại vào sanPhams
        const mergedSanPhams = sanPhams.map((sp, index) => ({
          ...sp,
          hasDesignFile: designs[index]?.hasDesignFile ?? false,
          noiDungThietKe: designs[index]?.noiDungThietKe ?? "",
          yeuCauDacBiet: designs[index]?.yeuCauDacBiet ?? "",
          images: designs[index]?.fileUpload?.file?.response ?? null,
        }));

        const newSanPhams = mergedSanPhams.map((i) => ({
          ...i,
          hinhDang:
            i.hinhDang && typeof i.hinhDang === "object"
              ? i.hinhDang
              : i.hinhDang
              ? { id: i.hinhDang }
              : null,
        }));

        console.log("newSanPhams: ", newSanPhams);

        const finalSanphams = newSanPhams.map((sp) => ({
          ...sp,
          loaiSp: typeof sp.loaiSp === "object" ? sp.loaiSp : { id: sp.loaiSp },
        }));

        setSanPhams(finalSanphams);
        setFormData((prev) => ({
          ...prev,
          ...values,
          sanPhams: finalSanphams,
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
        // ...khachHang,
        ...formData,
        ...values,
        sanPhams,
        maNhanVien: maNV,
        thietKe: thietKe,
      };

      console.log("📦 Data to send:", finalData);

      const res = await serviceDonHang.createDonAo(finalData);
      console.log(res);

      if (res?.status === 201) {
        toast.success("Tạo đơn hàng thành công!");
        form.resetFields();
        setFormData({});
        setFormList([{ id: uuidv4(), form: null }]);
        dispatch(setKhachHang({}))
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
        return <KeychainCustomerInfo form={form}/>;
      case 1:
        return (
          <KeychainProductInfo
            loaiSP={loaiSP}
            // setGia={setGiaList}
            sanPhams={sanPhams}
            formList={formList}
            setFormList={setFormList}
            onFormReady={handleFormReady}
            form={form}
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
              </Card>

              {formData.sanPhams &&
                formData.sanPhams.map((sp, index) => {
                  console.log("sp.loaiSP = ", sp.loaiSp);
                  return (
                    <Card
                      size="small"
                      title={`Sản phẩm #${index + 1}`}
                      type="inner"
                      key={index}
                    >
                      <p>
                        <Text strong>Tên sản phẩm:</Text>{" "}
                        {sp.tenSanPham || "Chưa xác định"}
                      </p>
                      <p>
                        <Text strong>Loại sản phẩm:</Text>{" "}
                        {`${getTenLoai(sp.loaiSp)}` || "Chưa xác định"}
                      </p>
                      {/* <p>
                      <Text strong>Mã sản phẩm:</Text>{" "}
                      {getTenSP(sp.sanPham) || "Chưa xác định"}
                    </p> */}
                      {/* <p>
                      <Text strong>Số lượng:</Text> {sp.soLuong}
                    </p> */}
                      <p>
                        <Text strong>Kích thước:</Text>{" "}
                        {`${sp.kichThuoc}` || "Chưa xác định"}
                      </p>
                      <p>
                        <Text strong>Hình dạng:</Text>{" "}
                        {getHinhDang(sp.hinhDang) || "Chưa xác định"}
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
                          <Text strong>Yêu cầu đặc biệt:</Text>{" "}
                          {sp.yeuCauDacBiet}
                        </p>
                      )}
                    </Card>
                  );
                })}
            </Space>
            <Divider />
            {/* <Checkbox
              checked={thietKe}
              onChange={(e) => setThietKe(e.target.checked)}
            >
              Tự thiết kế
            </Checkbox> */}
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
