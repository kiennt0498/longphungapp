import React, { useState, useMemo } from 'react';
import { Typography, Card } from 'antd';

import StatsCards from './KHTNCommon/StatsCards';
import FilterBar from './KHTNCommon/FilterBar';
import LeadsTable from './KHTNCommon/LeadsTable';
import './KHTNStyles/KHTN.scss'; // Assuming you have a common styles file


const { Title, Text } = Typography;

function KhachHangTiemNang() {

   const mockData = [
  {
    id: 1,
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    email: 'nguyenvanan@gmail.com',
    lastContact: '2024-01-15',
    needs: 'Móc khóa 100 chiếc, in logo',
    status: 'interested',
    profession: 'Giám đốc',
    tags: ['VIP', 'Khách hàng cũ'],
    interestedProducts: ['Móc khóa', 'Ly sứ', 'Sticker']
  },
  {
    id: 2,
    name: 'Trần Thị Bình',
    phone: '0912345678',
    email: 'tranthibinh@company.com',
    lastContact: '2024-01-14',
    needs: 'Ly sứ 200 chiếc, in logo công ty',
    status: 'quoted',
    profession: 'Marketing',
    tags: ['Doanh nghiệp', 'Tiềm năng cao'],
    interestedProducts: ['Ly sứ', 'Áo thun', 'Túi vải']
  },
  {
    id: 3,
    name: 'Lê Hoàng Cường',
    phone: '0923456789',
    email: 'lehoangcuong@email.com',
    lastContact: '2024-01-13',
    needs: 'Áo thun 50 chiếc, size M, L',
    status: 'closed',
    profession: 'Quản lý',
    tags: ['Đã mua', 'Khách hàng thân thiết'],
    interestedProducts: ['Áo thun', 'Nón', 'Túi vải']
  },
  {
    id: 4,
    name: 'Phạm Thị Diệu',
    phone: '0934567890',
    email: 'phamthidieu@gmail.com',
    lastContact: '2024-01-12',
    needs: 'Túi vải canvas, in logo',
    status: 'contacted',
    profession: 'Nhân viên',
    tags: ['Khách hàng mới'],
    interestedProducts: ['Túi vải', 'Sổ tay']
  },
  {
    id: 5,
    name: 'Hoàng Văn Em',
    phone: '0945678901',
    email: 'hoangvanem@company.vn',
    lastContact: '2024-01-11',
    needs: 'Bút bi 300 chiếc, khắc tên',
    status: 'not_called',
    profession: 'Kinh doanh',
    tags: ['Cần theo dõi'],
    interestedProducts: ['Bút bi', 'Lịch', 'Bookmark']
  },
  {
    id: 6,
    name: 'Ngô Thị Phương',
    phone: '0956789012',
    email: 'ngothiphuong@email.com',
    lastContact: '2024-01-10',
    needs: 'Nón lưỡi trai 80 chiếc',
    status: 'interested',
    profession: 'IT',
    tags: ['Tech', 'Startup'],
    interestedProducts: ['Nón', 'USB', 'Sticker']
  }
];


  const [leads, setLeads] = useState(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [professionFilter, setProfessionFilter] = useState('all');

 

  const statusConfig = {
  not_called: { label: 'Chưa gọi', color: 'default' },
  contacted: { label: 'Đã liên hệ', color: 'blue' },
  interested: { label: 'Quan tâm', color: 'orange' },
  quoted: { label: 'Đã gửi báo giá', color: 'purple' },
  closed: { label: 'Đã chốt đơn', color: 'green' },
};
 const professionColors = {
  'Giám đốc': 'red',
  'Quản lý': 'volcano',
  'Nhân viên': 'blue',
  'Kinh doanh': 'green',
  'Marketing': 'purple',
  'IT': 'cyan',
  'Khác': 'default'
};

 const productColors = {
  'Móc khóa': 'magenta',
  'Ly sứ': 'red',
  'Áo thun': 'volcano',
  'Túi vải': 'orange',
  'Bút bi': 'gold',
  'Nón': 'lime',
  'Sticker': 'green',
  'Bookmark': 'cyan',
  'Lịch': 'blue',
  'Sổ tay': 'geekblue',
  'USB': 'purple'
};


  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      const search = searchTerm.toLowerCase();
      return (
        (lead.name.toLowerCase().includes(search) ||
          lead.phone.includes(search) ||
          lead.email.toLowerCase().includes(search)) &&
        (statusFilter === 'all' || lead.status === statusFilter) &&
        (professionFilter === 'all' || lead.profession === professionFilter)
      );
    });
  }, [leads, searchTerm, statusFilter, professionFilter]);

  return (
    <div className="khach-hang-page">
      <Title level={2}>Quản lý khách hàng tiềm năng</Title>
      <Text type="secondary">Theo dõi và quản lý danh sách khách hàng tiềm năng</Text>

      <StatsCards leads={leads} />
      <Card className="card-block">
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          professionFilter={professionFilter}
          setProfessionFilter={setProfessionFilter}
          statusConfig={statusConfig}
          professionColors={professionColors}
        />
      </Card>
      <Card>
        <LeadsTable data={filteredLeads} professionColors={professionColors} productColors={productColors} statusConfig={statusConfig}/>
      </Card>
    </div>
  );
}

export default KhachHangTiemNang;
