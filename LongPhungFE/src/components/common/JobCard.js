import { Button, Card, Col, Divider, Row, Typography } from "antd";
import { formatCurrency, formatDate } from "../../helpers/formatData";
import { useState } from "react";
import CountdownTimer from "./CountdownTimer";
import "./JobCardStyles.scss";
const { Text } = Typography;

const JobCard = ({
  item,
  showButton,
  onButtonClick,
  onButtonClick2,
  textButton,
  textButton2,
  extra,
  showButton2,
  bgColor,
  showTime,
}) => {
  return (
    <Card className="job-card" extra={extra}>
      <div className="job-card__header">
        {showTime && (
          <span className="countdown">
            <CountdownTimer createdAt={item.ngayTao} />
          </span>
        )}
        {item.donHangCT ? (
          <span className="order-code">
            {item.donHangCT?.donHang?.maDonHang}
          </span>
        ) : (
          <span className="order-code">{item.maDonHang}</span>
        )}
      </div>

      <Divider />

      <div className="job-card__content">
        <div className="job-meta">
          Tên sản phẩm: {item.donHangCT?.sanPham?.tenSP}
        </div>
        <div className="job-meta">
          Công đoạn: {item.congDoan?.tenCongDoan || "Thiết kế"}
        </div>
        <div className="job-meta">Số lượng: {item.donHangCT?.soLuong}</div>
        <div className="meta-row">
          <span>Hạn: {formatDate(item.ngayGiao)}</span>
          <span>
            KPI:{" "}
            {item.tacVu === "THIET_KE"
              ? formatCurrency(item.kpi)
              : formatCurrency(item.kpi * item.donHangCT?.soLuong)}
          </span>
        </div>
      </div>

      {(showButton || showButton2) && (
        <div className="job-card__buttons">
          {showButton && (
            <Button type="primary" block onClick={() => onButtonClick(item)}>
              {textButton}
            </Button>
          )}
          {showButton2 && (
            <Button type="primary" block onClick={() => onButtonClick2(item)}>
              {textButton2}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
};

export default JobCard;
