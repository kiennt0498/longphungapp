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
  const spService = new SanPhamService();
  const dhService = new DonHangService();

  const donHang = useSelector((state) => state.DonHang.donHang);
  const [loaiSP, setLoaiSP] = useState([]);
  const [hinhDang, setHinhDang] = useState([]);
  const [donCT, setDonCT] = useState([]);
  const [finalData,setFinalData] = useState({});

  const getIDDonCT = (data) => {
    donCT.forEach(i=>{
      if(i.loaiSp.id === data.loaiSp.id){
        return i.id
      }
    })
  }


  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const idNV = localStorage.getItem("maNV");

  const createDon = async (sanPham, gia, thue) => {
  if (sanPham.length === 0) {
    toast.warning("Cần ít nhất 1 sản phẩm trong danh sách");
    return;
  }

  const khachHang = donHang.khachHang;

  const newData = {
    don: {
      maDonHang: donHang.maDonHang,
      id: donHang.id,
      khachHang: { ...khachHang },
      gia: gia,
      nhanVien: { id: idNV },
      thue: thue,
    },
    donCT: sanPham.map((sp) => {
      const matched = donCT.find(
        (ct) => ct.loaiSp?.id === sp.loaiSp?.id
      );

      return {
        id: matched?.id || null,  // dùng id để cập nhật
        sanPham: { id: sp.id, tenSP: sp.tenSP },
        chieuDai: sp.chieuDai,
        chieuRong: sp.chieuRong,
        soLuong: sp.soLuong,
        donGia: sp.donGia,
        giaGoc: sp.giaGoc,
        images: matched?.images || null,
        noiDungThietKe: matched?.noiDungThietKe || "",
        yeuCauDacBiet: matched?.yeuCauDacBiet || "",
        kichThuoc: matched?.kichThuoc || null,
        hinhDang: matched?.hinhDang || null,
        loaiSp: sp.loaiSp, // bạn vẫn cần truyền loại sản phẩm để khớp
      };
    }),
  };

  console.log("DỮ LIỆU newData:", newData);
  setFinalData(newData);
  setCurrentStep(currentStep + 1);
};

  const getDataDonCT = async () => {
    try {
      const res = await dhService.getDonHangCT(donHang?.maDonHang);
      res && res.data && setDonCT(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataDonCT();
  }, [donHang]);


  const onNext = async () => {
    try {
      const values = await form.validateFields();
      console.log(values);
      if (currentStep === 0) {
        dispatch(setKhachHang(values));
      }

      if(currentStep === 1){

      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const processSteps = [
    {
      title: "Thông tin đơn hàng",
      content: "Xác nhận thông tin khách hàng ",
      icon: <MdEditNote />,
    },
    {
      title: "Nhập sản phẩm",
      content: "Nhập thông tin sản phẩm",
      icon: <FaRegCreditCard />,
    },
    {
      title: "Xác nhận đơn hàng",
      content: "Xác nhận sản phẩm đơn hàng",
      icon: <FaCheckCircle />,
    },
  ];

  const getDataKH = async () => {
    try {
      const resSP = await spService.getList();
      const resLoai = await spService.getLoaiSP();
      const resHinhDang = await spService.getHinhDang();

      if (resSP.status === 200) {
        dispatch(setListSP(resSP.data));
      }

      if (resLoai.status === 200) {
        setLoaiSP(resLoai.data);
      }

      if (resHinhDang.status === 200) {
        setHinhDang(resHinhDang.data);
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

  const donMoi = () => {
    setCurrentStep(0);
  };

  return (
    <>
      <Form form={form} layout="vertical">
        <Steps current={currentStep} items={processSteps} />
        <Form.Item style={{ marginTop: 16 }}>
          <Row justify="space-between">
            <Col>
              <Space>
                {currentStep > 0 && currentStep < 2 && (
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
          <KhachHangform
            form={form}
            donHang={donHang}
            loaiSP={loaiSP}
            hinhDang={hinhDang}
            donCT={donCT}
          />
        )}

        {currentStep === 1 && <BaoGiaDonHang getData={createDon} />}

        {currentStep === 2 && <ThongBaoTK donMoi={donMoi} finalData={finalData} />}
      </Form>
      <ModalHuyDon
        isModalOpen={isModalOpen}
        onConfirm={confirm}
        onCancel={cancel}
      />
    </>
  );
};

export default DonHangForm;
