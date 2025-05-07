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
import {
  deleteSP,
  setListSP,
  setSanPham,
} from "../../redux/slide/SanPhamSlice";
import ModalSanPham from "./ModalSanPham";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

const SanPhamList = () => {
  const service = new SanPhamService();
  const [isLoading,setIsloading] = useState(false)

  const products = useSelector((state) => state.SanPham.sanPhams);
  const dispatch = useDispatch();

  const fieldMapping = {
    search: "tenSP",
  }

  const {filters} = useFilters()
  const filtersData = filterData(products, filters,fieldMapping,[])

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

      if (res.status === 200) {
        toast.success("Xóa thành công");
        dispatch(deleteSP(data.id));
      } else {
        toast.error("Xóa thất bại");
      }
    } catch (error) {
      toast.error("Xóa thất bại");
      console.log(error);
    }
  };

  const onSearch = async (choose, valuse) => {};

  const columns = [
    { title: "Mã sản phẩm", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "tenSP", key: "tenSP" },
    {
      title: "Mã vạch",
      dataIndex: "maVach",
      key: "maVach",
      render: (data) => (data ? `${data.maVach}` : "N/A"),
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
            <Popconfirm
              title="Xóa sản phẩm này?"
              onConfirm={() => onDelete(record)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getData = async () => {
    setIsloading(true)
    try {
      const res = await service.getList();
      if (res.status === 200) {
        console.log(res);

        dispatch(setListSP(res.data));
      }
    } catch (error) {
      console.log(error);
    }
    setIsloading(false)
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <div>
      <h1>Quản lý Sản phẩm</h1>
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
      </Row>
      <Table dataSource={filtersData} columns={columns} rowKey="id" loading={isLoading} />
      <ModalSanPham isModalOpen={open} onClose={onClose} choose={key} />
    </div>
  );
};

export default SanPhamList;
