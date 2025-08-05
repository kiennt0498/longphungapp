import React, { useState } from "react";
import { Popconfirm, Space, Table, Tooltip, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import { ImBin2 } from "react-icons/im";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

const DonThuMua = ({data, isThuMua, handleHuyDon}) => {
  const navigate = useNavigate();
  const filterMapper = {
    search: "tenNguyenLieu",
    dateRange: "ngayMua",
    month: "ngayMua",
    day: "ngayMua",
  }
  const {filters} = useFilters()
  const filtersData = filterData(data, filters,filterMapper,["dateRange"])
  
  const huyDon = (id) => {
    handleHuyDon(id);
  };

  const handleSelect = (data) => {
    navigate("/nguyenlieu/danh-sach-gia/"+ data, {state: { isThuMua } });
  };

  const tongTien = (data) => {
    return data.soLuong * data.giaDuTinh;
  }
  const thanhTien = (data) => {
    return data.giaThuMua * data.soLuong;
  }
  const tongThuMua = (data) => {
    return thanhTien(data) + data.phiVanChuyen;
  }

  const columns = [
    {
      title: "Tên nguyên liệu",
      dataIndex: "tenNguyenLieu",
      key: "tenNguyenLieu",
    },

    {
      title: "Ngày cần hàng",
      dataIndex: "ngayMua",
      key: "ngayMua",
      render: (value) => formatDate(value),
    },
    {
      title: "Số Lượng",
      dataIndex: "soLuong",
      key: "soLuong",
    },
    {
      title: "Đơn giá dự tính",
      dataIndex: "giaDuTinh",
      key: "donGiaDuTinh",
      render: (value) => formatCurrency(value),
    },
   

    ...(!isThuMua? [
      {
        title: "Đơn giá thu mua",
        dataIndex: "giaThuMua",
        key: "giaThuMua",
        render: (value) => formatCurrency(value),
      },
      {
        title: "Thành tiền",
        key: "tienThuMua",
        render: (_, record) => formatCurrency(thanhTien(record)),
      },
      {
        title: "Phí vận chuyển",
        dataIndex: "phiVanChuyen",
        key: "phiVanChuyen",
        render: (value) => formatCurrency(value),
      },
      {
        title: "Tổng tiền",
        key: "tong",
        render: (_, record) => formatCurrency(tongThuMua(record)),
      },
    ]: [{
      title: "Giá dự tính",
      key: "giaThuMua",
      render: (_, record) => formatCurrency(tongTien(record))
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Tooltip title="Chốt đơn" color="primary">
            <Button
              color="primary"
              variant="outlined"
              icon={<HiOutlineClipboardCheck />}
              onClick={() => handleSelect(record.id)}
            ></Button>
          </Tooltip>
          <Tooltip title="Hủy đơn" color="red">
            <Popconfirm
              title="Hủy đơn"
              description="Bạn thực sự muốn hủy đơn?"
              onConfirm={()=>huyDon(record.id)}
              okText="Hủy"
              cancelText="Thoát"
            >
              <Button
                color="danger"
                variant="outlined"
                icon={<ImBin2 />}
              ></Button>
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },]),

    
  ];


  return (
    <div>
      <Table
        columns={columns}
        dataSource={filtersData}
        rowKey="id"
        onRow={(record) => ({
          onDoubleClick: () => {
            handleSelect(record.id);
          },
        })}
      />
    </div>
  );
};

export default DonThuMua;
