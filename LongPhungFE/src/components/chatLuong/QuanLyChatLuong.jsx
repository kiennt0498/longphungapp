import { Tabs, Table, Card, Input, InputNumber } from "antd";
import { useState } from "react";

const { TabPane } = Tabs;
const { Search } = Input;

const dummyData = [];

export default function QuanLyChatLuong() {
  const [data, setData] = useState(dummyData);
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (value, recordKey, field, subField) => {
    const newData = [...data];
    const target = newData.find(item => item.maHang === recordKey);
    if (target) {
      if (subField) {
        target[field][subField] = value;
      } else {
        target[field] = value;
      }
      setData(newData);
    }
  };

  const getEditableColumn = (title,field, subField = null) => ({
    title: title,
    dataIndex: subField ? [field, subField] : field,
    key: subField || field,
    render: (text, record) => (
      <InputNumber
        value={subField ? record[field][subField] : record[field]}
        onChange={(value) => handleInputChange(value, record.maHang, field, subField)}
        style={{ width: 80 }}
      />
    ),
  });

  const filteredData = data.filter(item =>
    item.loai.toLowerCase().includes(searchText.toLowerCase()) ||
    item.maHang.toLowerCase().includes(searchText.toLowerCase())
  );

  const columnsHoanThanh = [
    { title: "Mã đơn hàng", dataIndex: "maDon", key: "maDon" },
    { title: "Sản phẩm", dataIndex: "sanPham", key: "sanPham" },
    { title: "Chiều dài", dataIndex: "chieuDai", key: "chieuDai" },
    { title: "Chiều rộng", dataIndex: "chieurong", key: "chieuRong" },
    { title: "Số lượng", dataIndex: "soLuong", key: "soLuong" },
    { title: "Đơn giá", dataIndex: "donGia", key: "donGia" },
    { title: "Thành tiền", dataIndex: "tien", key: "tien" },
    { title: "Tiền vận chuyển", dataIndex: "tienVC", key: "tienVC" },
    { title: "Ngày gửi hàng", dataIndex: "ngayGui", key: "ngayGui" },
    getEditableColumn("Ngày gửi hàng hoàn","ngayHH"),
    getEditableColumn("Nhân viên bị trừ điểm","nhanVien"),
    getEditableColumn("Số điểm bị trừ","nhanVien"),
    { title: "Số tiền thu thiếu", dataIndex: "thuThieu", key: "thuThieu" },
    { title: "Nhân viên nhập liệu", dataIndex: "nhanVien", key: "nhanVien" },
    { title: "", dataIndex: "action", key: "action" },
    
  ];

  const columnsHangLoi = [
    { title: "Mã đơn hàng", dataIndex: "maDon", key: "maDon" },
    { title: "Sản phẩm", dataIndex: "sanPham", key: "sanPham" },
    { title: "Ghi chú", dataIndex: "ghiChu", key: "ghiChu" },
    { title: "Ngày hoàn thành", dataIndex: "ngayHT", key: "ngayHT" },
    getEditableColumn("Nhân viên bị trừ điểm","nhanVien"),
    getEditableColumn("Số điểm bị trừ","nhanVien"),
    { title: "Số tiền đã thanh toán", dataIndex: "thanhToan", key: "thanhToan" },
    { title: "Số tiền thu thiếu", dataIndex: "thuThieu", key: "thuThieu" },
    { title: "Nhân viên nhập liệu", dataIndex: "nhanVien", key: "nhanVien" },
  ];

  const columnsHangHuy = [

    { title: "Mã hàng", dataIndex: "maHang", key: "maHang" },
    { title: "Sản phẩm", dataIndex: "sanPham", key: "sanPham" },
    { title: "Lý do hủy", dataIndex: "ghiChu", key: "ghiChu" },
    getEditableColumn("Nhân viên bị trừ điểm","nhanVien"),
    getEditableColumn("Số điểm bị trừ","nhanVien"),
    { title: "Số tiền đã thanh toán", dataIndex: "thanhToan", key: "thanhToan" },
    { title: "Số tiền thu thiếu", dataIndex: "thuThieu", key: "thuThieu" },
    { title: "Nhân viên nhập liệu", dataIndex: "nhanVien", key: "nhanVien" },
  ];

  return (
    <Card style={{ padding: 16 }}>
      <Search
        placeholder="Tìm theo mã hàng hoặc loại"
        allowClear
        enterButton="Tìm kiếm"
        style={{ marginBottom: 16, maxWidth: 400 }}
        onSearch={(value) => setSearchText(value)}
      />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Hàng Hoàn" key="1">
          <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Hàng Hoàn Thành</h2>
          <Table dataSource={filteredData} columns={columnsHoanThanh} rowKey="maHang" pagination={false} />
        </TabPane>
        <TabPane tab="Hàng Lỗi" key="2">
          <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Hàng Lỗi</h2>
          <Table dataSource={filteredData} columns={columnsHangLoi} rowKey="maHang" pagination={false} />
        </TabPane>
        <TabPane tab="Hàng Huỷ" key="3">
          <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Hàng Huỷ</h2>
          <Table dataSource={filteredData} columns={columnsHangHuy} rowKey="maHang" pagination={false} />
        </TabPane>
      </Tabs>
    </Card>
  );
}
