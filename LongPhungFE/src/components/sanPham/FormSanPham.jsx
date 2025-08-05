import { Button, Col, Form, Row, Space, Steps } from "antd";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import SanPhamForm from "./SanPhamForm";
import QuyTrinhSX from "./QuyTrinhSX";
import NguyenLieuSX from "./NguyenLieuSX";
import LoiNhuanSP from "./LoiNhuanSP";

import NguyenLieuService from "../../services/NguyenLieuService";
import CongDoanService from "../../services/CongDoanService";
import SanPhamService from "../../services/SanPhamService";
import NhanVienService from "../../services/NhanVienService";
import { setSanPham } from "../../redux/slide/SanPhamSlice";
import { giaCongDoan, giaNguyenLieu } from "../../helpers/CongThucTinhGia";


const FormSanPham = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const [nguyenLieu, setNguyenLieu] = useState([]);
  const [congDoan, setCongDoan] = useState([]);
  const [nhanViens, setNhanViens] = useState([]);
  const [nguyenLieuSX, setNguyenLieuSX] = useState([]);
  const [quyTrinh, setQuyTrinh] = useState([]);
  const [loiNhuanSP, setLoiNhuanSP] = useState([]);
  const [gia, setGia] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.SanPham.sanPham);

  const nguyenLieuService = new NguyenLieuService();
  const congDoanService = new CongDoanService();
  const sanPhamService = new SanPhamService();
  const nhanVienService = new NhanVienService();

  const steps = [
    { title: "Nguyên liệu sản xuất" },
    { title: "Quy trình sản xuất" },
    { title: "Thông tin sản phẩm" },
    { title: "Lợi nhuận sản phẩm" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resNL, resCD, resNV] = await Promise.all([
          nguyenLieuService.getListNL(),
          congDoanService.getListCD(),
          nhanVienService.getListEmp(),
        ]);
        setNguyenLieu(resNL.data || []);
        setCongDoan(resCD.data || []);
        setNhanViens(resNV.data || []);
      } catch (error) {
        console.error("Lỗi khi tải nguyên liệu / công đoạn:", error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    if (!data || !data.id) return;
    const qt =
      data.quyTrinh.quyTrinhCongDoans.map((item) => {
        return (item.congDoan);
      }) || [];

    setNguyenLieuSX(data.nguyenVatLieus || []);
    console.log(data.nguyenVatLieus, nguyenLieuSX);
    
    setQuyTrinh(qt);
    if (data.gia) setGia(data.gia);

    const fetchLoiNhuan = async () => {
      try {
        const res = await sanPhamService.getLoiNhuan(data.id);
        setLoiNhuanSP(res.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy lợi nhuận:", error);
      }
    };

    fetchLoiNhuan();
  }, [data?.id]);

  console.log(quyTrinh);

  useEffect(() => {
    if (current === 3) {
      tinhGia();
    }
  }, [current, nguyenLieuSX, quyTrinh]);


  const tinhGia = () => {

    const total = giaNguyenLieu(nguyenLieuSX, 1, 1) + giaCongDoan(quyTrinh, 1, 1)
    setGia(total);
  };

  const next = async () => {
  
    if (current === 2) {
      try {
        const values = await form.validateFields();
        console.log(values);
        setFormData(values);
        setCurrent(current + 1);
      } catch {
        toast.warning("Vui lòng nhập đầy đủ thông tin sản phẩm.");
      }
    } else {
      setCurrent(current + 1);
    }
  };

  const submit = async () => {
    const listQT = quyTrinh.map((item) => {
      return { congDoan: item, thuTu: item.thuTu };
    });
    const payload = {
      id: data.id || null,
      tenSP: formData.tenSP,
      loaiSp: { id: formData.loaiSp },
      chatLieu: { id: formData.chatLieu },
      doViTinh: { id: formData.doViTinh },
      gia,
      loiNhuan: loiNhuanSP,
      heSoThuMua: formData.heSoThuMua,
      quyTrinh: {
        id: data.quyTrinh?.id || null,
        tenQuyTrinh: formData.tenSP,
        congDoans: listQT,
        nhanVienQL: { id: formData.nhanVienQL },
      },
      nguyenVatLieus: nguyenLieuSX,
      
    };

    console.log(payload);
    

    try {
      const res = data.id
        ? await sanPhamService.updateSanPham(payload)
        : await sanPhamService.insertProd(payload);

      if (res.status === 200 || res.status === 201) {
        toast.success(
          data.id ? "Cập nhật thành công" : "Thêm sản phẩm thành công"
        );
        dispatch(setSanPham({}));
        navigate("/sanpham");
      }
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
      toast.error("Có lỗi xảy ra khi lưu sản phẩm.");
    }
  };

  

  return (
    <>
      <Button
        type="primary"
        onClick={() => navigate(-1)}
        style={{ marginBottom: 16 }}
      >
        <FaArrowLeft />
      </Button>

      <Steps current={current} items={steps} style={{ marginBottom: 24 }} />

      {current === 0 && (
        <NguyenLieuSX
          data={nguyenLieu}
          nguyenLieuSX={nguyenLieuSX}
          setNguyenLieuSX={setNguyenLieuSX}
        />
      )}
      {current === 1 && (
        <QuyTrinhSX
          congDoan={congDoan}
          quyTrinh={quyTrinh}
          setQuyTrinh={setQuyTrinh}
        />
      )}
      
      {current === 2 && <SanPhamForm form={form} quyTrinh={quyTrinh} listNV={nhanViens}/>}
      {current === 3 && (
        <LoiNhuanSP
          gia={gia}
          loiNhuan={loiNhuanSP}
          setLoiNhuan={setLoiNhuanSP}
        />
      )}

      <Form.Item style={{ marginTop: 24 }}>
        <Row justify="end">
          <Col>
            <Space>
              {current > 0 && (
                <Button onClick={() => setCurrent(current - 1)}>
                  Quay lại
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Tiếp tục
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={submit}>
                  Lưu sản phẩm
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};

export default FormSanPham;
