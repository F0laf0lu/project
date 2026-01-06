import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Typography, Button, Space, Select, Spin } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ReloadOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import clientService from '../services/clientService';

const {Text} = Typography


const initialData = [
    // {
    //     key: '2',
    //     name: 'Sarah Johnson',
    //     contactPerson: 'Sarah Johnson',
    //     email: 'sarah.j@email.com',
    //     phone: '+1-555-0102',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2024-10-20',
    // },
    // {
    //     key: '4',
    //     name: 'Private Holdings LLC',
    //     contactPerson: 'Emily Davis',
    //     email: 'emily@privateholdings.com',
    //     phone: '+1-555-0104',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2024-10-22',
    // },
    // {
    //     key: '5',
    //     name: 'Robert Williams',
    //     contactPerson: 'Robert Williams',
    //     email: 'rwilliams@email.com',
    //     phone: '+1-555-0105',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2024-10-25',
    // },
    // {
    //     key: '6',
    //     name: 'Global Ventures',
    //     contactPerson: 'Lisa Anderson',
    //     email: 'landerson@globalventures.com',
    //     phone: '+1-555-0106',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2023-08-10',
    // },
    // {
    //     key: '7',
    //     name: 'James Martinez',
    //     contactPerson: 'James Martinez',
    //     email: 'jmartinez@email.com',
    //     phone: '+1-555-0107',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2024-10-23',
    // },
    // {
    //     key: '9',
    //     name: 'Elite Capital Group',
    //     contactPerson: 'David Wilson',
    //     email: 'dwilson@elitecapital.com',
    //     phone: '+1-555-0109',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2024-10-21',
    // },
    // {
    //     key: '10',
    //     name: 'Jennifer Moore',
    //     contactPerson: 'Jennifer Moore',
    //     email: 'jmoore@email.com',
    //     phone: '+1-555-0110',
    //     clientType: 'Individual',
    //     status: 'Active',
    //     joinDate: '2024-10-24',
    // },
    // {
    //     key: "12",
    //     name: "Amanda Rodriguez",
    //     contactPerson: "Amanda Rodriguez",
    //     email: "a.rodriguez@email.com",
    //     phone: "+1-555-0112",
    //     clientType: "Individual",
    //     status: "Active",
    //     joinDate: "2024-10-27"
    // },
    // {
    //     key: "13",
    //     name: "Summit Financial Partners",
    //     contactPerson: "Kevin Lee",
    //     email: "kevin@summitfinancial.com",
    //     phone: "+1-555-0113",
    //     clientType: "Private",
    //     status: "Active",
    //     joinDate: "2024-10-28"
    // },
    // {
    //     key: "15",
    //     name: "Thomas Chen",
    //     contactPerson: "Thomas Chen",
    //     email: "tchen@email.com",
    //     phone: "+1-555-0115",
    //     clientType: "Individual",
    //     status: "Active",
    //     joinDate: "2024-10-29"
    // },
    // {
    //     key: "18",
    //     name: "Olivia Parker",
    //     contactPerson: "Olivia Parker",
    //     email: "oparker@email.com",
    //     phone: "+1-555-0118",
    //     "clientType": "Individual",
    //     status: "Inactive",
    //     joinDate: "2023-12-05"
    // },
];



