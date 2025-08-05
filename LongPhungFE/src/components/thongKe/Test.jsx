import { Button } from 'antd'
import React from 'react'
import ThongKeService from '../../services/ThongKeService'

function Test() {
  const service = new ThongKeService()

  const getTongKPI = async () => {
    const data = "2025-06"
    try {
      
      const response = await service.getLoiNhuanDoanhThu()
      console.log(response)
    } catch (error) {
      console.error("Error fetching Tong KPI:", error)
    }
  }
  return (
    <div>
        <Button onClick={getTongKPI}>test</Button>
    </div>
  )
}

export default Test