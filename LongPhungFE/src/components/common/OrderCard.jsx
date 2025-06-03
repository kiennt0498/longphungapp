import { Button, Card, Col, Popconfirm, Row, Tooltip } from "antd";
import { IoEyeSharp, IoTrashBin } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { formatCurrency, formatDate } from "../../helpers/formatData";

const OrderCard = ({
  item,
  format,
  onView,
  onCancel,
  customActions,
  actionLabel = "Xem chi tiết",
  actionIcon = <IoEyeSharp />,
  cancelIcon = <IoTrashBin />,
}) => (
  <Col span={6} key={item.maDonHang}>
    <Card
      title={item.maDonHang}
      extra={
        <Row>
          {onCancel && (
            <Col span={11}>
              <Popconfirm
                title="Hủy đơn"
                description="Bạn thực sự muốn hủy đơn này?"
                onConfirm={() => onCancel(item.id)}
                okText="Xác nhận"
                cancelText="Không"
              >
                <Tooltip title="Hủy đơn" color="red">
                  <Button danger>{cancelIcon}</Button>
                </Tooltip>
              </Popconfirm>
            </Col>
          )}
        </Row>
      }
      style={{ padding: "3%", width: "100%" }}
    >
      <p>Khách hàng: {item.khachHang?.tenKhachHang || "N/A"}</p>
      <p>Số điện thoại: {item.khachHang?.sdt || "N/A"}</p>
      <p>Ngày chốt đơn: {formatDate(item.ngayChotDon)}</p>
      <p>Ngày giao hàng: {formatDate(item.ngayGiaoHang)}</p>
      <p>Giá: {formatCurrency(item.gia)}</p>
      <p>Trạng thái: {item.trangThai}</p>

      {customActions ? (
        <Row>{customActions(item)}</Row>
      ) : (
        onView && (
          <Row>
            <Button
              onClick={() => onView(item)}
              style={{ width: "100%" }}
              type="primary"
            >
              {actionLabel} {actionIcon}
            </Button>
          </Row>
        )
      )}
    </Card>
  </Col>
);

export default OrderCard;
