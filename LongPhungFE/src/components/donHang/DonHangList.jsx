import {
  Button,
  Card,
  Col,
  Divider,
  Popconfirm,
  Row,
  Space,
  Tabs,
  Tooltip,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { IoEyeSharp } from "react-icons/io5";
import React, { useEffect } from "react";
import SearchForm from "../common/SearchForm";
import { useDispatch, useSelector } from "react-redux";
import DonHangService from "../../services/DonHangService";
import { setListDH } from "../../redux/slide/DonHangSlice";
import DonHangTabsTK from "./DonHangTabsTK";
import DonHangTabsCD from "./DonHangTabsCD";
import DonHangtabsHT from "./DonHangtabsHT";
import DonHangTabsHuy from "./DonHangTabsHuy";
import DonHangTabsXN from "./DonHangTabsXN";

const DonHangList = () => {
  const service = new DonHangService()
 const donHangs = useSelector(state => state.DonHang.donHangs)
 const dispatch = useDispatch()

  const handleDelete = (id) => {
    console.log(id);
  };
  const handleEdit = (data) => {
    console.log(data);
  }

  const onSearch = (choose, value) => {
    console.log(choose, value);
  }

  

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const items = [
    {
      key: '1',
      label: 'Đơn hàng chờ thiết kế',
      children: <DonHangTabsTK donHangs={donHangs} format={formatCurrency} edit={handleEdit}/>,
    },
    {
      key: '2',
      label: 'Sản phẩm chờ duyệt',
      children: <DonHangTabsCD donHangs={donHangs} format={formatCurrency} edit={handleEdit}/>,
    },
    {
      key: '3',
      label: 'Chốt đơn hàng',
      children: <DonHangTabsXN donHangs={donHangs} format={formatCurrency} edit={handleEdit}/>,
    },
    {
      key: '4',
      label: 'Đơn hoàn thành',
      children: <DonHangtabsHT donHangs={donHangs} format={formatCurrency} edit={handleEdit}/>,
    },
    {
      key: '5',
      label: 'Đơn Hủy',
      children: <DonHangTabsHuy donHangs={donHangs} format={formatCurrency} edit={handleEdit}/>
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  );
};

export default DonHangList;
