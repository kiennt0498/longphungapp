import { Button, Card, Col, Popconfirm, Row, Tooltip } from "antd";
import { IoEyeSharp, IoTrashBin } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { formatCurrency, formatDate } from "../../helpers/formatData";

const OrderCard = ({
  item,
  format,
  onNhanDon,
  onCancel,
  customActions,
  actionLabel = "Chi tiết đơn",
  actionIcon = <IoEyeSharp />,
  actionLabel2 = "Nhận đơn",
  actionIcon2 = <IoEyeSharp />,
  cancelIcon = <IoTrashBin />,
  onView,
  phanPhoiDon,
  handleopenModal,
}) => {
  console.log("phanPhoidonhang", phanPhoiDon);
  
  return (
    <Col span={6} key={item.maDonHang}>
      <Card
        title={
        <div style={{ textAlign: "center", width: "100%" }}>
          {item?.maDonHang}
        </div>
      }
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
          onNhanDon && (
            <>
              <Row>
                <Button
                  onClick={() => onView(item)}
                  color="cyan"
                  variant="solid"
                  style={{ width: "100%" }}
                >
                  {actionLabel} {actionIcon}
                </Button>
              </Row>
              {!phanPhoiDon && (
                <Row>
                <Button
                  onClick={() => onNhanDon(item)}
                  type="primary"
                  style={{ width: "100%", marginTop: "3%" }}
                >
                  {actionLabel2} {actionIcon2}
                </Button>
              </Row>
              )}
              {phanPhoiDon && (
                <Row>
                  <Button
                    onClick={()=>handleopenModal(item.maDonHang)}
                    type="primary"
                    style={{ width: "100%", marginTop: "3%" }}
                  >
                    Phân phối đơn hàng
                  </Button>
                </Row>
              )}
            </>
          )
        )}
      </Card>
    </Col>
  );
};
export default OrderCard;
