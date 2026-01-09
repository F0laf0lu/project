import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Input, Button, Space, Select, Layout, Spin, App, Typography, Tabs  } from 'antd';
import { 
  SearchOutlined, 
  FilterOutlined, 
  ReloadOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { getValueFromName, getNameFromValue } from '../utils/utils';
import utilitiesService from '../services/utilitiesService';

const {Text} = Typography
const { Header, Sider, Content } = Layout;

const initialData = [
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
        key: '4',
        name: 'Private Holdings LLC',
        contactPerson: 'Emily Davis',
        email: 'emily@privateholdings.com',
        phone: '+1-555-0104',
        clientType: 'Individual',
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
        clientType: 'Individual',
        status: 'Active',
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
        key: '9',
        name: 'Elite Capital Group',
        contactPerson: 'David Wilson',
        email: 'dwilson@elitecapital.com',
        phone: '+1-555-0109',
        clientType: 'Individual',
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
    {
        key: "12",
        name: "Amanda Rodriguez",
        contactPerson: "Amanda Rodriguez",
        email: "a.rodriguez@email.com",
        phone: "+1-555-0112",
        clientType: "Individual",
        status: "Active",
        joinDate: "2024-10-27"
    },
    {
        key: "13",
        name: "Summit Financial Partners",
        contactPerson: "Kevin Lee",
        email: "kevin@summitfinancial.com",
        phone: "+1-555-0113",
        clientType: "Private",
        status: "Active",
        joinDate: "2024-10-28"
    },
    {
        key: "15",
        name: "Thomas Chen",
        contactPerson: "Thomas Chen",
        email: "tchen@email.com",
        phone: "+1-555-0115",
        clientType: "Individual",
        status: "Active",
        joinDate: "2024-10-29"
    },
    {
        key: "18",
        name: "Olivia Parker",
        contactPerson: "Olivia Parker",
        email: "oparker@email.com",
        phone: "+1-555-0118",
        "clientType": "Individual",
        status: "Inactive",
        joinDate: "2023-12-05"
    },
];



function IncompleteOnboarding() {

    const { message } = App.useApp();

    const {authUser, token, logout} = useAuth()

    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [corporateClientData, setCorporateClientsData] = useState([])
    const [tableLoading, setTableLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [clientTypeFilter, setClientTypeFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [utilities, setUtilities] = useState({});

    const BASE_URL = "https://webdev.stanbicibtcpension.com:7789/api"

    const fetchClients = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/GetList_Of_Ongoing_IndividualClient`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status=== 401) {
                console.log('Token expired or unauthorized');
                logout()
                navigate('/login')
            }
            else if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json()
            const clientData = data.Data
            setData(clientData.filter((client)=>client.AccountNumber != ""))
        } catch (error) {
            console.log("An error occured")
        }
    }

    const fetchCorporateClients = async()=>{
        try {
            const response = await fetch(`${BASE_URL}/CorporateClientsOnboarding/GetList_Of_Ongoing_CoporateClients`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status=== 401) {
                console.log('Token expired or unauthorized');
                logout()
                navigate('/login')
            }
            else if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }
            const data = await response.json()
            const clientData = data.Data
            setCorporateClientsData(clientData.filter((client)=>client.AccountNumber != ""))
        } catch (error) {
            console.log(error)
            console.log("An error occured")
        }
    }

    async function fetchUtilities() {    
        setLoading(true);
        try {
            const allData = await utilitiesService.getAllUtilities(token);
            setUtilities(allData);
            } catch (error) {
            console.error('Failed to load utilities:', error);
            } finally {
            setLoading(false);
        }
    }

    // Data loading

    useEffect(()=>{
        fetchUtilities()
    }, [])


    useEffect(() => {
        setLoading(true);
        setTableLoading(true)
        fetchClients()
        fetchCorporateClients()
        setLoading(false);
        setTableLoading(false)
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


    const fetchOnboardingDetails = async(accountNumber)=>{
        try {
            const response = await fetch(`${BASE_URL}/IndividualClientsOnboarding/Get_Ongoing_Individual_ClientDetails?accountNumber=${accountNumber}`, {
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            })
            if (response.status=== 401) {
                console.log('Token expired or unauthorized');
                logout()
                navigate('/login')
            }
            else if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const data = await response.json()
            return data.Data
        } catch (error) {
            console.log("An error occured")
        }
    }

    const getOnboardingStep = (clientData) =>{
        let onboardingStep;
        if (clientData.RelationshipDetails === null) {
            onboardingStep = 2
        }
        else if(clientData.Documents.length == 0){
            onboardingStep = 3
        }
        else if(clientData.Beneficiaries.length == 0){
            onboardingStep = 4
        }
        else{
            onboardingStep = 5
        }

        return onboardingStep
    }

    const transformData = (data) => {
        const result = {
            files: [],
            kycTypes: []
        };
        
        data.forEach(file => {
            // Calculate file size from Base64 data
            // Base64: 4 characters = 3 bytes (approximately)
            const base64Length = file.Data.length;
            const padding = file.Data.endsWith('==') ? 2 : file.Data.endsWith('=') ? 1 : 0;
            const fileSizeBytes = (base64Length * 3) / 4 - padding;
            
            // Convert to KB
            const fileSizeKB = (fileSizeBytes / 1024).toFixed(2);
            
            // Add to files array - CORRESPONDING INDEX
            result.files.push({
                name: file.FileName,
                size: `${fileSizeKB} KB`
            });
            
            // Add to docTypes array - SAME INDEX
            result.kycTypes.push(file.DocumentType);
        });
        
        return result;
    };

    const handleEditClient = async(accountNumber) =>{
        console.log(accountNumber)
        const data = await fetchOnboardingDetails(accountNumber)
        const onboardingStep = getOnboardingStep(data)
        
        // Prepare data
        const flattenedBeneficiaries = {};
        const beneficiaryData = {}
        data.Beneficiaries.forEach((beneficiary, index) => {
            const selectFields = ['Beneficiary_Title','Beneficiary_Gender','Beneficiary_State','Beneficiary_Relationship', 'Beneficiary_Birth_Country', 'Beneficiary_Nationality', 'Beneficiary_Country']

            const fields = [
                'SeQNum',
                'Eaccount',
                'Beneficiary_Title',
                'Beneficiary_FirstName', 
                'Beneficiary_MiddleName',
                'Beneficiary_LastName',
                'Beneficiary_Gender',
                'Beneficiary_DoB',
                'Beneficiary_Relationship',
                'Beneficiary_Nationality',
                'Beneficiary_Birth_Country',
                'Beneficiary_Address',
                'Beneficiary_City',
                'Beneficiary_State',
                'Beneficiary_Country'
            ];

            let replacedBeneficiaryObj = {}
            fields.forEach(field => {
                let value;
                if (selectFields.includes(field)) {
                    const fieldArray = field.split("_")
                    if (fieldArray[fieldArray.length - 1] === 'Nationality') {
                        value = getValueFromName(beneficiary['Beneficiary_Nationality'], utilities.countryOptions)
                    }
                    else if(fieldArray[fieldArray.length - 1] === 'Country'){
                        const name = `${fieldArray.join("_")}`
                        value = getValueFromName(beneficiary[name], utilities.countryOptions)
                    }
                    else{
                        const name = `${fieldArray.join("_")}`
                        value = getValueFromName(beneficiary[name], utilities[`${fieldArray[fieldArray.length - 1].toLowerCase()}Options`])
                    }
                }
                flattenedBeneficiaries[`${field}_${index}`] = selectFields.includes(field) ? value : beneficiary[field];
                replacedBeneficiaryObj[field] = selectFields.includes(field) ? value : beneficiary[field];
                
            });
            beneficiaryData[index] = {...beneficiary, ...replacedBeneficiaryObj}
        });

        console.log(beneficiaryData)


        const beneficiaries = Array.from({length: data.Beneficiaries.length}, 
            (_, i)=>({
            id:i
        }))

        const spreadData = { ...data.IndividualClientDetails, ...data.RelationshipDetails, ...flattenedBeneficiaries, clientType:"Individual"}
        const docs = transformData(data.Documents)
        console.log(docs)
        navigate('/onboard-client', {
            state: {
                onboardingStep,
                clientData: spreadData,
                beneficiaries,
                docs,
                beneficiaryData
            }
        })
    }


    // Filter data based on all criteria
    const filterData = (search, type, status) => {
        // setTableLoading(true);

        // TODO: Get the current active tab to get the table. Then do the filtering
        
        setTimeout(() => {
        let filtered = [...data];

        // Apply search filter
        if (search) {
            filtered = filtered.filter((item) =>
                Object.values(item).some((val) =>
                    String(val).toLowerCase().includes(search.toLowerCase())
                )
            );
        }
        setData(filtered);
        setTableLoading(false);
        }, 500); 
    };
    
    const handleReset = () => {
        setSearchText('');
        setData(data);
    };

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
    
    const CorporateTableColumns = [
        // {
        //     title: 'Account Number',
        //     dataIndex: 'AccountNumber',
        //     key: 'acctNumber',
        //     sorter: (a, b) => a.AccountNumber.localeCompare(b.AccountNumber),
        //     width: '5%',
        //     render: (record) => {
        //         return <Text strong>{record}</Text>
        //     }
        // },
        {
            title: 'Customer Id',
            dataIndex: 'Customer_ID',
            key: 'customerId',
            sorter: (a, b) => a.Customer_ID.localeCompare(b.Customer_ID),
            width: '5%',
            render: (record) => {
                return <Text strong>{record}</Text>
            }
        },
        {
            title: 'Client Name',
            dataIndex: 'Coporate_Client',
            key: 'corporateClient',
            sorter: (a, b) => a.Coporate_Client.localeCompare(b.Coporate_Client),
            width: '5%',
            render: (record) => {
                return <Text strong>{record}</Text>
            }
        },
        {
            title: 'RC Number',
            dataIndex: 'RC_Number',
            key: 'rc_number',
            sorter: (a, b) => a.Customer_ID.localeCompare(b.Customer_ID),
            width: '5%',
            render: (record) => {
                return <Text strong>{record}</Text>
            }
        },
        {
            title: 'Business Sector',
            dataIndex: 'Business_Sector',
            key: 'business_sector',
            sorter: (a, b) => a.Business_Sector.localeCompare(b.Business_Sector),
            width: '5%',
            render: (record) => {
                return <Text strong>{record}</Text>
            }
        },
        {
            title: 'Business Type',
            dataIndex: 'Business_Type',
            key: 'business_type',
            sorter: (a, b) => a.Business_Type.localeCompare(b.Business_Type),
            width: '5%',
            render: (record) => {
                return <Text strong>{record}</Text>
            }
        },
    ]

    const IndividualClientsTable = ()=>{

        return (
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
                // onRow={(record) => ({
                //     onClick: () => handleViewClient(record.key),
                //     style: { cursor: 'pointer' }
                // })}
            />
        )
    }

    const IncompleteCorporateClients = ()=>{

        return (
            <Table
                columns={CorporateTableColumns}
                dataSource={corporateClientData}
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
                // onRow={(record) => ({
                //     onClick: () => handleViewClient(record.key),
                //     style: { cursor: 'pointer' }
                // })}
            />
        )
    }

    const items = [
        {
            key: '1',
            label: 'Individial Clients',
            children: <IndividualClientsTable/>,
        },
        {
            key: '2',
            label: 'Corporate Clients',
            children: <IncompleteCorporateClients/>,
        }
    ];
    const onChange = key => {
        // console.log(key);
    };
    

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
            Incomplete Client Onboarding
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
        </Spin>
    )
}


export default IncompleteOnboarding