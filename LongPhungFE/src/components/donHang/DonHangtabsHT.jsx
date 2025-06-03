import { Empty, Row } from "antd";
import React from "react";
import OrderCard from "../common/OrderCard";


const DonHangTabsHT = ({ listHT, format, showModalHuy }) => {
  if (!listHT.length) return <Empty />;

  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[5, 5]}>
        {listHT.map((item) => (
          <OrderCard
            key={item.maDonHang}
            item={item}
            format={format}
            onCancel={showModalHuy}
          />
        ))}
      </Row>
    </div>
  );
};

export default DonHangTabsHT;