function IndividualClient() {

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [clientTypeFilter, setClientTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);


    async function fetchClients(){
        setTableLoading(true)
        try {
            const response = await clientService.completedClientList()
            setData(response.Data)
        } catch (error) {
            console.log("Error fetching clients", error)
        }
        finally{
            setTableLoading(false)
        }
    }

    useEffect(() => {
        fetchClients()

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

    const handleViewClient = (clientId) => {
        const clientData = initialData.find(client => client.key === clientId)
        navigate(`/clients/${clientId}`, {state: clientData});
        // setSelectedClient(client);
    };


    // Filter data based on all criteria
    // const filterData = (search, type, status) => {
    //     setTableLoading(true);
        
    //     setTimeout(() => {
    //     let filtered = [...initialData];

    //     // Apply search filter
    //     if (search) {
    //         filtered = filtered.filter((item) =>
    //         Object.values(item).some((val) =>
    //             String(val).toLowerCase().includes(search.toLowerCase())
    //         )
    //         );
    //     }

    //     // Apply client type filter
    //     if (type !== 'all') {
    //         filtered = filtered.filter((item) => item.clientType === type);
    //     }

    //     // Apply status filter
    //     if (status !== 'all') {
    //         filtered = filtered.filter((item) => item.status === status);
    //     }
    //     setData(filtered);
    //     setTableLoading(false);
    //     }, 500); // 0.5 second loading time for filters
    // };
    
    const handleReset = () => {
        setSearchText('');
        setClientTypeFilter('all');
        setStatusFilter('all');
        setData(initialData);
    };

    // const fullTableColumns = [
    //     //  {
    //     //     title: 'S/N',
    //     //     key: 'index',
    //     //     width: '1%',
    //     //     render: (text, record,index) => index + 1,
    //     // },
    //     {
    //     title: 'Client Name',
    //     dataIndex: 'name',
    //     key: 'name',
    //     sorter: (a, b) => a.name.localeCompare(b.name),
    //     width: '16%',
    //     },
    //     {
    //     title: 'Email',
    //     dataIndex: 'email',
    //     key: 'email',
    //     sorter: (a, b) => a.email.localeCompare(b.email),
    //     width: '16%',
    //     },
    //     {
    //     title: 'Phone',
    //     dataIndex: 'phone',
    //     key: 'phone',
    //     width: '11%',
    //     },
    //     {
    //     title: 'Actions',
    //     key: 'actions',
    //     width: '8%',
    //     render: (_, record) => (
    //         <Button
    //         type="link"
    //         icon={<EyeOutlined />}
    //         onClick={() => handleViewClient(record)}
    //         style={{ padding: '4px 8px' }}
    //         >
    //         View
    //         </Button>
    //     ),
    //     },
    // ];    



    const fullTableColumns = [
        {
            title: 'Account Number',
            dataIndex: 'AccountNumber',
            key: 'acctNumber',
            sorter: (a, b) => a.AccountNumber.localeCompare(b.AccountNumber),
            width: '5%',
            render: (record) => {
                return <Text strong>{record}</Text>
            }
        },
        {
            title: 'Client Name',
            dataIndex: 'FullName',
            key: 'name',
            sorter: (a, b) => a.FullName.localeCompare(b.FullName),
            width: '16%',
        },
        {
            title: 'Email',
            dataIndex: 'Email',
            key: 'email',
            sorter: (a, b) => a.Email.localeCompare(b.Email),
            width: '16%',
        },
        {
            title: 'Phone',
            dataIndex: 'MobilePhone',
            key: 'phone',
            width: '11%',
        },
        {
            title: 'Actions',
            key: 'actions',
            width: '8%',
            render: (_, record) => (
                <Space size="small">
                    {/* <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewClient(record)}
                        style={{ padding: '4px 8px' }}
                    >
                        View
                    </Button> */}
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditClient(record.AccountNumber)}
                        style={{ padding: '4px 8px', color: '#1890ff' }}
                    >
                        {/* Edit */}
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeleteClient(record)}
                        style={{ padding: '4px 8px', color: '#ff4d4f' }}
                        danger
                    >
                        {/* Delete */}
                    </Button>
                </Space>
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
            Client Data Table
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
                Showing {data.length} of {data.length} records
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
            rowKey={(row)=>row.AccountNumber}
            style={{
                background: 'white'
            }}
            bordered
            onRow={(record) => ({
                onClick: () => handleViewClient(record.key),
                style: { cursor: 'pointer' }
            })}
            />
        </div>
        </Spin>
    )
}


export default IndividualClient