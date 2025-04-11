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
import { setSanPham } from "../../redux/slide/SanPhamSlice";

const FormSanPham = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const [nguyenLieu, setNguyenLieu] = useState([]);
  const [congDoan, setCongDoan] = useState([]);
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

  const steps = [
    { title: "Nguyên liệu sản xuất" },
    { title: "Quy trình sản xuất" },
    { title: "Thông tin sản phẩm" },
    { title: "Lợi nhuận sản phẩm" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resNL, resCD] = await Promise.all([
          nguyenLieuService.getListNL(),
          congDoanService.getListCD(),
        ]);
        setNguyenLieu(resNL.data || []);
        setCongDoan(resCD.data || []);
      } catch (error) {
        console.error("Lỗi khi tải nguyên liệu / công đoạn:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!data || !data.id) return;

    setNguyenLieuSX(data.nguyenVatLieus || []);
    setQuyTrinh(data.quyTrinh?.congDoans || []);
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

  useEffect(() => {
    if (current === 3) {
      tinhGia();
    }
  }, [current, nguyenLieuSX, quyTrinh]);

 

  const giaCongDoan = (list, chieuDai, chieuRong) => {
    let total = 0;
    list.forEach((cd) => {
      const giaNguyenLieu = cd.giaMuaNguyenLieu || 0;
      const heSoThuMua = cd.heSoThuMua || 0;
      const tongChiPhi = giaNguyenLieu + heSoThuMua * chieuDai * chieuRong;
      total += tongChiPhi;
    });
  
    
    
    return total;
  };

  const giaNguyenLieu = (list, chieuDai, chieuRong) => {
    let total = 0;
    list.forEach((item) => {
      const giaNhap = item.giaNhap || 0;
      const heSoThuMua = item.heSoThuMua || 1;
      const heSoBu = item.heSoBu || 1;

      const thanhTien =
        giaNhap + heSoThuMua * (chieuDai + heSoBu) * (chieuRong + heSoBu);
      total += thanhTien;
    });
    console.log("nguyen lieu: ", total);
    
    return total;
  };

  const tinhGia = () => {
    const total =
      giaNguyenLieu(nguyenLieuSX, 1, 1) + giaCongDoan(quyTrinh, 1, 1);
    console.log(total);
    setGia(total);
  };

  const next = async () => {
    if (current === 2) {
      try {
        const values = await form.validateFields();
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
    const payload = {
      id: data.id || null,
      tenSP: formData.tenSP,
      loaiSp: { id: formData.loaiSp },
      chatLieu: { id: formData.chatLieu },
      hinhDang: { id: formData.hinhDang },
      doViTinh: { id: formData.doViTinh },
      gia,
      loiNhuan: loiNhuanSP,
      quyTrinh: { tenQuyTrinh: formData.tenSP, congDoans: quyTrinh },
      nguyenVatLieus: nguyenLieuSX,
    };

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
      {current === 2 && <SanPhamForm form={form} quyTrinh={quyTrinh} />}
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
