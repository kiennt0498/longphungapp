import { List } from 'antd'
import React, { useState } from 'react'
import JobCard from '../common/JobCard'

export default function PhieuCanIn({listPhieu}) {
  const [isChecked, setIsChecked] = useState(true);
  return (
    <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={listPhieu}
        renderItem={(i) => (
          <List.Item key={i.id}>
            <JobCard
              item={i}
              showButton={true}
              // onButtonClick={}
              textButton="Gửi phiếu"
              textButton2="Đã in phiếu"
              onButtonClick2={() => setIsChecked(!isChecked)}
              showButton2={isChecked}
              showTime={true}
            />
          </List.Item>
        )}
      />
  )
}
