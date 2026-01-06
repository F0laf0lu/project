import { useState } from 'react';
import { Table, Input, Button, Space, Tag, Select, Layout, Menu, Avatar, Dropdown, Card, Row, Col, Statistic, Spin, Form, message, Steps, Upload } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ReloadOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  TableOutlined,
  UserOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  LogoutOutlined,
  BellOutlined,
  DownOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  IdcardOutlined,
  RiseOutlined,
  LoadingOutlined,
  PlusOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined,
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  EditOutlined,
  PhoneOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import SideBar from '../components/layout/Sidebar';
import HeaderComponent from '../components/layout/Header';

const { Header, Sider, Content } = Layout;

const initialData = [
  {
    key: '1',
    name: 'Acme Corporation',
    contactPerson: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+1-555-0101',
    clientType: 'Corporate',
    status: 'Active',
    joinDate: '2024-10-15',
  },
  {
    key: '2',
    name: 'Sarah Johnson',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1-555-0102',
    clientType: 'Individual',
    status: 'Active',
    joinDate: '2024-10-20',
  },
  {
    key: '3',
    name: 'Tech Solutions Inc',
    contactPerson: 'Michael Brown',
    email: 'mbrown@techsolutions.com',
    phone: '+1-555-0103',
    clientType: 'Corporate',
    status: 'Active',
    joinDate: '2024-10-18',
  },
  {
    key: '4',
    name: 'Private Holdings LLC',
    contactPerson: 'Emily Davis',
    email: 'emily@privateholdings.com',
    phone: '+1-555-0104',
    clientType: 'Private',
    status: 'Active',
    joinDate: '2024-10-22',
  },
  {
    key: '5',
    name: 'Robert Williams',
    contactPerson: 'Robert Williams',
    email: 'rwilliams@email.com',
    phone: '+1-555-0105',
    clientType: 'Individual',
    status: 'Active',
    joinDate: '2024-10-25',
  },
  {
    key: '6',
    name: 'Global Ventures',
    contactPerson: 'Lisa Anderson',
    email: 'landerson@globalventures.com',
    phone: '+1-555-0106',
    clientType: 'Private',
    status: 'Inactive',
    joinDate: '2023-08-10',
  },
  {
    key: '7',
    name: 'James Martinez',
    contactPerson: 'James Martinez',
    email: 'jmartinez@email.com',
    phone: '+1-555-0107',
    clientType: 'Individual',
    status: 'Active',
    joinDate: '2024-10-23',
  },
  {
    key: '8',
    name: 'Digital Dynamics',
    contactPerson: 'Patricia Taylor',
    email: 'ptaylor@digitaldynamics.com',
    phone: '+1-555-0108',
    clientType: 'Corporate',
    status: 'Active',
    joinDate: '2024-10-19',
  },
  {
    key: '9',
    name: 'Elite Capital Group',
    contactPerson: 'David Wilson',
    email: 'dwilson@elitecapital.com',
    phone: '+1-555-0109',
    clientType: 'Private',
    status: 'Active',
    joinDate: '2024-10-21',
  },
  {
    key: '10',
    name: 'Jennifer Moore',
    contactPerson: 'Jennifer Moore',
    email: 'jmoore@email.com',
    phone: '+1-555-0110',
    clientType: 'Individual',
    status: 'Active',
    joinDate: '2024-10-24',
  },
];

function Dashboard() {
    const [tableLoading, setTableLoading] = useState(false);


    // Calculate statistics
    const totalClients = initialData.filter(c => c.status === 'Active').length;
    const privateClients = initialData.filter(c => c.clientType === 'Private' && c.status === 'Active').length;
    const individualClients = initialData.filter(c => c.clientType === 'Individual' && c.status === 'Active').length;

    const recentClients = [...initialData]
        .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
        .slice(0, 5);


    const recentClientsColumns = [
        {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
        width: '30%',
        },
        {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        width: '25%',
        },
        {
        title: 'Client Type',
        dataIndex: 'clientType',
        key: 'clientType',
        width: '20%',
        render: (clientType) => {
            let color = 'blue';
            if (clientType === 'Private') color = 'geekblue';
            if (clientType === 'Individual') color = 'cyan';
            return <Tag color={color}>{clientType}</Tag>;
        },
        },
        {
        title: 'Join Date',
        dataIndex: 'joinDate',
        key: 'joinDate',
        width: '25%',
        },
    ];

    return(
        <Spin spinning={tableLoading} size="large" tip="Loading dashboard data...">
            <div>
                {/* Summary Cards */}
                <Row gutter={[24, 24]}>
                <Col xs={24} sm={8}>
                    <Card 
                    bordered={false}
                    loading={tableLoading}
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    >
                    <Statistic
                        title={<span style={{ fontSize: '16px', color: '#666' }}>Total Active Clients</span>}
                        // value={totalClients}
                        value={10}
                        prefix={<UserAddOutlined style={{ color: '#1890ff' }} />}
                        valueStyle={{ color: '#1890ff', fontSize: '32px', fontWeight: 'bold' }}
                    />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card 
                    bordered={false}
                    loading={tableLoading}
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    >
                    <Statistic
                        title={<span style={{ fontSize: '16px', color: '#666' }}>Corporate Clients</span>}
                        // value={privateClients}
                        value={0}
                        prefix={<IdcardOutlined style={{ color: '#1890ff' }} />}
                        valueStyle={{ color: '#1890ff', fontSize: '32px', fontWeight: 'bold' }}
                    />
                    </Card>
                </Col>
                <Col xs={24} sm={8}>
                    <Card 
                    bordered={false}
                    loading={tableLoading}
                    style={{
                        borderRadius: '8px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                    >
                    <Statistic
                        title={<span style={{ fontSize: '16px', color: '#666' }}>Individual Clients</span>}
                        // value={individualClients}
                        value={10}
                        prefix={<UsergroupAddOutlined style={{ color: '#1890ff' }} />}
                        valueStyle={{ color: '#1890ff', fontSize: '32px', fontWeight: 'bold' }}
                    />
                    </Card>
                </Col>
                </Row>

                {/* Recent Clients Table */}
                {/* <div style={{ marginTop: '32px' }}>
                <div style={{
                    background: 'white',
                    padding: '24px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <h3 style={{ 
                    color: '#1890ff', 
                    marginBottom: '20px',
                    fontSize: '20px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                    }}>
                    <RiseOutlined /> Recently Added Clients
                    </h3>
                    <Table
                    columns={recentClientsColumns}
                    dataSource={recentClients}
                    pagination={false}
                    loading={tableLoading}
                    bordered
                    onRow={(record) => ({
                        onClick: () => handleViewClient(record),
                        style: { cursor: 'pointer' }
                    })}
                    />
                </div>
                </div> */}
            </div>
        </Spin>
    )
}


export default Dashboard