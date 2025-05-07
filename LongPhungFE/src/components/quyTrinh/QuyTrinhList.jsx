import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Space,
  Table,
  Modal,
  Tooltip,
  Row,
  Col,
} from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { FaCartPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  addQT,
  deleteQT,
  setList,
  updateQT,
} from "../../redux/slide/QuyTrinhSlice";
import QuyTrinhService from "../../services/QuyTrinhService";
import NhanVienService from "../../services/NhanVienService";
import QTChiTiet from "./QTChiTiet";

const QuyTrinhList = () => {
  const service = new QuyTrinhService();
  const nvService = new NhanVienService();



  const quyTrinhs = useSelector((state) => state.QuyTrinh.quyTrinhs);
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [listCongDoan, setListCongDoan] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [listNV, setListNV] = useState([]);
  const [selectedNhanVienQL, setSelectedNhanVienQL] = useState(null)
  const [quyTrinh, setQuyTrinh] = useState({})


  const processColumns = [
    {
      title: "Tên quy trình",
      dataIndex: "tenQuyTrinh",
      key: "tenQuyTrinh",
    },
    {
      title: "Số công đoạn",
      dataIndex: "quyTrinhCongDoans",
      key: "quyTrinhCongDoans",
      render: (quyTrinhCongDoans) => `${quyTrinhCongDoans?.length || 0} công đoạn`,
    },

    {
      title: "Người quản lý",
      dataIndex: "nhanNienQL",
      key: "nhanVienQL",
      render: (_, record) => `${record.nhanVienQL?.hoTen || "N/A"}`,
    },

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
              onClick={() => editProcess(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Edit process
  const editProcess = (data) => {
 
    setIsModalVisible(true);
    setQuyTrinh(data)
    setSelectedNhanVienQL(data.nhanVienQL?.id || null)
   
  
  };

  const handleDelete = async (id) => {
    try {
      const res = await service.deleteQT(id);
      if (res.status === 200) {
        dispatch(deleteQT(id));
        toast.success("Xóa thành công", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Xóa thất bại", {
        position: "top-center",
      });
      console.log(error);
    }
  };


  const onSubmit = () => {

    const nv = listNV.find((item) => item.id === selectedNhanVienQL);

    const data = {
      ...quyTrinh,
      nhanVienQL: nv
    };
    console.log(data)
    dispatch(updateQT(data));

    
   
  };

  const getDataList = async () => {
    try {
      const res = await service.getListQT();
      const nvRes = await nvService.getListEmp();

      if (res.status === 200) {
        dispatch(setList(res.data));
      }
      if (nvRes.status === 200) {
        const newData = nvRes.data.map((item) => {
          return {
            id: item.id,
            hoTen: item.hoTen,
          };
        });
        setListNV(newData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNhanVienSelect = (nhanVienId) => {
    setSelectedNhanVienQL(nhanVienId);
  };

  useEffect(() => {
    getDataList();
  }, []);

  const filteredQuyTrinhs = quyTrinhs.filter((quyTrinh) =>
    (quyTrinh.tenQuyTrinh || "").toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const processModal = (
    <Modal
      title={"Cập nhật nhân viên quản lý"}
      open={isModalVisible}
      onCancel={() => {
        setIsModalVisible(false);
      }}
      onOk={() => {
    
        onSubmit()
        setIsModalVisible(false);
      }}
    >
      <QTChiTiet data={listNV}  onSelectChange={handleNhanVienSelect}/>
    </Modal>
  );

  return (
    <div >
      <Card
      title="Danh sách quy trình"
    >
      <Space direction="vertical" style={{ width: "100%", marginTop: 10 }}>
        <Row>
          <Col span={11} style={{ marginLeft:"2%" }}>
            <Input
              placeholder="Tìm kiếm"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </Col>
        </Row>
        <Table
          dataSource={filteredQuyTrinhs}
          columns={processColumns}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Space>
      {processModal}
    </Card>
    </div>
  );
};

export default QuyTrinhList;
