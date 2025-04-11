import { Button, Card, Divider, Form, Row, Table, Typography } from "antd";
import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import ModalPhuLieu from "./ModalPhuLieu";
import { FaBinoculars } from "react-icons/fa6";
import { ImBin2 } from "react-icons/im";

const NguyenLieuSX = ({ data,nguyenLieuSX,setNguyenLieuSX }) => {
  const [form] = Form.useForm();
  const [openDraw, setOpenDraw] = useState(false);
 
  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "ten", key: "ten" },
    { title: "Giá", dataIndex: "giaNhap", key: "giaNhap" },
    { title: "", dataIndex: "action", key: "action", render: (_,record) => <>
      <Button icon={<ImBin2 />} onClick={()=>onDelete(record.id)}></Button>
    </> },
  ];

  const onOpen = () => {
    setOpenDraw(true);
  };
  const handleCancel = () => {
    setOpenDraw(false);
  };
  const handleOk = (data) => {
    setOpenDraw(false);
    console.log(data);
  };
  const addSp = (data) => {
    setNguyenLieuSX([...nguyenLieuSX, data]);
  };
  const onDelete = (id) => {
    setNguyenLieuSX(nguyenLieuSX.filter((i) => i.id !== id));
  };
  
  return (
    <>
      <Row>
        <Button type="primary">Thu mua nguyên liệu</Button>
      </Row>

      <Form form={form} layout="vertical">
        <Card style={{ marginTop: "1%" }} title="Nguyên liệu">
          <Button type="primary" color="blue" variant="text" onClick={onOpen}>
            <CiCirclePlus />
            Thêm nguyên liệu
          </Button>
          <Card className="mb-8">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={nguyenLieuSX}
              pagination={false}
            />
          </Card>
        </Card>
      </Form>
      <ModalPhuLieu
        open={openDraw}
        handleOk={handleOk}
        handleCancel={handleCancel}
        products={nguyenLieuSX}
        addSp={addSp}
        data={data}
      />
    </>
  );
};

export default NguyenLieuSX;
