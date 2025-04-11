import React, { useEffect, useState } from "react";
import NguyenLieuService from "../../services/NguyenLieuService";
import { Button, Popconfirm, Space, Table, Tooltip } from "antd";
import { data } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa6";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";

const ListNguyenLieu = () => {
  const service = new NguyenLieuService();
  const [listNL, setListNL] = useState([]);

  const columns = [
    { title: "Id", key: "id", dataIndex: "id" },
    { title: "Tên", key: "ten", dataIndex: "ten" },
    { title: "Giá nhập", key: "giaNhap", dataIndex: "giaNhap" },
    { title: "Hệ số bù", key: "heSoBu", dataIndex: "heSoBu" },
    { title: "Hệ số diện tích", key: "heSoS", dataIndex: "heSoS" },
    { title: "Hệ số giá diện tích", key: "heSoGiaS", dataIndex: "heSoGiaS" },
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
          {/* <Tooltip title="Tạo đơn" color="green">
          <Button
            color="green"
            variant="outlined"
            icon={<FaCartPlus />}
            onClick={() => thuMuaSanPham(record)}
          />
          </Tooltip> */}
          <Tooltip title="Cập nhật" color="blue">
          <Button color="blue" variant="outlined" icon={<EditOutlined />}  />
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
    }
  ];

  const thuMuaSanPham = (record) => {
    console.log(record);
  };

  const handleDelete = (id) => {
    console.log(id);
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
      <h1>List Nguyen Lieu</h1>
      <Table dataSource={listNL} columns={columns} rowKey="id" />
    </div>
  );
};

export default ListNguyenLieu;
