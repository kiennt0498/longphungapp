import {
  Button,
  Col,
  Divider,
  Form,
  Image,
  Input,
  Row,
  Select,
  Upload,
} from "antd";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { MdScale } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaArrowLeft, FaLayerGroup } from "react-icons/fa6";
import ModalSanPham from "./ModalSanPham";
import SanPhamService from "../../services/SanPhamService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  setChatLieu,
  setHinhDang,
  setKieuMau,
  setLoaiSP,
  setSanPham,
} from "../../redux/slide/SanPhamSlice";

const SanPhamForm = ({form,quyTrinh}) => {

  const service = new SanPhamService();
  const data = useSelector((state) => state.SanPham.sanPham);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [choose, setChose] = useState(true);
  const [open, setOpen] = useState(false);

  const [donvi, setDonvi] = useState([]);

  const hinhSP = useSelector((state) => state.SanPham.hinhDang);
  const theLoaiSp = useSelector((state) => state.SanPham.loaiSP);
  const chatLieu = useSelector((state) => state.SanPham.chatLieu);


  const onOpen = (value) => {
    setChose(value);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

console.log(quyTrinh);


 const handleSetName = () => {
  form.setFieldValue("tenSP", "");

  const tenSP = form.getFieldValue("tenSP");
  const loaiSp = form.getFieldValue("loaiSp");
  const chatLieuId = form.getFieldValue("chatLieu");
  const hinhDangId = form.getFieldValue("hinhDang");

  let newName = "";

  if (tenSP) {
    newName += tenSP;
  }
  if (loaiSp) {
    const data = theLoaiSp.find((i) => i.id === loaiSp);
    if (data) {
      newName += ` ${data.ten}`;
    }
  }
  if (chatLieuId) {
    // Check if chatLieu is an array before using filter/find
    if (Array.isArray(chatLieu)) {
      const data = chatLieu.find((i) => i.id === chatLieuId);
      if (data) {
        newName += ` ${data.ten}`;
      }
    } else {
      console.error("chatLieu is not an array:", chatLieu);
    }
  }
  if (hinhDangId) {
    const data = hinhSP.find((i) => i.id === hinhDangId);
    if (data) {
      newName += ` ${data.ten}`;
    }
  }

  form.setFieldsValue({ tenSP: newName.trim().toLowerCase() });
};

  



  const getData = async () => {
    try {
      const resDonvi = await service.getDonVi();
      const resTruong = await service.getTruong();

      // Xử lý dữ liệu đơn vị tính
      if (resDonvi.status === 200 && Array.isArray(resDonvi.data)) {
        const listDonVi = resDonvi.data.map((item) => ({
          value: item.id,
          label: item.ten,
        }));
        setDonvi(listDonVi);
      } else {
        console.error("Error fetching or processing DonVi data:", resDonvi);
        setDonvi([]);
      }

      // Xử lý dữ liệu trường
      if (resTruong && resTruong.data) {
        dispatch(setChatLieu(resTruong.data.chatLieuSP));
        dispatch(setLoaiSP(resTruong.data.theLoaiSP));
        dispatch(setHinhDang(resTruong.data.hinhDangSP));
        dispatch(setKieuMau(resTruong.data.kieuMau));
      }
      // Nếu đang ở chế độ chỉnh sửa, set dữ liệu vào form
      if (data.id) {
        
        const newData = {
          ...data,
          doViTinh: data.doViTinh?.id,
          chatLieu: data.chatLieu?.id,
          loaiSp: data.loaiSp?.id,
          hinhDang: data.hinhDang?.id,
        };
        console.log(newData);
        
        form.setFieldsValue(newData);
        return; // Kết thúc hàm sau khi set dữ liệu
      }
      // reset data
      dispatch(setSanPham({}));
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      setKieuMau([]);
      setDonvi([]);
      setChatLieu([]);
    }
  };

  const listChatLieu = chatLieu.map((i) => {
    const data = {
      value: i.id,
      label: i.ten,
    };
    return data;
  });

  const listHinh = hinhSP.map((i) => {
    const data = {
      value: i.id,
      label: i.ten,
    };
    return data;
  });

  const listLoai = theLoaiSp.map((i) => {
    const data = {
      value: i.id,
      label: i.ten,
    };
    return data;
  });

  

  useEffect(() => {
    getData();
  }, [data.id]); // Chỉ gọi khi data.id thay đổi

  

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const newData = {...values,
        loaiSp: {id: values.loaiSp},
        chatLieu: {id: values.chatLieu},
        doViTinh: {id: values.doViTinh},
        hinhDang: {id: values.hinhDang}
      }
      console.log(values);
      
      console.log(newData);
      
      if (data.id) {
        // Update operation
        const res = await service.updateSanPham(newData);
        if (res.status === 200) {
          toast.success("Sửa sản phẩm thành công");
        } else {
          toast.error(`Sửa sản phẩm thất bại: ${res.status}`);
        }
      } else {
        // Create operation
        const res = await service.insertProd(newData);
        if (res.status === 201) {
          toast.success("Thêm sản phẩm thành công");
          form.resetFields();
        } else {
          toast.error(`Thêm sản phẩm thất bại: ${res.status}`);
        }
      }
      navigate(-1)
      dispatch(setSanPham({}))
      form.resetFields()
    } catch (error) {
      toast.error("Có lỗi xảy ra");
      console.log(error);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChangeGiaLoai = (value) => {
    if (value) {
      const data = theLoaiSp.filter((i) => i.id === value);
     
    }else{
     
    }
  };




  return (
    <div>
      
      {data.id ? <h1>Chỉnh sửa sản phẩm</h1> : <h1>Thêm sản phẩm</h1>}
      <Row>
        <Col span={8}>
          <Image
            width="100%"
            src="https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
          />
          <Upload listType="picture" accept=".jpg, .png, .gif" maxCount={1}>
            {/* <Button  icon={<UploadOutlined />}>Upload</Button> */}
          </Upload>
        </Col>
        <Col span={15} offset={1}>
          <Row justify={"end"} gutter={16}>
            <Col>
              <Button
                color="magenta"
                variant="solid"
                onClick={() => onOpen(false)}
              >
                <MdScale />
                Thêm đơn vị tính
              </Button>
            </Col>
          </Row>
          <Form
            layout="vertical"
            className="form"
            form={form}
            onFinish={handleSubmit}
          >
            <Form.Item name="id" label="Mã sản phẩm">
              <Input disabled />
            </Form.Item>
            <Row>
              <Col span={16}>
                <Form.Item
                  name="tenSP"
                  label="Tên sản phẩm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên sản phẩm",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6} offset={2}>
                <Form.Item label=" ">
                  <Button type="primary" onClick={handleSetName}>
                    Tạo tên
                  </Button>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Form.Item
                  name="loaiSp"
                  label="Thể loại sản phẩm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn loại sản phẩm",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    options={listLoai ?? []}
                    placeholder="Lọai sản phẩm"
                    onChange={onChangeGiaLoai}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="hinhDang"
                  label="Hình dáng sản phẩm"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng chọn hình dáng sản phẩm",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    allowClear
                    options={listHinh ?? []}
                    placeholder="Hình dáng"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="doViTinh"
              label="Đơn vị tính"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đơn vị tính",
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                options={donvi ?? []}
                placeholder="Chọn đơn vị tính"
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      {/* <ModalSanPham
        open={open}
        onClose={onClose}
        choose={choose}
        nhomSP={nhomSP}
        theLoaiSP={theLoaiSp}
        chatLieuSP={chatLieu}
      /> */}
    </div>
  );
};

export default SanPhamForm;
