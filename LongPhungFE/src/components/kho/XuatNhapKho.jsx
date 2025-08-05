import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  List,
  Row,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import {
  LiaArrowCircleDownSolid,
  LiaArrowCircleUpSolid,
} from "react-icons/lia";
import NguyenLieuService from "../../services/NguyenLieuService";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { API_SOCKET } from "../../services/constans";
import KhoService from "../../services/KhoService";

const XuatNhapKho = ({ open, onClose }) => {
  const [active, setActive] = useState("nhap");
  const [quantities, setQuantities] = useState({}); // lưu số lượng nhập từng item
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  const [textFind, setTextFind] = useState("");
  const { Text, Title } = Typography;
  const stompClient = useRef(null);
  const id = "NV00001"
  const service = new KhoService()

  useEffect(()=>{
    const socket = new SockJS(API_SOCKET);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("STOMP Connected");
        stompClient.current.subscribe("/topic/vattu", (message) => {
          const newData = JSON.parse(message.body);
          setList(newData);
        });
        stompClient.current.publish({
          destination: "/app/getVatTu",
          body: "",
        });
      },
      onDisconnect: () => {
        console.log("STOMP Disconnected");
      },
    });

    

    stompClient.current.activate();

    return () => {
      stompClient.current.deactivate();
    };
  },[])
 
  const taoPhieu = async () => {

    const phieuChiTiets = selectedItems.map(({ vatTu, quantity }) => {
      const donGia = vatTu.giaNhap;
      return {
        vatTu,
        soLuong: quantity,
        donGia,
        thanhTien: quantity * donGia,
      };
    });
  

    const tongGiaTri = phieuChiTiets.reduce((sum, { thanhTien }) => sum + thanhTien, 0);

    const phieuBase = {
      kho: selectedItems[0]?.kho ?? null, // tránh lỗi khi mảng rỗng
      tongGiaTri,
      phieuChiTiets,
      nguoiTao: {id:id},
    };

    const phieuHoanChinh =
      active === "nhap"
        ? { ...phieuBase, ngayNhap: new Date() }
        : { ...phieuBase, ngayXuat: new Date() };

    console.log(phieuHoanChinh);
    
  
    const res = await service.createPhieu(phieuHoanChinh)
    console.log(res)
    
  
  };
  

  const handleSelect = (type) => setActive(type);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: value });
  };

  const handleAdd = (item) => {
    if (!quantities[item.id]) return;

    setSelectedItems((prev) => [
      ...prev,
      { ...item, quantity: quantities[item.id] },
    ]);

    // Reset input sau khi add
    setQuantities({ ...quantities, [item.id]: null });
  };

  const remove = (itemToRemove) => {
    const newData = selectedItems.filter((item) => item.id !== itemToRemove.id);
    setSelectedItems(newData);
  };

  useEffect(() => {
    const newItem = list.filter(
      (item) =>
        !selectedItems.some((selected) => selected.id === item.id) &&
        item.vatTu.ten.toLowerCase().includes(textFind.toLowerCase())
    );
    setData(newItem);
  }, [selectedItems, textFind, list]);

  

  return (
    <>
      <h1>Phiếu giao dịch</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Button
          type={active === "nhap" ? "primary" : "default"}
          className={active === "nhap" ? "btn-nhap-active" : ""}
          style={{ width: "45%" }}
          onClick={() => handleSelect("nhap")}
          icon={<LiaArrowCircleDownSolid />}
        >
          Nhập kho
        </Button>
        <Button
          type={active === "xuat" ? "primary" : "default"}
          className={active === "xuat" ? "btn-xuat-active" : ""}
          style={{ width: "45%" }}
          onClick={() => handleSelect("xuat")}
          icon={<LiaArrowCircleUpSolid />}
        >
          Xuất kho
        </Button>
      </div>

      <Divider />

      <Row gutter={16}>
        <Col span={12}>
          <Input
            style={{ marginBottom: "1rem" }}
            placeholder="Tìm kiếm vật tư"
            value={textFind}
            onChange={(e) => setTextFind(e.target.value)}
          />
          <List
            dataSource={data}
            style={{
              maxHeight: "30rem",
              overflowY: "auto",
              paddingRight: "8px",
              scrollBehavior: "smooth",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 95%, rgba(0,0,0,0))",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,1) 95%, rgba(0,0,0,0))",
            }}
            renderItem={(item) => (
              <List.Item>
                <div style={{ width: "100%" }}>
                  <div style={{ fontWeight: 600 }}>{item.vatTu.ten}</div>
                  <div style={{ marginBottom: 8, color: "#888" }}>
                    Số lượng hàng tồn: {item.soLuong}
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <InputNumber
                      style={{ flex: 1 }}
                      placeholder={`Nhập số lượng`}
                      value={quantities[item.id]}
                      max={active === "xuat" ? item.soLuong :  undefined}
                      min={1}
                      onChange={(value) => handleQuantityChange(item.id, value)}
                    />
                    <Button
                      type="primary"
                      onClick={() => handleAdd(item)}
                      disabled={!quantities[item.id]}
                    >
                      Thêm +
                    </Button>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <h4>Số lượng vật tư ({selectedItems.length})</h4>
          <List
            dataSource={selectedItems}
            style={{ minHeight: "20rem", maxHeight: "30rem" }}
            renderItem={(item) => (
              <Card style={{ padding: "2%" }}>
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Col>
                    <Text strong>{item.vatTu.ten}</Text> <br />
                    <Text>
                      {item.quantity} {item.vatTu.doViTinh.ten}
                    </Text>
                  </Col>
                  <Col>
                    <Button danger type="text" onClick={() => remove(item)}>
                      X
                    </Button>
                  </Col>
                </Row>
              </Card>
            )}
          />
          <TextArea style={{ marginTop: "1rem" }} placeholder="Ghi chú" />
          <Divider />
          <Button type="primary" onClick={taoPhieu} style={{ width: "100%" }}>
            Lưu phiếu
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default XuatNhapKho;
