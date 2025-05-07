import React, { useEffect, useState } from "react";
import NguyenLieuService from "../../services/NguyenLieuService";
import { Button, Col, Popconfirm, Row, Space, Table, Tooltip } from "antd";
import { FaCartPlus } from "react-icons/fa6";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import NguyenLieuCT from "./NguyenLieuCT";
import { toast } from "react-toastify";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

const ListNguyenLieu = () => {
  const maNV = "NV00001";
  const service = new NguyenLieuService();
  const [isLoading, setIsLoading] = useState(false);
  const [listNL, setListNL] = useState([]);
  const [openMD, setOpenMD] = useState(false);
  const [loai, setLoai] = useState([]);
  const navigate = useNavigate();

  const {filters} = useFilters()
  const filtersData = filterData(listNL, filters,{search: "ten"},[])

  const columns = [
    { title: "Id", key: "id", dataIndex: "id" },
    { title: "Tên", key: "ten", dataIndex: "ten" },
    { title: "Giá nhập", key: "giaNhap", dataIndex: "giaNhap" },
    { title: "Hệ số bù", key: "heSoBu", dataIndex: "heSoBu" },
    { title: "Hệ số thu mua", key: "heSoThuMua", dataIndex: "heSoThuMua" },

    {
      title: "Chất liệu",
      key: "chatLieu",
      dataIndex: "chatLieu",
      render: (_, record) => record.chatLieu.ten,
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",

      render: (_, record) => (
        <Space>
          <Tooltip title="Mua nguyên liệu" color="green">
            <Button
              color="green"
              variant="outlined"
              icon={<FaCartPlus />}
              onClick={() => thuMuaSanPham(record)}
            />
          </Tooltip>
          <Tooltip title="Cập nhật" color="blue">
            <Button color="blue" variant="outlined" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="Xóa" color="red">
            <Popconfirm
              title="Xóa khách hàng này?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const getLoai = async () => {
    setIsLoading(true);
    try {
      const res = await service.getListLoaiVatTu();

      setLoai(res.data);
    } catch (error) {
      toast.warning(`Lỗi: ${error.message}`);
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getLoai();
  }, []);

  const onChange = () => {
    setOpenMD(true);
  };

  const handlCancel = () => {
    setOpenMD(false);
  };

  const thuMuaSanPham = (record) => {
    console.log(record);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const onSaveAndEdit = async (data) => {
    setIsLoading(true);
    try {
      const newData = {
        ...data,
        doViTinh: { id: data.doVitinh },
        chatLieu: { id: data.chatLieu },
        nguoiLenDon: { id: maNV },
      };

      const res = await service.insterDTM(newData);
      if (res.status === 201) {
        toast.success("Thêm mới thành công");
      }
      setOpenMD(false);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const getListNL = async () => {
    try {
      const res = await service.getListNL();
      setListNL(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListNL();
  }, []);
  return (
    <div>
      <Row align="middle" justify="space-between">
        <Col>
          <h1>Danh sách vật tư</h1>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusCircleFilled />} onClick={onChange}>
            Thêm nguyên liệu mới
          </Button>
        </Col>
      </Row>
      <Table
        dataSource={filtersData}
        columns={columns}
        rowKey="id"
        loading={isLoading}
      />
      <NguyenLieuCT
        open={openMD}
        handleCancel={handlCancel}
        handleOK={onSaveAndEdit}
        data={loai}
      />
    </div>
  );
};

export default ListNguyenLieu;
