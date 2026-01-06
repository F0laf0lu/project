import { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Select, Spin } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ReloadOutlined,
  EyeOutlined,
} from '@ant-design/icons';


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



function CorporateClient() {

    const [data, setData] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [clientTypeFilter, setClientTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);


    // Simulate initial data loading
    useEffect(() => {
        setLoading(true);
        setTableLoading(true)
        setTimeout(() => {
        setData(initialData);
        setLoading(false);
        setTableLoading(false)
        }, 1500); // 1.5 second loading time
    }, []);


    // Handle global search
    const handleSearch = (value) => {
        setSearchText(value);
        filterData(value, clientTypeFilter, statusFilter);
    };

    // Handle client type filter
    const handleClientTypeFilter = (value) => {
        setClientTypeFilter(value);
        filterData(searchText, value, statusFilter);
    };

    // Handle status filter
    const handleStatusFilter = (value) => {
        setStatusFilter(value);
        filterData(searchText, clientTypeFilter, value);
    };

    // Filter data based on all criteria
    const filterData = (search, type, status) => {
        // setTableLoading(true);
        
        setTimeout(() => {
        let filtered = [...initialData];

        // Apply search filter
        if (search) {
            filtered = filtered.filter((item) =>
            Object.values(item).some((val) =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
            );
        }

        // Apply client type filter
        if (type !== 'all') {
            filtered = filtered.filter((item) => item.clientType === type);
        }

        // Apply status filter
        if (status !== 'all') {
            filtered = filtered.filter((item) => item.status === status);
        }

        setData(filtered);
        setTableLoading(false);
        }, 500); // 0.5 second loading time for filters
    };
    
    const handleReset = () => {
        setSearchText('');
        setClientTypeFilter('all');
        setStatusFilter('all');
        setData(initialData);
    };

    const fullTableColumns = [
        {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        width: '16%',
        },
        {
        title: 'Contact Person',
        dataIndex: 'contactPerson',
        key: 'contactPerson',
        sorter: (a, b) => a.contactPerson.localeCompare(b.contactPerson),
        width: '14%',
        },
        {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
        width: '16%',
        },
        {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        width: '11%',
        },
        {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        sorter: (a, b) => (a.product || '').localeCompare(b.product || ''),
        width: '13%',
        render: (product) => product || <span style={{ color: '#bfbfbf' }}>N/A</span>,
        },
        {
        title: 'Client Type',
        dataIndex: 'clientType',
        key: 'clientType',
        sorter: (a, b) => a.clientType.localeCompare(b.clientType),
        width: '9%',
        render: (clientType) => {
            let color = 'blue';
            if (clientType === 'Private') color = 'geekblue';
            if (clientType === 'Individual') color = 'cyan';
            return <Tag color={color}>{clientType}</Tag>;
        },
        },
        {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        sorter: (a, b) => a.status.localeCompare(b.status),
        width: '7%',
        render: (status) => (
            <Tag color={status === 'Active' ? 'blue' : 'default'}>
            {status}
            </Tag>
        ),
        },
        {
        title: 'Join Date',
        dataIndex: 'joinDate',
        key: 'joinDate',
        sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
        width: '9%',
        },
        {
        title: 'Actions',
        key: 'actions',
        width: '8%',
        render: (_, record) => (
            <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewClient(record)}
            style={{ padding: '4px 8px' }}
            >
            View
            </Button>
        ),
        },
    ];    

    return(
        <Spin spinning={tableLoading} size="large" tip="Loading client data...">
        <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ 
            color: '#1890ff', 
            marginBottom: '30px',
            fontSize: '24px',
            fontWeight: '600'
            }}>
            Corporate Clients
            </h2>

            {/* Filter Controls */}
            <div style={{ 
            marginBottom: '24px',
            padding: '20px',
            background: '#f0f5ff',
            borderRadius: '6px',
            border: '1px solid #d6e4ff'
            }}>
            <Space size="middle" wrap style={{ width: '100%' }}>
                <Input
                placeholder="Search across all fields..."
                prefix={<SearchOutlined style={{ color: '#1890ff' }} />}
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                style={{ 
                    width: 300,
                    borderColor: '#1890ff'
                }}
                allowClear
                disabled={tableLoading}
                />

                <Select
                value={clientTypeFilter}
                onChange={handleClientTypeFilter}
                style={{ width: 180 }}
                suffixIcon={<FilterOutlined style={{ color: '#1890ff' }} />}
                disabled={tableLoading}
                >
                <Select.Option value="all">All Client Types</Select.Option>
                <Select.Option value="Corporate">Corporate</Select.Option>
                <Select.Option value="Private">Private</Select.Option>
                <Select.Option value="Individual">Individual</Select.Option>
                </Select>

                <Select
                    value={statusFilter}
                    onChange={handleStatusFilter}
                    style={{ width: 150 }}
                    suffixIcon={<FilterOutlined style={{ color: '#1890ff' }} />}
                    disabled={tableLoading}
                >
                <Select.Option value="all">All Status</Select.Option>
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Inactive">Inactive</Select.Option>
                </Select>

                <Button 
                icon={<ReloadOutlined />}
                onClick={handleReset}
                style={{
                    borderColor: '#1890ff',
                    color: '#1890ff'
                }}
                disabled={tableLoading}
                >
                Reset Filters
                </Button>
            </Space>

            <div style={{ 
                marginTop: '12px', 
                color: '#1890ff',
                fontSize: '14px'
            }}>
                Showing {data.length} of {initialData.length} records
            </div>
            </div>

            {/* Data Table */}
            <Table
            columns={fullTableColumns}
            dataSource={data}
            loading={tableLoading}
            pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} items`,
                pageSizeOptions: ['5', '10', '20', '50'],
            }}
            style={{
                background: 'white'
            }}
            bordered
            onRow={(record) => ({
                onClick: () => handleViewClient(record),
                style: { cursor: 'pointer' }
            })}
            />
        </div>
        </Spin>
    )
}


export default CorporateClient