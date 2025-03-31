import { Tabs } from 'antd';
import React from 'react'
import NhanCV from './NhanCV';

import { IoBriefcaseOutline } from 'react-icons/io5';
import { CiClock2, CiInboxIn } from 'react-icons/ci';
import { FiCheckCircle } from 'react-icons/fi';
import DaNhanCV from './DaNhanCV';
import DuyetCV from './DuyetCV';
import HoanThanhCV from './HoanThanhCV';
const NhanViecForm = () => {
  const items = [
    {
      key: '1',
      icon: <IoBriefcaseOutline />,
      label: 'Việc có thể nhận',
      children: <NhanCV/>,
    },
   
    {
      key: '2',
      label: 'Việc đã nhận',
      icon: <CiInboxIn />,
      children: <DaNhanCV/>,
    },
    {
      key: '3',
      label: 'Việc đang duyệt',
      icon: <CiClock2 />,
      children: <DuyetCV/>,
    },
    {
      key: '4',
      label: 'Việc đã đã hoàn thành',
      icon: <FiCheckCircle />,
      children: <HoanThanhCV/>,
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}

export default NhanViecForm