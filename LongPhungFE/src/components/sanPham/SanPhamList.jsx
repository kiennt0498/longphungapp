import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Input,
  Card,
  Row,
  Col,
  Space,
  Tooltip,
  Popconfirm,
} from "antd";
import { FaArrowsUpToLine, FaCartPlus, FaFolderPlus } from "react-icons/fa6";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import SanPhamService from "../../services/SanPhamService";
import SearchForm from "../common/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteSP, setListSP, setSanPham } from "../../redux/slide/SanPhamSlice";
import ModalSanPham from "./ModalSanPham";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SanPhamList = () => {
  const service = new SanPhamService();

  const products = useSelector((state) => state.SanPham.sanPhams);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [key, setKey] = useState(true);
  const navigate = useNavigate();

  const onOpen = (key) => {
    setKey(key);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const addProduct = (data) => {
    
    
    if (data) {
      dispatch(setSanPham(data));
      navigate("edit");
    } else {
      dispatch(setSanPham({}));
      navigate("them");
    }
  };
  const onDelete = async (data) => {
    
   try {
    const res = await service.deleteSanPham(data.id);

    
    if(res.status === 200){
      toast.success("Xóa thành công")
      dispatch(deleteSP(data.id))
    }else{
      toast.error("Xóa thất bại")
    }
   } catch (error) {
    toast.error("Xóa thất bại")
    console.log(error);
   }
  };
  

  const onSearch = async (choose, valuse) => {};

  const columns = [
    { title: "Mã sản phẩm", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "tenSP", key: "tenSP" },
    {
      title: "Đơn vị tính",
      dataIndex: "doViTinh",
      key: "doViTinh",
      render: (data) =>data?  `${data.ten}`: "N/A",
    },

    {
      title: "Giá bán",
      dataIndex: "gia",
      key: "gia",
      render: (cost) => `${cost.toLocaleString()} VND`,
    },
    // { title: "Tồn kho", dataIndex: "type", key: "type" },
    // { title: "Kho", dataIndex: "type", key: "type" },
    {
      title: "Hành động",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật" color="blue">
            <Button
              color="blue"
              variant="outlined"
              icon={<EditOutlined />}
              onClick={() => addProduct(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa" color="red">
            <Popconfirm title="Xóa sản phẩmphẩm này?" onConfirm={() => onDelete(record)}>
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getData = async () => {
    try {
      const res = await service.getList();
      if (res.status === 200) {
        dispatch(setListSP(res.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
        Quản lý Sản phẩm
      </h1>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          <Button
            type="primary"
            icon={<FaFolderPlus />}
            onClick={() => addProduct()}
          >
            Thêm sản phẩm
          </Button>
        </Col>
        <Col span={12}>
          <SearchForm onSearch={onSearch} />
        </Col>
      </Row>
      <Table dataSource={products} columns={columns} rowKey="id" />
      <ModalSanPham isModalOpen={open} onClose={onClose} choose={key} />
    </div>
  );
};

export default SanPhamList;
