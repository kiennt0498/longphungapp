import { Row } from 'antd'
import React from 'react'
import OrderCard from '../common/OrderCard'

export default function PhieuDaIn({phieuHT}) {
  return (
    <div style={{ padding: 20 }}>
      <Row gutter={[5, 5]}>
        {phieuHT.map((item) => (
          <OrderCard
            key={item.maDonHang}
            item={item}
            // format={format}
            // onCancel={showModalHuy}
          />
        ))}
      </Row>
    </div>
  )
}
