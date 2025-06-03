import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Space,
  Steps,
  Table,
  theme,
} from "antd";

import React, { use, useEffect, useState } from "react";
import FormDonHang from "./BaoGiaDonHang";
import { MdEditNote } from "react-icons/md";
import { FaCheckCircle, FaRegCreditCard } from "react-icons/fa";
import KhachHangform from "./KhachHangform";

import KhachHangService from "../../services/KhachHangService";
import { useDispatch, useSelector } from "react-redux";
import { setKhachHang, setListKH } from "../../redux/slide/KhachHangSlice";

import SanPhamService from "../../services/SanPhamService";
import DonHangService from "../../services/DonHangService";
import { setListSP } from "../../redux/slide/SanPhamSlice";
import ModalHuyDon from "./ModalHuyDon";
import { setDonCT } from "../../redux/slide/DonHangSlice";
import { toast } from "react-toastify";
import ThongBaoTK from "./ThongBaoTK";
import BaoGiaDonHang from "./BaoGiaDonHang";

const DonHangForm = () => {
  const khService = new KhachHangService();
  const spService = new SanPhamService();
  const dhService = new DonHangService();

  const khachHangs = useSelector((state) => state.KhachHang.khachHangs);
  const khachHang = useSelector((state) => state.KhachHang.khachHang);
  
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const idNV = localStorage.getItem("maNV");

  console.log(idNV);
  

  const createDon = async (sanPham,gia) =>{
     const newData = {
        don: {
          khachHang : {...khachHang, nhanVien: {id: idNV}},
          gia:gia,
          nhanVien: {id: idNV}
        },
        donCT: sanPham.map((i) => {
          return {
            sanPham: { id: i.id , tenSP: i.tenSP},
            chieuDai: i.chieuDai,
            chieuRong: i.chieuRong,
            soLuong: i.soLuong,
            donGia: i.donGia,
            giaGoc: i.giaGoc
          };
        })
      }

      console.log(newData);
      
      if(sanPham.length === 0){
        toast.warning("Cần ít nhất 1 sản phẩm trong danh sách")
        return
      }
      
      try {
        const res = await dhService.insterBill(newData);
        console.log(res.data);
        
      if(res.status === 200 && res.data){
        dispatch(setDonCT(res.data))
      }
      } catch (error) {
        console.log(error);
        message.error("Loi")
      }

      setCurrentStep(currentStep +1)
      
  };


  

  const onNext = async () => {
    try {
      const values = await form.validateFields();
    if (currentStep === 0) {
      dispatch(setKhachHang(values))
    }
    setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log(error);
      
    }
     
  }
  

  const onSubmit = (data) => {
    console.log(data);
  };


  const processSteps = [
    {
      title: "Thông tin khách hàng",
      content: "Nhập thông tin khách hàng ",
      icon: <MdEditNote />,
    },
    {
      title: "Lên đơn hàng chờ",
      content: "Nhập thông tin sản phẩm",
      icon: <FaRegCreditCard />,
    },{
      title: "Lên đơn thành công",
      content: "Chờ thiết sản phẩm",
      icon: <FaCheckCircle />,
    },
  ];

  const getDataKH = async () => {
    try {
      const res = await khService.getListCus();
      const resSP = await spService.getList();
      if (res.status === 200) {
        dispatch(setListKH(res.data));
      }
      if (resSP.status === 200) {
        dispatch(setListSP(resSP.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataKH();
  }, []);

  const confirm = () => {
    setIsModalOpen(true);
  };
  const cancel = () => {
    setIsModalOpen(false);
  };

  const donMoi =() =>{
    setCurrentStep(0)
  }

  

  

  return (
    <>
      <Form form={form} layout="vertical">
        <Steps current={currentStep} items={processSteps} />
        <Form.Item style={{ marginTop: 16 }}>
          <Row justify="space-between">
            <Col>
              <Space>
                {currentStep > 0 && currentStep < 2 &&(
                  <Button onClick={() => setCurrentStep(currentStep - 1)}>
                    Quay lại
                  </Button>
                )}
                {currentStep < 1 && (
                  <Button type="primary" onClick={onNext}>
                    Tiếp tục
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Form.Item>

        <Divider />

        {currentStep === 0 && (
          <KhachHangform form={form} khachHangs={khachHangs} />
        )}

        {currentStep === 1 && <BaoGiaDonHang getData={createDon}/>}

        {currentStep === 2 && <ThongBaoTK donMoi={donMoi}/>}

      </Form>
      <ModalHuyDon isModalOpen={isModalOpen} onConfirm={confirm} onCancel={cancel}/>
    </>
  );
};

export default DonHangForm;
