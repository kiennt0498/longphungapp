import { Button, Col, Popconfirm, Row, Space, Table, Tag, Tooltip } from "antd";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { BiArrowToTop, BiEdit, BiSolidTrash } from "react-icons/bi";
import { FaArrowsUpToLine, FaFolderPlus } from "react-icons/fa6";
import EditNhanVien from "./EditNhanVien";
import {
  deleteEmp,
  setBoPhans,
  setChucVu,
  setListEmp,
  setNhanvien,
  setTacVu,
  updateEmp,
} from "../../redux/slide/NhanVienSlice";
import { useNavigate } from "react-router-dom";
import ModalExcel from "../common/ModalExcel";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import NhanVienSerivce from "../../services/NhanVienService";
import { toast } from "react-toastify";
import SearchForm from "../common/SearchForm";
import { API_FILE } from "../../services/constans";
import { useFilters } from "../../contexts/FilterContext";
import { filterData } from "../../contexts/filterUtils";

const NhanVienList = () => {
  const service = new NhanVienSerivce();
  const navigate = useNavigate();

  const data = useSelector((state) => state.NhanVien.nhanViens);
  const nv = useSelector((state) => state.NhanVien.nhanVien);
  const boPhan = useSelector((state) => state.NhanVien.boPhans);
  const chucVu = useSelector((state) => state.NhanVien.chucVus);
  const tacVu = useSelector((state) => state.NhanVien.tacVus);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);
  const API = API_FILE + "/upload/emp";
  const API_DOWN = API_FILE + "/download/emp";
  const [loading, setLoading] = useState(false);

  const fieldMapping = {
    search: "hoTen",
    boPhan: "boPhan",
    chucVu: "chucVu",
    tacVu: "tacVu",
  }

  const {filters} = useFilters()
  const filtersData = filterData(data,filters,fieldMapping,["boPhan","chucVu","tacVu"])
 

  const getData = async () => {
    try {
      setLoading(true);
      const res = await service.getListEmp();

      if (res.status === 200) {
        dispatch(setListEmp(res.data));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getBoPhan = async () => {
    const resBP = await service.getBoPhan();

    if (resBP && resBP.data) {
      dispatch(setBoPhans(resBP.data));
    }
  };

  const getChucVu = async () => {
    const res = await service.getChucVu();

    if (res && res.data) {
      dispatch(setChucVu(res.data));
    }
  };

  const getTacVu = async () => {
    const res = await service.getTacVu();

    if (res && res.data) {
      dispatch(setTacVu(res.data));
    }
  };

  useEffect(() => {
    getData();
    getBoPhan();
    getChucVu();
    getTacVu();
  }, [dispatch]);

  const onOpen = (data) => {
    dispatch(setNhanvien(data));
    setCheck(true);
  };

  const onOpenM = () => {
    setOpen(true);
  };

  const onCloseM = () => {
    setOpen(false);
  };

  const onChange = async (value) => {
    try {
      setLoading(true);
      const res = await service.updateEmp(value);

      if (res.status === 201) {
        dispatch(updateEmp(value));
        toast.success("Cập nhật thành công", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Cập nhật thất bại", { position: "top-center" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onClose = () => {
    setCheck(false);
  };

  const onPlus = () => {
    navigate("them");
  };

  const onSearch = async (choose, valuse) => {
    try {
      setLoading(true);
      const res = await service.onSearch(choose, valuse);
      dispatch(setListEmp(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (data) => {
    try {
      setLoading(true);
      const res = await service.deleteEmp(data);
      if (res.status === 200) {
        toast.success(res.data, {
          position: "top-center",
        });
        dispatch(deleteEmp(data));
      }
    } catch (error) {
      toast.error("Xóa thất bại", { position: "top-center" });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onDownloadEx = () => {
    window.location.href = API_DOWN;
  };

  return (
    <div>
      <h1>Danh sách nhân viên</h1>
      <Row style={{ marginBottom: 10 }}>
        <Col span={12}>
          <Button
            type="primary"
            icon={<FaFolderPlus />}
            onClick={() => onPlus()}
          >
            Thêm Nhân viên
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            color="cyan"
            variant="solid"
            icon={<FaArrowsUpToLine />}
            onClick={() => onOpenM()}
          >
            Nhập excel
          </Button>
          <Button
            style={{ marginLeft: 10 }}
            color="green"
            variant="solid"
            onClick={() => onDownloadEx()}
            icon={<PlusOutlined />}
          >
            Xuất excel
          </Button>
        </Col>
      </Row>

      <Table dataSource={filtersData} rowKey="id" loading={loading}>
        <Column title="Mã Số" key="id" dataIndex="id"></Column>

        <Column
          title="Họ Tên"
          key="hoTen"
          dataIndex="hoTen"
          align="center"
        ></Column>

        <Column
          title="Số điện thoại"
          key="taiKhoan"
          dataIndex="taiKhoan"
          align="center"
          render={(_, record) =>
            record.taiKhoan?.sdt || record.taiKhoan || <label></label>
          }
        />

        <Column
          title="Địa Chỉ"
          key="diaChi"
          dataIndex="diaChi"
          align="center"
        ></Column>
        <Column
          title="Bộ phận"
          key="boPhan"
          dataIndex="boPhan"
          align="center"
          render={(_, record) => {
            const bp = boPhan.find((bp) => record.boPhan === bp.name);
            return bp?.description || record.boPhan;
          }}
        ></Column>

        <Column
          title="Chức vụ"
          key="chucVu"
          dataIndex="chucVu"
          align="center"
          render={(_, record) => {
            const cv = chucVu.find((cv) => record.chucVu === cv.name);
            return cv?.description || record.chucVu;
          }}
        ></Column>

        <Column
          title="Tác vụ"
          key="tacVu"
          dataIndex="tacVu"
          align="center"
          render={(_,record)=>{
            const tv = tacVu.find((tv)=> record.tacVu === tv.name)
            return tv?.description || record.boPhan
          }}
        ></Column>

        <Column
          title="Hành Động"
          key="hanhDong"
          align="center"
          width={200}
          render={(_, record) => (
            <Space size="middle">
              <Tooltip placement="top" title="Cập nhật" color="blue">
                <Button
                  key={record.key}
                  type="link"
                  size="small"
                  onClick={() => onOpen(record)}
                >
                  <BiEdit color="blue" size={24} />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="Xóa" color="red">
                <Popconfirm
                  key={record.key}
                  title="Thông báo"
                  description="Bạn thực sự muốn xóa"
                  onConfirm={() => onDelete(record.id)}
                  okText="Đúng"
                  cancelText="Không"
                >
                  <Button type="link" danger>
                    <BiSolidTrash size={24}></BiSolidTrash>
                  </Button>
                </Popconfirm>
              </Tooltip>
            </Space>
          )}
        ></Column>
      </Table>
      <EditNhanVien
        data={nv}
        onClose={onClose}
        onChange={onChange}
        open={check}
        bp={boPhan}
        cv={chucVu}
        tv={tacVu}
      />
      <ModalExcel open={open} onCloseM={onCloseM} API={API} />
    </div>
  );
};

export default NhanVienList;
