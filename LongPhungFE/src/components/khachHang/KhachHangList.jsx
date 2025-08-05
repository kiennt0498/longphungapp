import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Popconfirm,
  Row,
  Col,
  Select,
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ModalExcel from "../common/ModalExcel";
import { FaCartPlus } from "react-icons/fa6";
import SearchForm from "../common/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import KhachHangSerivce from "../../services/KhachHangService";
import {
  addCus,
  deleteCus,
  setKhachHang,
  setListKH,
  updateCus,
} from "../../redux/slide/KhachHangSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { API_FILE } from "../../services/constans";
import {useFilters} from "../../contexts/FilterContext"
import { filterData } from "../../contexts/filterUtils";

const KhachHangList = () => {
  const service = new KhachHangSerivce();

  const maNV = localStorage.getItem("maNV");
  const name = localStorage.getItem("name");

  const khachHangs = useSelector((state) => state.KhachHang.khachHangs);
  const khachHang = useSelector((state) => state.KhachHang.khachHang);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nv, setNV] = useState({ id: maNV, hoTen: name, });
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const API = API_FILE+"/upload/cus"


  const fieldMapping = {
    search: "tenKhachHang"
  }

  const {filters} = useFilters()
  const filtersData = filterData(khachHangs,filters,fieldMapping,[])

  const columns = [
    { title: "Mã khách hàng", dataIndex: "id", key: "id" },
    { title: "Họ và tên", dataIndex: "tenKhachHang", key: "tenKhachHang" },
    { title: "Số điện thoại", dataIndex: "sdt", key: "sdt" },
    {
      title: "Nguồn",
      dataIndex: "nhanVien",
      key: "nhanVien",
      render: (_, record) => {
        return record.nhanVien?.hoTen ? (
          record.nhanVien.hoTen
        ) : (
          <label>Không có dữ liệu</label>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <Space>
          <Tooltip title="Tạo đơn" color="green">
          <Button
            color="green"
            variant="outlined"
            icon={<FaCartPlus />}
            onClick={() => createBill(record)}
          />
          </Tooltip>
          <Tooltip title="Cập nhật" color="blue">
          <Button color="blue" variant="outlined" icon={<EditOutlined />} onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa" color="red">
          <Popconfirm
            title="Xóa khách hàng này?"
            description="Chú ý! một khi xóa sẽ xóa toàn bộ dữ liệu liên quan đến khách hàng này"
            okText="Đồng ý"
            cancelText="Không"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const createBill = (record) => {
    dispatch(setKhachHang(record));
    navigate("/donhang/tao-don");
    
  }

  const onOpenM = () => {
    setOpen(true);
  };

  const onCloseM = () => {
    setOpen(false);
  };

  const downFileExcel = () => {
    window.location.href = API_FILE+"/download/cus"
  }

  



  const showModal = (data) => {
    if (data) {
      dispatch(setKhachHang(data)); // Nếu chỉnh sửa khách hàng
    } else {
      dispatch(setKhachHang({ nhanVien: nv })); // Nếu thêm mới, đặt nguồn mặc định
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    dispatch(setKhachHang({}));
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const data = await form.validateFields();
      if (data.id) {
        const res = await service.updateCus(data);
        if (res.status === 200) {
          dispatch(updateCus(res.data));
          toast.success("Cập nhật thành công",{position: "top-center"});
          closeModal();
        }
      } else {
        
        const res = await service.insterCus(data);
        if (res.status === 201) {
          dispatch(addCus(res.data));
          toast.success("Thêm mới thành công",{position: "top-center"});
          closeModal();
        }
      }
    } catch (error) {
      toast.error(error.response.data,{position: "top-center"});
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    
    setLoading(true)
    try {
      
      const res = await service.deleteCus(id)
      if(res.status === 200){
        toast.success(res.data,{position: "top-center"})
        dispatch(deleteCus(id))
      }
    } catch (error) {
      
      toast.error("Xóa thất bại",{position: "top-center"})
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  };

  const getData = async () => {
    try {
      const res = await service.getListCus();

      if (res.status === 200) {
        dispatch(setListKH(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue({
      ...khachHang,
      nhanVien: khachHang.nhanVien || nv,
    });
  }, [khachHang]);

  const setFileUp = ( data) =>{
    getData()
  }

  return (
    <div>
      <h1>Danh sách khách hàng</h1>
      <Row>
        <Col span={12}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Thêm khách hàng
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            color="cyan"
            variant="solid"
            icon={<PlusOutlined />}
            onClick={() => onOpenM()}
          >
            Nhập excel
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            color="green"
            variant="solid"
            icon={<PlusOutlined />}
            onClick={() => downFileExcel()}>
            Xuất excel
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={filtersData}
        columns={columns}
        rowKey="id"
        style={{ marginTop: 20 }}
        loading={loading}
      />
      <Modal
        title={khachHang ? "Chỉnh sửa khách hàng" : "Thêm khách hàng"}
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => closeModal()}
      >
        <Form form={form} layout="vertical" className="Form">
          <Form.Item name="id" label="Mã Khách hàng">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="tenKhachHang"
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="sdt"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
              {
                min: 10,
                message: "Nhập tối thiểu 10 số",
              },
              {
                pattern: /^[0-9]+$/,
                message: "Chỉ nhập số",
              },
            ]}
          >
            <Input maxLength={13} />
          </Form.Item>

          <Form.Item name={["nhanVien", "id"]} label="Nguồn">
            <Select disabled>
              {khachHang?.nhanVien ? (
                <Select.Option value={nv.id}>
                  {khachHang.nhanVien.hoTen}
                </Select.Option>
              ) : (
                <Select.Option value={nv.id}>{nv.hoTen}</Select.Option>
              )}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <ModalExcel open={open} onCloseM={onCloseM} API={API} setFileUp={setFileUp}/>
    </div>
  );
};

export default KhachHangList;
