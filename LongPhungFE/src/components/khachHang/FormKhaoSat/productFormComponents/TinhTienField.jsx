// components/SharedFormFields.js
import React, { use, useEffect, useState } from "react";
import { Form, Input, InputNumber, Col, Row } from "antd";
import { useSelector } from "react-redux";
import { capNhatGia } from "../../../../helpers/CongThucTinhGia";
import SanPhamService from "../../../../services/SanPhamService";
import { formatCurrency } from "../../../../helpers/formatData";
import { useWatch } from "antd/es/form/Form";

const TinhTienField = ({index,setGia,sanPham}) => {
  const service = new SanPhamService();
  
  const [loiNhuans, setLoiNhuans] = useState([]);
  const [giaDuKien, setGiaDuKien] = useState(0);
  const chieuDai = Number(useWatch("chieuDai")) || 1;
  const chieuRong = Number(useWatch("chieuRong")) || 1;
  const soLuong = Number(useWatch("soLuong")) || 1; 

  const getLoiNhuans = async () => {
    try {
      const res = await service.getLoiNhuan(sanPham.id);
      console.log("Loi Nhuans:", res);
      res && res.data && setLoiNhuans(res.data);
    } catch (error) {
      console.error("Error fetching loi nhuans:", error);
      return [];
    }
  };

  

  useEffect(() => {
    sanPham && sanPham.id && getLoiNhuans();
  }, [sanPham]);

   const congDoans =
      sanPham?.quyTrinh?.quyTrinhCongDoans?.map((item) => item.congDoan) || [];

  useEffect(() => {
    if (sanPham && sanPham.id && loiNhuans.length > 0 && Array.isArray(congDoans)) {
     
      const inputGia = {
      quyTrinh: { congDoans },
      nguyenVatLieus: sanPham.nguyenVatLieus,
      loiNhuan: loiNhuans,
      chieuDai: chieuDai,
      chieuRong: chieuRong,
      soLuong: soLuong,
      heSoThuMua: sanPham.heSoThuMua,
    };
    console.log("Input Gia:", inputGia);

    const giaGoc = capNhatGia(inputGia);
    const gia = giaGoc * soLuong;   
    setGia(index,gia) 
    setGiaDuKien(gia);
    
      
    }
  }, [chieuDai, chieuRong, sanPham, soLuong, loiNhuans]);
  
  
  

  return (
    <>
      <Row gutter={16}>
        <Col xs={24} md={12}>
        <Form.Item
          name="soLuong"
          label="Số lượng cần đặt"
          rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          initialValue={soLuong}
        >
          <InputNumber
            min={1}
            placeholder="1"
            size="large"
            style={{ width: "100%" }}
            
          />
        </Form.Item>
      </Col>

      <Col xs={24} md={12}>
        <Form.Item label="Giá tiền dự kiến">
          <Input size="large" disabled addonAfter="VND" value={formatCurrency(giaDuKien)}/>
        </Form.Item>
      </Col>
      </Row>
    </>
  );
};

export default TinhTienField;
