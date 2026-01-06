import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Space, Tag, Select, Layout, Menu, Avatar, Dropdown, Card, Row, Col, Statistic, Spin, Form, message, Steps, Upload, Tabs, Modal } from 'antd';
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
  ClockCircleOutlined,
  HeartOutlined,
  FolderOutlined,
  ProfileOutlined,
  ShoppingOutlined,
  DownloadOutlined,
  HomeOutlined,
  ContactsOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

// Sample client data
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

export default function ClientDataTable() {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [clientTypeFilter, setClientTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [beneficiaries, setBeneficiaries] = useState([{ id: 1 }]); // Start with one beneficiary
  const [uploadedFiles, setUploadedFiles] = useState({}); // Track uploaded files 
  const [selectedClient, setSelectedClient] = useState(null); // Track selected client for viewing
  const [pendingApprovals, setPendingApprovals] = useState([]); // Track pending client approvals
  const [selectedApproval, setSelectedApproval] = useState(null); // Track selected approval for review

  // Simulate initial data loading
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(initialData);
      setLoading(false);
    }, 1500); // 1.5 second loading time
  }, []);

  // Simulate loading when switching pages
  useEffect(() => {
    setTableLoading(true);
    setTimeout(() => {
      setTableLoading(false);
    }, 800); // 0.8 second loading time for page switches
  }, [currentPage]);

  // Calculate statistics
  const totalClients = initialData.filter(c => c.status === 'Active').length;
  const privateClients = initialData.filter(c => c.clientType === 'Private' && c.status === 'Active').length;
  const individualClients = initialData.filter(c => c.clientType === 'Individual' && c.status === 'Active').length;

  // Get recently added clients (last 5)
  const recentClients = [...initialData]
    .sort((a, b) => new Date(b.joinDate) - new Date(a.joinDate))
    .slice(0, 5);

  // User menu items
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ];

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
    setTableLoading(true);
    
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

  // Reset all filters
  const handleReset = () => {
    setSearchText('');
    setClientTypeFilter('all');
    setStatusFilter('all');
    setData(initialData);
  };

  // Handle menu click
  const handleMenuClick = (e) => {
    setCurrentPage(e.key);
    if (e.key !== 'onboard') {
      setCurrentStep(0);
      form.resetFields();
    }
  };

  // Show onboard form
  const showOnboardForm = () => {
    setCurrentPage('onboard');
    setCurrentStep(0);
    form.resetFields();
  };

  // Handle view client details
  const handleViewClient = (client) => {
    setSelectedClient(client);
    setCurrentPage('viewClient');
  };

  // Handle next step
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    // form.validateFields().then(() => {
    //   setCurrentStep(currentStep + 1);
    // }).catch((errorInfo) => {
    //   console.log('Validation failed:', errorInfo);
    // });
  };

  // Handle previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle form submission
  const handleOnboardClient = (values) => {
    setTableLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newClientSubmission = {
        id: String(Date.now()), // Unique ID for approval
        ...values, // All form values
        submittedDate: new Date().toISOString().split('T')[0],
        submittedTime: new Date().toLocaleTimeString(),
        status: 'Pending Approval',
        uploadedFiles: { ...uploadedFiles }, // Include uploaded files
        beneficiariesData: beneficiaries.map(ben => ({
          ...ben,
          ...Object.fromEntries(
            Object.entries(values).filter(([key]) => key.startsWith(`ben_${ben.id}_`))
          )
        }))
      };

      // Add to pending approvals
      setPendingApprovals([newClientSubmission, ...pendingApprovals]);
      
      message.success(`${values.clientType} client submitted for approval!`);
      message.info('The submission is now pending approval from an administrator.');
      setCurrentPage('dashboard');
      setCurrentStep(0);
      form.resetFields();
      setBeneficiaries([{ id: 1 }]); // Reset beneficiaries
      setUploadedFiles({}); // Reset uploaded files
      setTableLoading(false);
    }, 1000);
  };

  // Full table columns configuration
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

  // Recent clients table columns (simplified)
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

  // Dashboard content
  const DashboardContent = () => (
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
                value={totalClients}
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
                title={<span style={{ fontSize: '16px', color: '#666' }}>Private Clients</span>}
                value={privateClients}
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
                value={individualClients}
                prefix={<UsergroupAddOutlined style={{ color: '#1890ff' }} />}
                valueStyle={{ color: '#1890ff', fontSize: '32px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Recent Clients Table */}
        <div style={{ marginTop: '32px' }}>
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
        </div>
      </div>
    </Spin>
  );

  // Onboard New Client Form (Multi-step)
  // Client Details View Component
  const ClientDetailsView = () => {
    if (!selectedClient) {
      return <div>No client selected</div>;
    }

    const client = selectedClient;
    const [editForm] = Form.useForm();
    const [isEditingPersonal, setIsEditingPersonal] = useState(false);
    const [isEditingNextOfKin, setIsEditingNextOfKin] = useState(false);
    const [editingBeneficiaryId, setEditingBeneficiaryId] = useState(null);

    // Handle Personal Details Save
    const handlePersonalDetailsSave = (values) => {
      // Update the client data
      const updatedClient = { ...selectedClient, ...values };
      setSelectedClient(updatedClient);
      
      // Update in the main data array
      const updatedData = data.map(item => 
        item.key === selectedClient.key ? updatedClient : item
      );
      setData(updatedData);
      
      message.success('Personal details updated successfully!');
      setIsEditingPersonal(false);
    };

    // Handle Next of Kin Save
    const handleNextOfKinSave = (values) => {
      const updatedClient = { ...selectedClient, ...values };
      setSelectedClient(updatedClient);
      
      const updatedData = data.map(item => 
        item.key === selectedClient.key ? updatedClient : item
      );
      setData(updatedData);
      
      message.success('Next of Kin details updated successfully!');
      setIsEditingNextOfKin(false);
    };

    // Handle Beneficiary Save
    const handleBeneficiarySave = (beneficiaryId, values) => {
      // Update beneficiary in client data
      const updatedBeneficiaries = (selectedClient.beneficiaries || []).map(ben =>
        ben.id === beneficiaryId ? { ...ben, ...values } : ben
      );
      
      const updatedClient = { ...selectedClient, beneficiaries: updatedBeneficiaries };
      setSelectedClient(updatedClient);
      
      const updatedData = data.map(item => 
        item.key === selectedClient.key ? updatedClient : item
      );
      setData(updatedData);
      
      message.success('Beneficiary updated successfully!');
      setEditingBeneficiaryId(null);
    };

    // Personal Details Tab Content
    const PersonalDetailsTab = () => {
      // Initialize form with current values when editing starts
      useEffect(() => {
        if (isEditingPersonal) {
          editForm.setFieldsValue({
            title: client.title || 'Mr.',
            firstName: client.firstName || client.name.split(' ')[0],
            middleName: client.middleName || '',
            lastName: client.lastName || client.name.split(' ').slice(1).join(' '),
            gender: client.gender || '',
            dateOfBirth: client.dateOfBirth || '',
            occupation: client.occupation || '',
            email: client.email,
            phone: client.phone,
            mobileNumber2: client.mobileNumber2 || '',
            bvn: client.bvn || '',
            identificationType: client.identificationType || '',
            address: client.address || '',
            country: client.country || '',
            stateOfResidency: client.stateOfResidency || '',
            riskClassification: client.riskClassification || 'Low',
            pepStatus: client.pepStatus || 'Non-PEP'
          });
        }
      }, [isEditingPersonal]);

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              Personal Information
            </h4>
            {!isEditingPersonal ? (
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => setIsEditingPersonal(true)}
              >
                Edit
              </Button>
            ) : (
              <Space>
                <Button onClick={() => setIsEditingPersonal(false)}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={() => editForm.submit()}
                >
                  Save
                </Button>
              </Space>
            )}
          </div>

          {isEditingPersonal ? (
            <Form
              form={editForm}
              layout="vertical"
              onFinish={handlePersonalDetailsSave}
            >
              <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                Personal Information
              </h5>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Title" name="title">
                    <Select>
                      <Select.Option value="Mr.">Mr.</Select.Option>
                      <Select.Option value="Mrs.">Mrs.</Select.Option>
                      <Select.Option value="Miss">Miss</Select.Option>
                      <Select.Option value="Dr.">Dr.</Select.Option>
                      <Select.Option value="Prof.">Prof.</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Middle Name" name="middleName">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Gender" name="gender">
                    <Select>
                      <Select.Option value="Male">Male</Select.Option>
                      <Select.Option value="Female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Date of Birth" name="dateOfBirth">
                    <Input type="date" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Occupation" name="occupation">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Mobile Number 1" name="phone" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Mobile Number 2" name="mobileNumber2">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="BVN" name="bvn">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Identification Type" name="identificationType">
                    <Select>
                      <Select.Option value="NIN">NIN</Select.Option>
                      <Select.Option value="Driver's License">Driver's License</Select.Option>
                      <Select.Option value="Passport">Passport</Select.Option>
                      <Select.Option value="Voter's Card">Voter's Card</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Address Information
                </h5>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Address" name="address">
                      <Input.TextArea rows={2} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="Country" name="country">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <Form.Item label="State" name="stateOfResidency">
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Compliance Information
                </h5>
                <Row gutter={[24, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item label="Risk Classification" name="riskClassification">
                      <Select>
                        <Select.Option value="Low">Low</Select.Option>
                        <Select.Option value="Medium">Medium</Select.Option>
                        <Select.Option value="High">High</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Form.Item label="PEP Status" name="pepStatus">
                      <Select>
                        <Select.Option value="Non-PEP">Non-PEP</Select.Option>
                        <Select.Option value="PEP">PEP</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </Form>
          ) : (
            // View Mode - existing display code
            <>
              <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                Personal Information
              </h5>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Title</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.title || 'Mr.'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>First Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.firstName || client.name.split(' ')[0]}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Middle Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.middleName || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Last Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.lastName || client.name.split(' ').slice(1).join(' ')}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Gender</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.gender || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Date of Birth</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.dateOfBirth || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Occupation</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.occupation || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.email}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Mobile Number 1</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.phone}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Mobile Number 2</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.mobileNumber2 || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>BVN</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.bvn || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Identification Type</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.identificationType || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                    </div>
                  </div>
                </Col>
              </Row>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Address Information
                </h5>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Address</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.address || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Country</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.country || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={6}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>State</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.stateOfResidency || <span style={{ color: '#bfbfbf' }}>N/A</span>}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>

              <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #f0f0f0' }}>
                <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>
                  Compliance Information
                </h5>
                <Row gutter={[24, 16]}>
                  <Col xs={24} sm={12} md={8}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Risk Classification</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        <Tag color={client.riskClassification === 'High' ? 'red' : client.riskClassification === 'Medium' ? 'orange' : 'green'}>
                          {client.riskClassification || 'Low'}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>PEP Status</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        <Tag color={client.pepStatus === 'PEP' ? 'red' : 'green'}>
                          {client.pepStatus || 'Non-PEP'}
                        </Tag>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Join Date</div>
                      <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                        {client.joinDate}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Card>
      );
    };

    // Next of Kin Tab Content
    const NextOfKinTab = () => {
      const [nextOfKinForm] = Form.useForm();

      // Initialize form when editing starts
      useEffect(() => {
        if (isEditingNextOfKin) {
          nextOfKinForm.setFieldsValue({
            nextOfKinName: client.nextOfKinName || '',
            nextOfKinRelationship: client.nextOfKinRelationship || '',
            nextOfKinPhone: client.nextOfKinPhone || '',
            nextOfKinEmail: client.nextOfKinEmail || '',
            nextOfKinAddress: client.nextOfKinAddress || ''
          });
        }
      }, [isEditingNextOfKin]);

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              Next of Kin Information
            </h4>
            {!isEditingNextOfKin ? (
              <Button 
                type="primary" 
                icon={<EditOutlined />}
                onClick={() => setIsEditingNextOfKin(true)}
              >
                Edit
              </Button>
            ) : (
              <Space>
                <Button onClick={() => setIsEditingNextOfKin(false)}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  onClick={() => nextOfKinForm.submit()}
                >
                  Save
                </Button>
              </Space>
            )}
          </div>

          {isEditingNextOfKin ? (
            <Form
              form={nextOfKinForm}
              layout="vertical"
              onFinish={handleNextOfKinSave}
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Full Name" name="nextOfKinName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Relationship" name="nextOfKinRelationship" rules={[{ required: true }]}>
                    <Select>
                      <Select.Option value="Spouse">Spouse</Select.Option>
                      <Select.Option value="Father">Father</Select.Option>
                      <Select.Option value="Mother">Mother</Select.Option>
                      <Select.Option value="Son">Son</Select.Option>
                      <Select.Option value="Daughter">Daughter</Select.Option>
                      <Select.Option value="Brother">Brother</Select.Option>
                      <Select.Option value="Sister">Sister</Select.Option>
                      <Select.Option value="Friend">Friend</Select.Option>
                      <Select.Option value="Other">Other</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Form.Item label="Phone Number" name="nextOfKinPhone" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Email" name="nextOfKinEmail" rules={[{ type: 'email' }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Address" name="nextOfKinAddress">
                    <Input.TextArea rows={2} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          ) : (
            // View Mode
            <>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Full Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinName || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Relationship</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinRelationship || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Phone Number</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinPhone || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinEmail || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Address</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {client.nextOfKinAddress || <span style={{ color: '#bfbfbf' }}>Not provided</span>}
                    </div>
                  </div>
                </Col>
              </Row>

              <div style={{
                background: '#f0f5ff',
                padding: '16px',
                borderRadius: '6px',
                marginTop: '24px',
                border: '1px solid #d6e4ff'
              }}>
                <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
                  <strong>Note:</strong> Next of kin information is used for emergency contact purposes and will be notified in case of any urgent matters.
                </p>
              </div>
            </>
          )}
        </Card>
      );
    };

    // Beneficiaries Tab Content
    const BeneficiariesTab = () => {
      const [beneficiaryForm] = Form.useForm();
      
      // Mock beneficiaries data - in real app, this would come from the client record
      const beneficiaries = client.beneficiaries || [
        { id: 1, name: 'Jane Doe', relationship: 'Daughter', percentage: '40%', phone: '+234-803-111-2222' },
        { id: 2, name: 'John Doe Jr.', relationship: 'Son', percentage: '35%', phone: '+234-803-333-4444' },
        { id: 3, name: 'Mary Doe', relationship: 'Sister', percentage: '25%', phone: '+234-803-555-6666' }
      ];

      // Initialize form when editing a beneficiary
      const handleEdit = (beneficiary) => {
        setEditingBeneficiaryId(beneficiary.id);
        beneficiaryForm.setFieldsValue({
          name: beneficiary.name,
          relationship: beneficiary.relationship,
          percentage: beneficiary.percentage.replace('%', ''),
          phone: beneficiary.phone
        });
      };

      const handleCancelEdit = () => {
        setEditingBeneficiaryId(null);
        beneficiaryForm.resetFields();
      };

      const handleSaveBeneficiary = (values) => {
        handleBeneficiarySave(editingBeneficiaryId, {
          ...values,
          percentage: values.percentage + '%'
        });
      };

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              Beneficiaries List ({beneficiaries.length})
            </h4>
            <Button type="primary" icon={<PlusOutlined />} size="small">
              Add Beneficiary
            </Button>
          </div>

          {beneficiaries.length === 0 ? (
            <div style={{
              background: '#fafafa',
              padding: '48px',
              textAlign: 'center',
              borderRadius: '8px',
              border: '2px dashed #d9d9d9'
            }}>
              <TeamOutlined style={{ fontSize: '48px', color: '#bfbfbf', marginBottom: '12px' }} />
              <p style={{ color: '#999', margin: 0 }}>No beneficiaries added yet</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {beneficiaries.map((beneficiary, index) => (
                <Card 
                  key={beneficiary.id}
                  size="small"
                  style={{ 
                    background: editingBeneficiaryId === beneficiary.id ? '#f0f5ff' : '#fafafa',
                    border: editingBeneficiaryId === beneficiary.id ? '2px solid #1890ff' : '1px solid #e8e8e8'
                  }}
                >
                  {editingBeneficiaryId === beneficiary.id ? (
                    // Edit Mode
                    <Form
                      form={beneficiaryForm}
                      layout="vertical"
                      onFinish={handleSaveBeneficiary}
                    >
                      <Row gutter={[16, 12]}>
                        <Col xs={24} sm={12} md={6}>
                          <Form.Item label="Name" name="name" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={6} md={5}>
                          <Form.Item label="Relationship" name="relationship" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Select>
                              <Select.Option value="Spouse">Spouse</Select.Option>
                              <Select.Option value="Son">Son</Select.Option>
                              <Select.Option value="Daughter">Daughter</Select.Option>
                              <Select.Option value="Father">Father</Select.Option>
                              <Select.Option value="Mother">Mother</Select.Option>
                              <Select.Option value="Brother">Brother</Select.Option>
                              <Select.Option value="Sister">Sister</Select.Option>
                              <Select.Option value="Other">Other</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={6} md={4}>
                          <Form.Item label="Percentage" name="percentage" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Input type="number" min="0" max="100" suffix="%" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                          <Form.Item label="Phone" name="phone" rules={[{ required: true }]} style={{ marginBottom: '8px' }}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', paddingBottom: '8px' }}>
                          <Space>
                            <Button size="small" onClick={handleCancelEdit}>
                              Cancel
                            </Button>
                            <Button type="primary" size="small" icon={<CheckOutlined />} htmlType="submit">
                              Save
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    // View Mode
                    <Row gutter={[16, 12]}>
                      <Col xs={24} sm={12} md={6}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Beneficiary {index + 1}</div>
                          <div style={{ fontSize: '15px', fontWeight: '600', color: '#262626' }}>
                            {beneficiary.name}
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} md={5}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Relationship</div>
                          <Tag color="blue">{beneficiary.relationship}</Tag>
                        </div>
                      </Col>
                      <Col xs={12} sm={6} md={4}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Percentage</div>
                          <div style={{ fontSize: '15px', fontWeight: '500', color: '#1890ff' }}>
                            {beneficiary.percentage}
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} sm={12} md={6}>
                        <div style={{ marginBottom: '8px' }}>
                          <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Phone</div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                            {beneficiary.phone}
                          </div>
                        </div>
                      </Col>
                      <Col xs={24} md={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Space>
                          <Button 
                            type="link" 
                            icon={<EditOutlined />} 
                            size="small"
                            onClick={() => handleEdit(beneficiary)}
                          >
                            Edit
                          </Button>
                          <Button type="link" danger icon={<DeleteOutlined />} size="small">Remove</Button>
                        </Space>
                      </Col>
                    </Row>
                  )}
                </Card>
              ))}
            </div>
          )}

          <div style={{
            background: '#f0f5ff',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '24px',
            border: '1px solid #d6e4ff'
          }}>
            <p style={{ color: '#666', margin: 0, fontSize: '13px' }}>
              <strong>Total Distribution:</strong> {beneficiaries.reduce((acc, b) => acc + parseInt(b.percentage), 0)}%
              {beneficiaries.reduce((acc, b) => acc + parseInt(b.percentage), 0) === 100 ? 
                ' ✓ Complete' : ' ⚠️ Incomplete - Total should be 100%'}
            </p>
          </div>
        </Card>
      );
    };

    // Products Tab Content
    const ProductsTab = () => (
      <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', margin: 0 }}>
            Subscribed Products
          </h4>
        </div>

        <Card
          size="small"
          style={{ 
            background: '#fafafa',
            border: '2px solid #e8e8e8',
            marginBottom: '16px'
          }}
        >
          <Row gutter={[16, 12]}>
            <Col xs={24} md={8}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Product Name</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1890ff' }}>
                  {client.product || 'No product assigned'}
                </div>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Status</div>
                <Tag color="green">Active</Tag>
              </div>
            </Col>
            <Col xs={12} md={5}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ color: '#8c8c8c', fontSize: '12px', marginBottom: '4px' }}>Start Date</div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                  {client.joinDate}
                </div>
              </div>
            </Col>
            <Col xs={24} md={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Button type="link" icon={<EyeOutlined />}>View Details</Button>
            </Col>
          </Row>
        </Card>

        <div style={{
          background: '#f9f9f9',
          padding: '32px',
          textAlign: 'center',
          borderRadius: '6px',
          border: '2px dashed #d9d9d9',
          marginTop: '24px'
        }}>
          <ShoppingOutlined style={{ fontSize: '48px', color: '#bfbfbf', marginBottom: '12px' }} />
          <p style={{ color: '#999', margin: '0 0 16px 0', fontSize: '14px' }}>
            Want to add more products?
          </p>
          <Button type="primary" icon={<PlusOutlined />}>
            Add Product
          </Button>
        </div>
      </Card>
    );

    // Uploaded Documents Tab Content
    const DocumentsTab = () => {
      const documents = [
        { name: 'Passport Photograph', uploaded: true, date: '2024-01-15', size: '2.3 MB' },
        { name: 'Identification Document', uploaded: true, date: '2024-01-15', size: '1.8 MB' },
        { name: 'Proof of Address', uploaded: true, date: '2024-01-16', size: '3.1 MB' },
        { name: 'Sanction Screening', uploaded: true, date: '2024-01-16', size: '456 KB' },
        { name: 'Adverse Media Search', uploaded: false, date: null, size: null },
        { name: 'Appointment Letter', uploaded: true, date: '2024-01-17', size: '1.2 MB' }
      ];

      return (
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '24px' }}>
            Required Documents
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {documents.map((doc, index) => (
              <Card
                key={index}
                size="small"
                style={{
                  background: doc.uploaded ? '#f6ffed' : '#fff2e8',
                  border: doc.uploaded ? '1px solid #b7eb8f' : '1px solid #ffd591'
                }}
              >
                <Row gutter={[16, 8]} align="middle">
                  <Col flex="none">
                    {doc.uploaded ? (
                      <CheckCircleOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                    ) : (
                      <CloseCircleOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                    )}
                  </Col>
                  <Col flex="auto">
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {doc.name}
                    </div>
                    {doc.uploaded && (
                      <div style={{ fontSize: '12px', color: '#8c8c8c' }}>
                        Uploaded on {doc.date} • {doc.size}
                      </div>
                    )}
                    {!doc.uploaded && (
                      <div style={{ fontSize: '12px', color: '#d46b08' }}>
                        Not uploaded yet
                      </div>
                    )}
                  </Col>
                  <Col flex="none">
                    {doc.uploaded ? (
                      <Space>
                        <Button type="link" icon={<EyeOutlined />} size="small">View</Button>
                        <Button type="link" icon={<DownloadOutlined />} size="small">Download</Button>
                      </Space>
                    ) : (
                      <Button type="primary" icon={<UploadOutlined />} size="small">Upload</Button>
                    )}
                  </Col>
                </Row>
              </Card>
            ))}
          </div>

          <div style={{
            background: '#f0f5ff',
            padding: '16px',
            borderRadius: '6px',
            marginTop: '24px',
            border: '1px solid #d6e4ff'
          }}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  <strong>Uploaded:</strong> {documents.filter(d => d.uploaded).length} of {documents.length}
                </div>
              </Col>
              <Col span={12} style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  <strong>Completion:</strong> {Math.round((documents.filter(d => d.uploaded).length / documents.length) * 100)}%
                </div>
              </Col>
            </Row>
          </div>
        </Card>
      );
    };

    // Define tabs for Individual client
    // Corporate Tabs Configuration
    const corporateTabs = [
      {
        key: '1',
        label: (
          <span>
            <IdcardOutlined /> Company Details
          </span>
        ),
        children: <PersonalDetailsTab /> // Reuse for company info
      },
      {
        key: '2',
        label: (
          <span>
            <ContactsOutlined /> Contact Person
          </span>
        ),
        children: <NextOfKinTab /> // Reuse for contact person
      },
      {
        key: '3',
        label: (
          <span>
            <ShoppingOutlined /> Products
          </span>
        ),
        children: <ProductsTab />
      },
      {
        key: '4',
        label: (
          <span>
            <FolderOutlined /> Documents
          </span>
        ),
        children: <DocumentsTab />
      }
    ];

    // Individual Tabs Configuration
    const individualTabs = [
      {
        key: '1',
        label: (
          <span>
            <UserOutlined /> Personal Details
          </span>
        ),
        children: <PersonalDetailsTab />
      },
      {
        key: '2',
        label: (
          <span>
            <HeartOutlined /> Next of Kin
          </span>
        ),
        children: <NextOfKinTab />
      },
      {
        key: '3',
        label: (
          <span>
            <TeamOutlined /> Beneficiaries
          </span>
        ),
        children: <BeneficiariesTab />
      },
      {
        key: '4',
        label: (
          <span>
            <ShoppingOutlined /> Products
          </span>
        ),
        children: <ProductsTab />
      },
      {
        key: '5',
        label: (
          <span>
            <FolderOutlined /> Documents
          </span>
        ),
        children: <DocumentsTab />
      }
    ];

    return (
      <div style={{
        background: '#f0f5ff',
        minHeight: 'calc(100vh - 120px)',
        padding: '40px'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setCurrentPage('clients')}
            >
              Back to Clients
            </Button>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ 
                color: '#1890ff', 
                fontSize: '28px',
                fontWeight: '600',
                margin: '0 0 12px 0'
              }}>
                {client.name}
              </h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Tag color={client.clientType === 'Corporate' ? 'blue' : 'cyan'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {client.clientType}
                </Tag>
                <Tag color={client.status === 'Active' ? 'green' : 'default'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {client.status}
                </Tag>
                <Tag color="purple" style={{ fontSize: '14px', padding: '4px 12px' }}>
                  ID: {client.key}
                </Tag>
              </div>
            </div>
            
            <Space>
              <Button type="primary" icon={<EditOutlined />}>
                Edit Client
              </Button>
            </Space>
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '24px'
        }}>
          <Tabs 
            defaultActiveKey="1" 
            items={client.clientType === 'Individual' ? individualTabs : corporateTabs}
            size="large"
          />
        </div>
      </div>
    );
  };

  const OnboardFormContent = () => {
    const steps = [
      {
        title: 'Client Type',
        icon: <UserOutlined />,
      },
      {
        title: 'Select Product',
        icon: <IdcardOutlined />,
      },
      {
        title: 'Client Details',
        icon: <UsergroupAddOutlined />,
      },
      {
        title: 'Upload Documents',
        icon: <FileTextOutlined />,
      },
      {
        title: 'Add Beneficiaries',
        icon: <TeamOutlined />,
      },
      {
        title: 'Review & Submit',
        icon: <CheckOutlined />,
      },
    ];

    // Step 1: Client Type Selection
    const Step1Content = () => (
      <div>
        <h3 style={{ 
          color: '#1890ff', 
          fontSize: '20px', 
          marginBottom: '24px',
          fontWeight: '600'
        }}>
          Select Client Type
        </h3>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
          Choose whether this is an individual or corporate client
        </p>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Client Type</span>}
              name="clientType"
              rules={[
                { required: true, message: 'Please select client type' }
              ]}
            >
              <Select 
                placeholder="Select client type" 
                size="large"
                style={{ fontSize: '15px' }}
                onChange={() => {
                  // Reset product selection when client type changes
                  form.setFieldsValue({ product: undefined });
                }}
              >
                <Option value="Individual">
                  <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>Individual</span>
                  </Space>
                </Option>
                <Option value="Corporate">
                  <Space>
                    <TeamOutlined style={{ color: '#1890ff' }} />
                    <span>Corporate</span>
                  </Space>
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>
    );

    // Step 2: Product Selection
    const Step2Content = () => {
      const clientType = form.getFieldValue('clientType');
      
      // Define products based on client type
      const corporateProducts = [
        'Facility Agency',
        'Security Trust',
        'Escrow Agency',
        'Bond Trust',
        'Employee Share Option Plan (ESOP)/LTIP',
        'Collective Investment Scheme (CIS)',
        'Bespoke',
        'Stanbic IBTC Education Trust (SET)',
        'Private Trust'
      ];

      const individualProducts = [
        'Simple Will',
        'Comprehensive Will',
        'Stanbic IBTC Education Trust (SET)',
        'Private Trust',
        'Escrow Agency'
      ];

      const availableProducts = clientType === 'Corporate' ? corporateProducts : individualProducts;

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Select Product
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Choose the product you want to onboard this {clientType?.toLowerCase() || 'client'} for
          </p>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Product</span>}
                name="product"
                rules={[
                  { required: true, message: 'Please select a product' }
                ]}
              >
                <Select 
                  placeholder="Select product" 
                  size="large"
                  style={{ fontSize: '15px' }}
                  disabled={!clientType}
                >
                  {availableProducts.map(product => (
                    <Option key={product} value={product}>
                      {product}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {!clientType && (
            <div style={{
              background: '#fff7e6',
              border: '1px solid #ffd591',
              borderRadius: '6px',
              padding: '12px 16px',
              marginTop: '16px'
            }}>
              <Space>
                <span style={{ color: '#fa8c16' }}>ℹ️</span>
                <span style={{ color: '#ad6800' }}>Please select a client type in Step 1 first</span>
              </Space>
            </div>
          )}

          {clientType && (
            <div style={{
              background: '#f0f5ff',
              padding: '20px',
              borderRadius: '6px',
              border: '1px solid #d6e4ff',
              marginTop: '24px'
            }}>
              <h4 style={{ color: '#1890ff', marginBottom: '12px', fontSize: '15px', fontWeight: '600' }}>
                Available Products for {clientType} Clients
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {availableProducts.map(product => (
                  <Tag key={product} color="blue" style={{ margin: 0, padding: '4px 12px', fontSize: '13px' }}>
                    {product}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    };

    // Step 3: Client Details (based on client type)
    const Step3Content = () => {
      const clientType = form.getFieldValue('clientType');
      const product = form.getFieldValue('product');
      const identificationType = form.getFieldValue('identificationType');
      const nationality = form.getFieldValue('nationality');
      const country = form.getFieldValue('country');

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Client Details
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Enter the {clientType?.toLowerCase() || 'client'} information
          </p>

          {clientType === 'Individual' ? (
            // Individual Client Fields
            <>
              {/* Personal Information */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Personal Information
                </h4>
                
                <Row gutter={24}>
                  <Col xs={24} md={8} lg={4}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Title</span>}
                      name="title"
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Mr">Mr</Option>
                        <Option value="Mrs">Mrs</Option>
                        <Option value="Miss">Miss</Option>
                        <Option value="Dr">Dr</Option>
                        <Option value="Prof">Prof</Option>
                        <Option value="Chief">Chief</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8} lg={7}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>First Name</span>}
                      name="firstName"
                      rules={[
                        { required: true, message: 'Please enter first name' }
                      ]}
                    >
                      <Input 
                        placeholder="First name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8} lg={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Middle Name</span>}
                      name="middleName"
                    >
                      <Input 
                        placeholder="Middle name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12} lg={7}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Last Name</span>}
                      name="lastName"
                      rules={[
                        { required: true, message: 'Please enter last name' }
                      ]}
                    >
                      <Input 
                        placeholder="Last name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Gender</span>}
                      name="gender"
                      rules={[
                        { required: true, message: 'Please select gender' }
                      ]}
                    >
                      <Select 
                        placeholder="Select gender" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Date of Birth</span>}
                      name="dateOfBirth"
                      rules={[
                        { required: true, message: 'Please select date of birth' }
                      ]}
                    >
                      <Input 
                        type="date"
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Occupation</span>}
                      name="occupation"
                      rules={[
                        { required: true, message: 'Please enter occupation' }
                      ]}
                    >
                      <Input 
                        placeholder="Occupation" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Source of Wealth</span>}
                      name="sourceOfWealth"
                      rules={[
                        { required: true, message: 'Please enter source of wealth' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter source of wealth" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Address and Location Information */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Address and Location Information
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Address</span>}
                      name="address"
                      rules={[
                        { required: true, message: 'Please enter address' }
                      ]}
                    >
                      <Input.TextArea 
                        placeholder="Enter residential address" 
                        size="large"
                        rows={3}
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Row gutter={24}>
                      <Col span={12}>
                        <Form.Item
                          label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Country</span>}
                          name="country"
                          initialValue="Nigeria"
                          rules={[
                            { required: true, message: 'Please select country' }
                          ]}
                        >
                          <Select 
                            placeholder="Select country" 
                            size="large"
                            style={{ fontSize: '15px' }}
                            onChange={() => {
                              form.setFieldsValue({ stateOfResidency: undefined, lga: undefined });
                            }}
                          >
                            <Option value="Nigeria">Nigeria</Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={12}>
                        <Form.Item
                          label={<span style={{ fontSize: '15px', fontWeight: '500' }}>City</span>}
                          name="city"
                        >
                          <Input 
                            placeholder="City" 
                            size="large"
                            style={{ fontSize: '15px' }}
                          />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item
                          label={<span style={{ fontSize: '15px', fontWeight: '500' }}>State of Residency</span>}
                          name="stateOfResidency"
                          rules={[
                            { required: true, message: 'Please enter state' }
                          ]}
                        >
                          <Input 
                            placeholder="State of residency" 
                            size="large"
                            style={{ fontSize: '15px' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                        LGA {country === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                      </span>}
                      name="lga"
                      rules={[
                        { required: country === 'Nigeria', message: 'Please enter LGA' }
                      ]}
                    >
                      <Input 
                        placeholder="Local government area" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Proof of Address Type</span>}
                      name="proofOfAddressType"
                      rules={[
                        { required: true, message: 'Please select proof type' }
                      ]}
                    >
                      <Select 
                        placeholder="Select proof type" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Utility Bill">Utility Bill</Option>
                        <Option value="Bank Statement">Bank Statement</Option>
                        <Option value="Drivers Licence">Drivers Licence</Option>
                        <Option value="NIMC">NIMC</Option>
                        <Option value="Address Verification">Address Verification</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Nationality</span>}
                      name="nationality"
                      initialValue="Nigeria"
                      rules={[
                        { required: true, message: 'Please select nationality' }
                      ]}
                    >
                      <Select 
                        placeholder="Select nationality" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        onChange={() => {
                          form.setFieldsValue({ stateOfOrigin: undefined });
                        }}
                      >
                        <Option value="Nigeria">Nigeria</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                        State of Origin {nationality === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                      </span>}
                      name="stateOfOrigin"
                      rules={[
                        { required: nationality === 'Nigeria', message: 'Please enter state of origin' }
                      ]}
                    >
                      <Input 
                        placeholder="State of origin" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Contact and Identification Information */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Contact and Identification Information
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Mobile Number 1</span>}
                      name="mobileNumber1"
                      rules={[
                        { required: true, message: 'Please enter mobile number' }
                      ]}
                    >
                      <Input 
                        placeholder="+234-XXX-XXXX-XXX" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Mobile Number 2</span>}
                      name="mobileNumber2"
                    >
                      <Input 
                        placeholder="+234-XXX-XXXX-XXX" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        placeholder="email@example.com" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>BVN</span>}
                      name="bvn"
                      rules={[
                        { required: true, message: 'Please enter BVN' },
                        { pattern: /^\d{11}$/, message: 'BVN must be 11 digits' }
                      ]}
                    >
                      <Input 
                        placeholder="11-digit BVN" 
                        size="large"
                        maxLength={11}
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Type</span>}
                      name="identificationType"
                      rules={[
                        { required: true, message: 'Please select ID type' }
                      ]}
                    >
                      <Select 
                        placeholder="Select ID type" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        onChange={() => {
                          form.setFieldsValue({ 
                            identificationNumber: undefined,
                            issuingAuthority: undefined,
                            identificationExpiry: undefined
                          });
                        }}
                      >
                        <Option value="NIN">NIN</Option>
                        <Option value="BVN">BVN</Option>
                        <Option value="Permanent Voters Card">Voters Card</Option>
                        <Option value="Drivers Licence">Drivers Licence</Option>
                        <Option value="International Passport">Int'l Passport</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Number</span>}
                      name="identificationNumber"
                      rules={[
                        { required: true, message: 'Please enter ID number' }
                      ]}
                    >
                      <Input 
                        placeholder="ID number" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Issuing Authority</span>}
                      name="issuingAuthority"
                      rules={[
                        { required: true, message: 'Please enter issuing authority' }
                      ]}
                    >
                      <Input 
                        placeholder="Issuing authority" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  {identificationType && !['NIN', 'BVN'].includes(identificationType) && (
                    <Col xs={24} md={8}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Expiry Date</span>}
                        name="identificationExpiry"
                        rules={[
                          { required: true, message: 'Please enter expiry date' }
                        ]}
                      >
                        <Input 
                          type="date"
                          size="large"
                          style={{ fontSize: '15px' }}
                        />
                      </Form.Item>
                    </Col>
                  )}

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>ID Validity</span>}
                      name="identificationValidity"
                      rules={[
                        { required: true, message: 'Please select validity' }
                      ]}
                    >
                      <Select 
                        placeholder="Select validity" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Valid">Valid</Option>
                        <Option value="Invalid">Invalid</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Risk, Compliance and Financial Information */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Risk, Compliance and Financial Information
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Risk Classification</span>}
                      name="riskClassification"
                      rules={[
                        { required: true, message: 'Please select risk' }
                      ]}
                    >
                      <Select 
                        placeholder="Select risk" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Low">Low</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="High">High</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>PEP Status</span>}
                      name="pepStatus"
                      rules={[
                        { required: true, message: 'Please select PEP status' }
                      ]}
                    >
                      <Select 
                        placeholder="Select PEP status" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Non PEP">Non PEP</Option>
                        <Option value="PEP">PEP</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Sanction Status</span>}
                      name="sanctionStatus"
                      rules={[
                        { required: true, message: 'Please select status' }
                      ]}
                    >
                      <Select 
                        placeholder="Select status" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Not Blacklisted">Not Blacklisted</Option>
                        <Option value="Blacklisted">Blacklisted</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Annual Inflow</span>}
                      name="averageAnnualInflow"
                      rules={[
                        { required: true, message: 'Please select income' }
                      ]}
                    >
                      <Select 
                        placeholder="Select range" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Less than ₦1,000,000">&lt; ₦1M</Option>
                        <Option value="₦1,000,000 - ₦5,000,000">₦1M - ₦5M</Option>
                        <Option value="₦5,000,000 - ₦10,000,000">₦5M - ₦10M</Option>
                        <Option value="₦10,000,000 - ₦50,000,000">₦10M - ₦50M</Option>
                        <Option value="Above ₦50,000,000">&gt; ₦50M</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Next of Kin Information */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Next of Kin Information
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>First Name</span>}
                      name="nokFirstName"
                      rules={[
                        { required: true, message: 'Please enter first name' }
                      ]}
                    >
                      <Input 
                        placeholder="First name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Middle Name</span>}
                      name="nokMiddleName"
                    >
                      <Input 
                        placeholder="Middle name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Last Name</span>}
                      name="nokLastName"
                      rules={[
                        { required: true, message: 'Please enter last name' }
                      ]}
                    >
                      <Input 
                        placeholder="Last name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Gender</span>}
                      name="nokGender"
                      rules={[
                        { required: true, message: 'Please select gender' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Mobile Number</span>}
                      name="nokMobileNumber"
                    >
                      <Input 
                        placeholder="+234-XXX-XXXX-XXX" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                      name="nokEmail"
                      rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        placeholder="email@example.com" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Address</span>}
                      name="nokAddress"
                      rules={[
                        { required: true, message: 'Please enter address' }
                      ]}
                    >
                      <Input 
                        placeholder="Address" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Consent and Compliance */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Consent and Compliance
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Data Privacy</span>}
                      name="dataPrivacyConsent"
                      rules={[
                        { required: true, message: 'Required' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Other Products</span>}
                      name="marketingOtherProducts"
                      rules={[
                        { required: true, message: 'Required' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Research Contact</span>}
                      name="marketingResearch"
                      rules={[
                        { required: true, message: 'Required' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>My Offers</span>}
                      name="marketingMyProducts"
                      rules={[
                        { required: true, message: 'Required' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={6}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Share Within Group</span>}
                      name="marketingShareGroup"
                      rules={[
                        { required: true, message: 'Required' }
                      ]}
                    >
                      <Select 
                        placeholder="Select" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </>
          ) : clientType === 'Corporate' ? (
            // Corporate Client Fields
            <>
              {/* Company Information */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Company Information
                </h4>
                
                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Company Name</span>}
                      name="companyName"
                      rules={[
                        { required: true, message: 'Please enter company name' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter company name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>RC Number</span>}
                      name="rcNumber"
                      rules={[
                        { required: true, message: 'Please enter RC number' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter RC number" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>TIN (Tax Identification Number)</span>}
                      name="tin"
                      rules={[
                        { required: true, message: 'Please enter TIN' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter TIN" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Type of Company</span>}
                      name="companyType"
                      rules={[
                        { required: true, message: 'Please select company type' }
                      ]}
                    >
                      <Select 
                        placeholder="Select company type" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Limited Liability">Limited Liability</Option>
                        <Option value="Unlimited Liability">Unlimited Liability</Option>
                        <Option value="Limited by Guarantee">Limited by Guarantee</Option>
                        <Option value="Public Limited Company">Public Limited Company</Option>
                        <Option value="Incorporated Trustee">Incorporated Trustee</Option>
                        <Option value="Sole Proprietorship">Sole Proprietorship</Option>
                        <Option value="Partnership">Partnership</Option>
                        <Option value="Government Entity">Government Entity</Option>
                        <Option value="Embassies and Consulates">Embassies and Consulates</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col span={24}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Company Address</span>}
                      name="address"
                      rules={[
                        { required: true, message: 'Please enter company address' }
                      ]}
                    >
                      <Input.TextArea 
                        placeholder="Enter registered company address" 
                        size="large"
                        rows={3}
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Jurisdiction of Incorporation</span>}
                      name="jurisdiction"
                      initialValue="Nigeria"
                      rules={[
                        { required: true, message: 'Please select jurisdiction' }
                      ]}
                    >
                      <Select 
                        placeholder="Select jurisdiction" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Nigeria">Nigeria</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Proof of Address Type</span>}
                      name="proofOfAddressType"
                      rules={[
                        { required: true, message: 'Please select proof of address type' }
                      ]}
                    >
                      <Select 
                        placeholder="Select proof type" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Utility Bill">Utility Bill</Option>
                        <Option value="Bank Statement">Bank Statement</Option>
                        <Option value="Drivers License">Drivers License</Option>
                        <Option value="NIMC">NIMC</Option>
                        <Option value="Address Verification">Address Verification</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Nature of Business</span>}
                      name="natureOfBusiness"
                      rules={[
                        { required: true, message: 'Please select nature of business' }
                      ]}
                    >
                      <Select 
                        placeholder="Select nature of business" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        showSearch
                        filterOption={(input, option) =>
                          (option?.children ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                      >
                        <Option value="Jewelry">Jewelry</Option>
                        <Option value="Car Dealers">Car Dealers</Option>
                        <Option value="Luxury Goods">Luxury Goods</Option>
                        <Option value="Audit Firms">Audit Firms</Option>
                        <Option value="Tax Consultants">Tax Consultants</Option>
                        <Option value="Clearing and Forwarding">Clearing and Forwarding</Option>
                        <Option value="Hotels">Hotels</Option>
                        <Option value="Casinos">Casinos</Option>
                        <Option value="Supermarkets">Supermarkets</Option>
                        <Option value="Law Firms">Law Firms</Option>
                        <Option value="Accountants">Accountants</Option>
                        <Option value="Trust Services">Trust Services</Option>
                        <Option value="Estate Valuators">Estate Valuators</Option>
                        <Option value="Mortgage Brokers">Mortgage Brokers</Option>
                        <Option value="Real Estate">Real Estate</Option>
                        <Option value="Hospitality">Hospitality</Option>
                        <Option value="Construction">Construction</Option>
                        <Option value="Mechanized Farming">Mechanized Farming</Option>
                        <Option value="Consulting">Consulting</Option>
                        <Option value="Furniture Making">Furniture Making</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Risk Classification</span>}
                      name="riskClassification"
                      rules={[
                        { required: true, message: 'Please select risk classification' }
                      ]}
                    >
                      <Select 
                        placeholder="Select risk classification" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Low">Low</Option>
                        <Option value="Medium">Medium</Option>
                        <Option value="High">High</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Sanction Screening Status</span>}
                      name="sanctionStatus"
                      rules={[
                        { required: true, message: 'Please select sanction status' }
                      ]}
                    >
                      <Select 
                        placeholder="Select sanction status" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Not Blacklisted">Not Blacklisted</Option>
                        <Option value="Blacklisted">Blacklisted</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Contact Person Information */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Contact Person Information
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Title</span>}
                      name="title"
                    >
                      <Select 
                        placeholder="Select title" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Mr">Mr</Option>
                        <Option value="Mrs">Mrs</Option>
                        <Option value="Miss">Miss</Option>
                        <Option value="Dr">Dr</Option>
                        <Option value="Prof">Prof</Option>
                        <Option value="Chief">Chief</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>First Name</span>}
                      name="contactFirstName"
                      rules={[
                        { required: true, message: 'Please enter first name' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter first name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Middle Name</span>}
                      name="contactMiddleName"
                    >
                      <Input 
                        placeholder="Enter middle name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Last Name</span>}
                      name="contactLastName"
                      rules={[
                        { required: true, message: 'Please enter last name' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter last name" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Gender</span>}
                      name="gender"
                      rules={[
                        { required: true, message: 'Please select gender' }
                      ]}
                    >
                      <Select 
                        placeholder="Select gender" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Date of Birth</span>}
                      name="dateOfBirth"
                      rules={[
                        { required: true, message: 'Please select date of birth' }
                      ]}
                    >
                      <Input 
                        type="date"
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Occupation</span>}
                      name="occupation"
                      rules={[
                        { required: true, message: 'Please enter occupation' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter occupation" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Country</span>}
                      name="country"
                      initialValue="Nigeria"
                      rules={[
                        { required: true, message: 'Please select country' }
                      ]}
                    >
                      <Select 
                        placeholder="Select country" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        onChange={() => {
                          // Reset state and LGA when country changes
                          form.setFieldsValue({ stateOfResidency: undefined, lga: undefined });
                        }}
                      >
                        <Option value="Nigeria">Nigeria</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                        State of Residency {country === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                      </span>}
                      name="stateOfResidency"
                      rules={[
                        { required: country === 'Nigeria', message: 'Please enter state of residency' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter state of residency" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        disabled={!country}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                        Local Government Area {country === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                      </span>}
                      name="lga"
                      rules={[
                        { required: country === 'Nigeria', message: 'Please enter LGA' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter local government area" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        disabled={!country}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>City</span>}
                      name="city"
                      rules={[
                        { required: true, message: 'Please enter city' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter city" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Nationality</span>}
                      name="nationality"
                      initialValue="Nigeria"
                      rules={[
                        { required: true, message: 'Please select nationality' }
                      ]}
                    >
                      <Select 
                        placeholder="Select nationality" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        onChange={() => {
                          // Reset state of origin when nationality changes
                          form.setFieldsValue({ stateOfOrigin: undefined });
                        }}
                      >
                        <Option value="Nigeria">Nigeria</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>
                        State of Origin {nationality === 'Nigeria' && <span style={{ color: 'red' }}>*</span>}
                      </span>}
                      name="stateOfOrigin"
                      rules={[
                        { required: nationality === 'Nigeria', message: 'Please enter state of origin' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter state of origin" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        disabled={!nationality}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>PEP Status</span>}
                      name="pepStatus"
                      rules={[
                        { required: true, message: 'Please select PEP status' }
                      ]}
                    >
                      <Select 
                        placeholder="Select PEP status" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Non PEP">Non PEP</Option>
                        <Option value="PEP">PEP</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Source of Wealth</span>}
                      name="sourceOfWealth"
                    >
                      <Input 
                        placeholder="Enter source of wealth" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Type</span>}
                      name="identificationType"
                      rules={[
                        { required: true, message: 'Please select identification type' }
                      ]}
                    >
                      <Select 
                        placeholder="Select identification type" 
                        size="large"
                        style={{ fontSize: '15px' }}
                        onChange={() => {
                          // Reset related fields when ID type changes
                          form.setFieldsValue({ 
                            identificationNumber: undefined,
                            issuingAuthority: undefined,
                            identificationExpiry: undefined
                          });
                        }}
                      >
                        <Option value="NIN">NIN</Option>
                        <Option value="BVN">BVN</Option>
                        <Option value="Voters Card">Voters Card</Option>
                        <Option value="Drivers Licence">Drivers Licence</Option>
                        <Option value="International Passport">International Passport</Option>
                        <Option value="Other">Other</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Number</span>}
                      name="identificationNumber"
                      rules={[
                        { required: true, message: 'Please enter identification number' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter identification number" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Issuing Authority</span>}
                      name="issuingAuthority"
                      rules={[
                        { required: nationality !== 'Nigeria', message: 'Please enter issuing authority' }
                      ]}
                    >
                      <Input 
                        placeholder="Enter issuing authority" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  {identificationType && !['NIN', 'BVN'].includes(identificationType) && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Expiry Date</span>}
                        name="identificationExpiry"
                        rules={[
                          { required: true, message: 'Please enter expiry date' }
                        ]}
                      >
                        <Input 
                          type="date"
                          size="large"
                          style={{ fontSize: '15px' }}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Mobile Number</span>}
                      name="phone"
                      rules={[
                        { required: true, message: 'Please enter mobile number' }
                      ]}
                    >
                      <Input 
                        placeholder="+234-XXX-XXXX-XXX" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Address</span>}
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                    >
                      <Input 
                        placeholder="email@example.com" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Consent and Compliance */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Consent and Compliance
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Data Privacy Consent</span>}
                      name="dataPrivacyConsent"
                      rules={[
                        { required: true, message: 'Please select data privacy consent' }
                      ]}
                    >
                      <Select 
                        placeholder="Select consent" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Email Indemnity</span>}
                      name="emailIndemnity"
                      rules={[
                        { required: true, message: 'Please select email indemnity' }
                      ]}
                    >
                      <Select 
                        placeholder="Select consent" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Marketing - Communicate Other Products</span>}
                      name="marketingOtherProducts"
                      rules={[
                        { required: true, message: 'Please select marketing consent' }
                      ]}
                    >
                      <Select 
                        placeholder="Select consent" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Marketing - Contact for Research</span>}
                      name="marketingResearch"
                      rules={[
                        { required: true, message: 'Please select marketing consent' }
                      ]}
                    >
                      <Select 
                        placeholder="Select consent" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Marketing - My Products and Offers</span>}
                      name="marketingMyProducts"
                      rules={[
                        { required: true, message: 'Please select marketing consent' }
                      ]}
                    >
                      <Select 
                        placeholder="Select consent" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Marketing - Share Within Group</span>}
                      name="marketingShareGroup"
                      rules={[
                        { required: true, message: 'Please select marketing consent' }
                      ]}
                    >
                      <Select 
                        placeholder="Select consent" 
                        size="large"
                        style={{ fontSize: '15px' }}
                      >
                        <Option value="Yes">Yes</Option>
                        <Option value="No">No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            </>
          ) : null}
        </div>
      );
    };

    // Step 4: Document Uploads
    const Step4Content = () => {
      const clientType = form.getFieldValue('clientType');
      const product = form.getFieldValue('product');
      const companyType = form.getFieldValue('companyType');
      const pepStatus = form.getFieldValue('pepStatus');
      const riskClassification = form.getFieldValue('riskClassification');
      const natureOfBusiness = form.getFieldValue('natureOfBusiness');

      // Helper function to check if document is required
      const isDocRequired = (condition) => {
        return condition ? true : false;
      };

      // Check if SCUML is required based on business type
      const scumlBusinessTypes = ['Jewelry', 'Car Dealers', 'Luxury Goods', 'Casinos', 'Real Estate'];
      const isScumlRequired = scumlBusinessTypes.includes(natureOfBusiness);

      // Upload handler
      const handleUpload = (fieldName, info) => {
        const { status, originFileObj } = info.file;
        
        if (status === 'uploading') {
          // Update uploaded files state
          setUploadedFiles(prev => ({
            ...prev,
            [fieldName]: { ...info.file, status: 'uploading' }
          }));
        }
        
        if (status === 'done') {
          message.success(`${info.file.name} uploaded successfully`);
          // Store file in state
          setUploadedFiles(prev => ({
            ...prev,
            [fieldName]: info.file
          }));
          // Update form field
          form.setFieldsValue({ [fieldName]: info.file });
        } else if (status === 'error') {
          message.error(`${info.file.name} upload failed`);
        }
      };

      // Custom upload request (prevents actual upload, just stores file locally)
      const customRequest = ({ file, onSuccess, onError }) => {
        setTimeout(() => {
          onSuccess("ok");
        }, 0);
      };

      // Before upload validation
      const beforeUpload = (file) => {
        const isValidType = file.type === 'application/pdf' || 
                           file.type === 'image/jpeg' || 
                           file.type === 'image/jpg' ||
                           file.type === 'image/png';
        if (!isValidType) {
          message.error('You can only upload PDF, JPG, or PNG files!');
          return false;
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          message.error('File must be smaller than 5MB!');
          return false;
        }
        return true;
      };

      // Render upload component
      const renderUpload = (fieldName, label, helpText = 'PDF, JPG, PNG (Max 5MB)') => {
        const fileList = uploadedFiles[fieldName] ? [uploadedFiles[fieldName]] : [];
        
        return (
          <Upload.Dragger
            name={fieldName}
            fileList={fileList}
            customRequest={customRequest}
            beforeUpload={beforeUpload}
            onChange={(info) => handleUpload(fieldName, info)}
            maxCount={1}
            onRemove={() => {
              setUploadedFiles(prev => {
                const newFiles = { ...prev };
                delete newFiles[fieldName];
                return newFiles;
              });
              form.setFieldsValue({ [fieldName]: undefined });
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
            </p>
            <p className="ant-upload-text" style={{ color: '#262626', fontSize: '15px' }}>
              Click or drag file to upload
            </p>
            <p className="ant-upload-hint" style={{ color: '#999', fontSize: '13px' }}>
              {helpText}
            </p>
          </Upload.Dragger>
        );
      };

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Upload Required Documents
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Upload all required documents for {clientType?.toLowerCase() || 'client'} onboarding
          </p>

          {clientType === 'Corporate' ? (
            // Corporate Document Uploads
            <>
              {/* Company Registration Documents */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Company Registration Documents
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Incorporation Certificate <span style={{ color: 'red' }}>*</span></span>}
                      name="incorporationCertificate"
                      rules={[
                        { required: true, message: 'Please upload incorporation certificate' }
                      ]}
                    >
                      {renderUpload('incorporationCertificate', 'Incorporation Certificate')}
                    </Form.Item>
                  </Col>

                  {['Limited Liability', 'Limited by Guarantee', 'Unlimited Liability', 'Public Limited Company'].includes(companyType) && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Memorandum & Articles of Association <span style={{ color: 'red' }}>*</span></span>}
                        name="memart"
                        rules={[
                          { required: true, message: 'Please upload MEMART' }
                        ]}
                      >
                        {renderUpload('memart', 'Memorandum & Articles of Association')}
                      </Form.Item>
                    </Col>
                  )}

                  {companyType === 'Incorporated Trustee' && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Constitution <span style={{ color: 'red' }}>*</span></span>}
                        name="constitution"
                        rules={[
                          { required: true, message: 'Please upload constitution' }
                        ]}
                      >
                        {renderUpload('constitution', 'Constitution')}
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Company Verification Documents */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Company Verification Documents
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Company Proof of Address <span style={{ color: 'red' }}>*</span></span>}
                      name="companyProofOfAddress"
                      rules={[
                        { required: true, message: 'Please upload proof of address' }
                      ]}
                    >
                      {renderUpload('companyProofOfAddress', 'Company Proof of Address', 'Utility bill, bank statement, etc.')}
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>CAC Status Report <span style={{ color: 'red' }}>*</span></span>}
                      name="cacStatusReport"
                      rules={[
                        { required: !['Government Entity', 'Embassies and Consulates'].includes(companyType), message: 'Please upload CAC status report' }
                      ]}
                    >
                      {renderUpload('cacStatusReport', 'CAC Status Report', 'Director/Shareholders register')}
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Appointment Letter/Authorization <span style={{ color: 'red' }}>*</span></span>}
                      name="appointmentLetter"
                      rules={[
                        { required: true, message: 'Please upload appointment letter' }
                      ]}
                    >
                      {renderUpload('appointmentLetter', 'Appointment Letter', 'Letter of authorization')}
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Legal Search <span style={{ color: 'red' }}>*</span></span>}
                      name="legalSearch"
                      rules={[
                        { required: true, message: 'Please upload legal search' }
                      ]}
                    >
                      {renderUpload('legalSearch', 'Legal Search')}
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              {/* Compliance and Screening Documents */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Compliance and Screening Documents
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Company Sanction Screening <span style={{ color: 'red' }}>*</span></span>}
                      name="companySanctionScreening"
                      rules={[
                        { required: true, message: 'Please upload sanction screening' }
                      ]}
                    >
                      {renderUpload('companySanctionScreening', 'Company Sanction Screening', 'Sanction screening report')}
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Adverse Media Search <span style={{ color: 'red' }}>*</span></span>}
                      name="adverseMediaSearch"
                      rules={[
                        { required: true, message: 'Please upload adverse media search' }
                      ]}
                    >
                      {renderUpload('adverseMediaSearch', 'Adverse Media Search', 'Adverse media report')}
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  {isScumlRequired && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>SCUML Certificate <span style={{ color: 'red' }}>*</span></span>}
                        name="scumlCertificate"
                        rules={[
                          { required: isScumlRequired, message: 'Please upload SCUML certificate' }
                        ]}
                      >
                        {renderUpload('scumlCertificate', 'SCUML Certificate', `Required for ${natureOfBusiness}`)}
                      </Form.Item>
                    </Col>
                  )}

                  {(pepStatus === 'PEP' || riskClassification === 'High') && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Enhanced Due Diligence <span style={{ color: 'red' }}>*</span></span>}
                        name="enhancedDueDiligence"
                        rules={[
                          { required: (pepStatus === 'PEP' || riskClassification === 'High'), message: 'Please upload EDD' }
                        ]}
                      >
                        {renderUpload('enhancedDueDiligence', 'Enhanced Due Diligence', 'Required for PEP/High Risk')}
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Contact Person Documents */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Contact Person Documents
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Document <span style={{ color: 'red' }}>*</span></span>}
                      name="identificationDocument"
                      rules={[
                        { required: true, message: 'Please upload ID document' }
                      ]}
                    >
                      {renderUpload('identificationDocument', 'Identification Document', 'Contact person ID')}
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Contact Person Sanction Screening <span style={{ color: 'red' }}>*</span></span>}
                      name="contactSanctionScreening"
                      rules={[
                        { required: true, message: 'Please upload sanction screening' }
                      ]}
                    >
                      {renderUpload('contactSanctionScreening', 'Contact Person Sanction Screening', 'Sanction screening report')}
                    </Form.Item>
                  </Col>
                </Row>

                {pepStatus === 'PEP' && (
                  <Row gutter={24}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>PEP Approval Document <span style={{ color: 'red' }}>*</span></span>}
                        name="pepApprovalDocument"
                        rules={[
                          { required: pepStatus === 'PEP', message: 'Please upload PEP approval' }
                        ]}
                      >
                        {renderUpload('pepApprovalDocument', 'PEP Approval Document', 'PEP approval required')}
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </div>
            </>
          ) : clientType === 'Individual' ? (
            // Individual document uploads
            <>
              {/* Personal Identification Documents */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Personal Identification Documents
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Passport Photograph <span style={{ color: 'red' }}>*</span></span>}
                      name="passportPhotograph"
                      rules={[
                        { required: true, message: 'Please upload passport photograph' }
                      ]}
                    >
                      {renderUpload('passportPhotograph', 'Passport Photograph', 'JPG, PNG (Max 2MB)')}
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Identification Document <span style={{ color: 'red' }}>*</span></span>}
                      name="identificationDocument"
                      rules={[
                        { required: true, message: 'Please upload ID document' }
                      ]}
                    >
                      {renderUpload('identificationDocument', 'Identification Document', 'NIN, BVN, Passport, etc.')}
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  {['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Proof of Address <span style={{ color: 'red' }}>*</span></span>}
                        name="proofOfAddressDocument"
                        rules={[
                          { required: ['Private Trust', 'Comprehensive Will', 'SET'].includes(product), message: 'Please upload proof of address' }
                        ]}
                      >
                        {renderUpload('proofOfAddressDocument', 'Proof of Address', 'Utility bill, bank statement')}
                      </Form.Item>
                    </Col>
                  )}

                  {['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Appointment Letter <span style={{ color: 'red' }}>*</span></span>}
                        name="appointmentLetter"
                        rules={[
                          { required: ['Private Trust', 'Comprehensive Will', 'SET'].includes(product), message: 'Please upload appointment letter' }
                        ]}
                      >
                        {renderUpload('appointmentLetter', 'Appointment Letter', 'Letter of authorization')}
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Compliance and Screening Documents */}
              <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '2px solid #f0f0f0' }}>
                <h4 style={{ color: '#1890ff', fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Compliance and Screening Documents
                </h4>

                <Row gutter={24}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Sanction Screening <span style={{ color: 'red' }}>*</span></span>}
                      name="sanctionScreening"
                      rules={[
                        { required: true, message: 'Please upload sanction screening' }
                      ]}
                    >
                      {renderUpload('sanctionScreening', 'Sanction Screening', 'Sanction screening report')}
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Adverse Media Search <span style={{ color: 'red' }}>*</span></span>}
                      name="adverseMediaSearch"
                      rules={[
                        { required: true, message: 'Please upload adverse media search' }
                      ]}
                    >
                      {renderUpload('adverseMediaSearch', 'Adverse Media Search', 'Adverse media report')}
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={24}>
                  {pepStatus === 'PEP' && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>PEP Approval Document <span style={{ color: 'red' }}>*</span></span>}
                        name="pepApprovalDocument"
                        rules={[
                          { required: pepStatus === 'PEP', message: 'Please upload PEP approval' }
                        ]}
                      >
                        {renderUpload('pepApprovalDocument', 'PEP Approval Document', 'PEP approval required')}
                      </Form.Item>
                    </Col>
                  )}

                  {['Private Trust', 'SET'].includes(product) && (pepStatus === 'PEP' || riskClassification === 'High') && (
                    <Col xs={24} md={12}>
                      <Form.Item
                        label={<span style={{ fontSize: '15px', fontWeight: '500' }}>Enhanced Due Diligence <span style={{ color: 'red' }}>*</span></span>}
                        name="enhancedDueDiligence"
                        rules={[
                          { required: (pepStatus === 'PEP' || riskClassification === 'High'), message: 'Please upload EDD' }
                        ]}
                      >
                        {renderUpload('enhancedDueDiligence', 'Enhanced Due Diligence', 'Required for PEP/High Risk')}
                      </Form.Item>
                    </Col>
                  )}
                </Row>
              </div>

              {/* Document Requirements Summary */}
              <div style={{
                background: '#f0f5ff',
                padding: '24px',
                borderRadius: '8px',
                border: '2px solid #d6e4ff',
                marginTop: '32px'
              }}>
                <h4 style={{ 
                  color: '#1890ff', 
                  marginBottom: '16px', 
                  fontSize: '15px',
                  fontWeight: '600'
                }}>
                  Document Requirements for {product}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                    <span style={{ color: '#262626', fontSize: '14px' }}>Passport Photograph (All products)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                    <span style={{ color: '#262626', fontSize: '14px' }}>Identification Document (All products)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                    <span style={{ color: '#262626', fontSize: '14px' }}>Sanction Screening (All products)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                    <span style={{ color: '#262626', fontSize: '14px' }}>Adverse Media Search (All products)</span>
                  </div>
                  {['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && (
                    <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                        <span style={{ color: '#262626', fontSize: '14px' }}>Proof of Address (Private Trust, Comprehensive Will, SET)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                        <span style={{ color: '#262626', fontSize: '14px' }}>Appointment Letter (Private Trust, Comprehensive Will, SET)</span>
                      </div>
                    </>
                  )}
                  {pepStatus === 'PEP' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />
                      <span style={{ color: '#262626', fontSize: '14px' }}>PEP Approval Document (Required for PEP)</span>
                    </div>
                  )}
                  {['Private Trust', 'SET'].includes(product) && (pepStatus === 'PEP' || riskClassification === 'High') && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckOutlined style={{ color: '#fa8c16', fontSize: '16px' }} />
                      <span style={{ color: '#262626', fontSize: '14px' }}>Enhanced Due Diligence (Required for PEP/High Risk in Private Trust & SET)</span>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            // No client type selected
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#f9f9f9',
              borderRadius: '8px',
              border: '2px dashed #d9d9d9'
            }}>
              <FileTextOutlined style={{ fontSize: '64px', color: '#bfbfbf', marginBottom: '16px' }} />
              <h4 style={{ color: '#666', marginBottom: '8px' }}>No Client Type Selected</h4>
              <p style={{ color: '#999', margin: 0 }}>Please complete previous steps to see document requirements</p>
            </div>
          )}
        </div>
      );
    };

    // Step 5: Add Beneficiaries (for Individual products only)
    const Step5Content = () => {
      const clientType = form.getFieldValue('clientType');
      const product = form.getFieldValue('product');
      
      // Only show beneficiaries for individual products
      const individualProducts = ['Private Trust', 'Simple Will', 'Comprehensive Will', 'Stanbic IBTC Education Trust (SET)'];
      const shouldShowBeneficiaries = clientType === 'Individual' && individualProducts.includes(product);

      // Handler to add a new beneficiary
      const addBeneficiary = () => {
        const newId = beneficiaries.length > 0 ? Math.max(...beneficiaries.map(b => b.id)) + 1 : 1;
        setBeneficiaries([...beneficiaries, { id: newId }]);
      };

      // Handler to remove a beneficiary
      const removeBeneficiary = (id) => {
        if (beneficiaries.length > 1) {
          setBeneficiaries(beneficiaries.filter(b => b.id !== id));
          // Clean up form fields for removed beneficiary
          const fieldsToRemove = [
            `ben_${id}_title`, `ben_${id}_firstName`, `ben_${id}_middleName`, `ben_${id}_lastName`,
            `ben_${id}_gender`, `ben_${id}_mothersMaidenName`, `ben_${id}_dateOfBirth`,
            `ben_${id}_mobileNumber`, `ben_${id}_identificationType`, `ben_${id}_idNumber`,
            `ben_${id}_issuingAuthority`, `ben_${id}_identificationExpiry`, `ben_${id}_identificationValidity`,
            `ben_${id}_sanctionStatus`, `ben_${id}_bvn`, `ben_${id}_relationship`
          ];
          form.setFields(fieldsToRemove.map(name => ({ name, value: undefined })));
        } else {
          message.warning('At least one beneficiary is required');
        }
      };

      // Render beneficiary form
      const renderBeneficiaryForm = (beneficiary, index) => {
        const identificationType = form.getFieldValue(`ben_${beneficiary.id}_identificationType`);
        
        return (
          <div 
            key={beneficiary.id} 
            style={{ 
              marginBottom: '32px',
              padding: '32px',
              background: index % 2 === 0 ? '#fafafa' : 'white',
              borderRadius: '8px',
              border: '2px solid #e8e8e8',
              position: 'relative'
            }}
          >
            {/* Beneficiary Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '2px solid #1890ff'
            }}>
              <h4 style={{ 
                color: '#1890ff', 
                fontSize: '18px', 
                fontWeight: '600',
                margin: 0
              }}>
                Beneficiary {index + 1}
              </h4>
              {beneficiaries.length > 1 && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeBeneficiary(beneficiary.id)}
                  style={{ fontSize: '16px' }}
                >
                  Remove
                </Button>
              )}
            </div>

            {/* Personal Information */}
            <div style={{ marginBottom: '24px' }}>
              <h5 style={{ color: '#595959', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>
                Personal Information
              </h5>
              
              <Row gutter={24}>
                <Col xs={24} md={6} lg={4}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Title</span>}
                    name={`ben_${beneficiary.id}_title`}
                  >
                    <Select placeholder="Title" size="large">
                      <Option value="Mr">Mr</Option>
                      <Option value="Mrs">Mrs</Option>
                      <Option value="Miss">Miss</Option>
                      <Option value="Master">Master</Option>
                      <Option value="Dr">Dr</Option>
                      <Option value="Prof">Prof</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={9} lg={7}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>First Name <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_firstName`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="First name" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={9} lg={6}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Middle Name</span>}
                    name={`ben_${beneficiary.id}_middleName`}
                  >
                    <Input placeholder="Middle name" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12} lg={7}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Last Name <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_lastName`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Last name" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Gender <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_gender`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select placeholder="Select gender" size="large">
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Date of Birth <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_dateOfBirth`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input type="date" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Mobile Number</span>}
                    name={`ben_${beneficiary.id}_mobileNumber`}
                  >
                    <Input placeholder="+234-XXX-XXXX-XXX" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Mother's Maiden Name</span>}
                    name={`ben_${beneficiary.id}_mothersMaidenName`}
                  >
                    <Input placeholder="Mother's maiden name" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Relationship to Settlor</span>}
                    name={`ben_${beneficiary.id}_relationship`}
                  >
                    <Input placeholder="e.g., Son, Daughter, Spouse" size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Identification Information */}
            <div style={{ marginBottom: '24px', paddingTop: '24px', borderTop: '1px solid #e8e8e8' }}>
              <h5 style={{ color: '#595959', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>
                Identification Information
              </h5>
              
              <Row gutter={24}>
                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Identification Type <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_identificationType`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select 
                      placeholder="Select ID type" 
                      size="large"
                      onChange={() => {
                        form.setFieldsValue({ 
                          [`ben_${beneficiary.id}_idNumber`]: undefined,
                          [`ben_${beneficiary.id}_issuingAuthority`]: undefined,
                          [`ben_${beneficiary.id}_identificationExpiry`]: undefined
                        });
                      }}
                    >
                      <Option value="NIN">NIN</Option>
                      <Option value="BVN">BVN</Option>
                      <Option value="Voters Card">Voters Card</Option>
                      <Option value="International Passport">International Passport</Option>
                      <Option value="Birth Certificate">Birth Certificate</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>ID Number <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_idNumber`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="ID number" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Issuing Authority <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_issuingAuthority`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Issuing authority" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={24}>
                {identificationType && !['NIN', 'BVN', 'Birth Certificate'].includes(identificationType) && (
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '14px', fontWeight: '500' }}>ID Expiry Date <span style={{ color: 'red' }}>*</span></span>}
                      name={`ben_${beneficiary.id}_identificationExpiry`}
                      rules={[{ required: true, message: 'Required' }]}
                    >
                      <Input type="date" size="large" />
                    </Form.Item>
                  </Col>
                )}

                <Col xs={24} md={8}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>ID Validity <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_identificationValidity`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select placeholder="Select validity" size="large">
                      <Option value="Valid">Valid</Option>
                      <Option value="Invalid">Invalid</Option>
                    </Select>
                  </Form.Item>
                </Col>

                {identificationType !== 'BVN' && (
                  <Col xs={24} md={8}>
                    <Form.Item
                      label={<span style={{ fontSize: '14px', fontWeight: '500' }}>BVN</span>}
                      name={`ben_${beneficiary.id}_bvn`}
                    >
                      <Input placeholder="11-digit BVN" size="large" maxLength={11} />
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </div>

            {/* Compliance */}
            <div style={{ paddingTop: '24px', borderTop: '1px solid #e8e8e8' }}>
              <h5 style={{ color: '#595959', fontSize: '15px', fontWeight: '600', marginBottom: '16px' }}>
                Compliance
              </h5>
              
              <Row gutter={24}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={<span style={{ fontSize: '14px', fontWeight: '500' }}>Sanction Screening Status <span style={{ color: 'red' }}>*</span></span>}
                    name={`ben_${beneficiary.id}_sanctionStatus`}
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Select placeholder="Select status" size="large">
                      <Option value="Not Blacklisted">Not Blacklisted</Option>
                      <Option value="Blacklisted">Blacklisted</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        );
      };

      if (!shouldShowBeneficiaries) {
        return (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#f9f9f9',
            borderRadius: '8px',
            border: '2px dashed #d9d9d9'
          }}>
            <TeamOutlined style={{ fontSize: '64px', color: '#bfbfbf', marginBottom: '16px' }} />
            <h4 style={{ color: '#666', marginBottom: '8px' }}>Beneficiaries Not Applicable</h4>
            <p style={{ color: '#999', margin: 0 }}>
              {clientType === 'Corporate' 
                ? 'Beneficiaries are only applicable to individual clients' 
                : 'Please select an individual product to add beneficiaries'}
            </p>
          </div>
        );
      }

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '20px', 
            marginBottom: '24px',
            fontWeight: '600'
          }}>
            Add Beneficiaries
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Add one or more beneficiaries for this {product}
          </p>

          {/* Beneficiaries List */}
          <div style={{ marginBottom: '32px' }}>
            {beneficiaries.map((beneficiary, index) => renderBeneficiaryForm(beneficiary, index))}
          </div>

          {/* Add Beneficiary Button */}
          <Button
            type="dashed"
            icon={<PlusCircleOutlined />}
            onClick={addBeneficiary}
            size="large"
            style={{
              width: '100%',
              height: '60px',
              fontSize: '16px',
              borderColor: '#1890ff',
              color: '#1890ff'
            }}
          >
            Add Another Beneficiary
          </Button>

          {/* Summary */}
          <div style={{
            background: '#f0f5ff',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #d6e4ff',
            marginTop: '32px'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              marginBottom: '12px', 
              fontSize: '15px',
              fontWeight: '600'
            }}>
              Summary
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TeamOutlined style={{ color: '#1890ff', fontSize: '20px' }} />
              <span style={{ color: '#262626', fontSize: '15px' }}>
                <strong>{beneficiaries.length}</strong> {beneficiaries.length === 1 ? 'Beneficiary' : 'Beneficiaries'} added
              </span>
            </div>
          </div>
        </div>
      );
    };

    // Step 6: Review & Submit
    const Step6Content = () => {
      const clientType = form.getFieldValue('clientType');
      const product = form.getFieldValue('product');
      const companyType = form.getFieldValue('companyType');
      
      // Helper to check if a field has value
      const hasValue = (fieldName) => {
        const value = form.getFieldValue(fieldName);
        return value !== undefined && value !== null && value !== '';
      };

      // Helper to display field value
      const displayValue = (fieldName, defaultText = 'Not provided') => {
        const value = form.getFieldValue(fieldName);
        if (value === undefined || value === null || value === '') {
          return <span style={{ color: '#bfbfbf' }}>{defaultText}</span>;
        }
        return <span style={{ color: '#262626' }}>{value}</span>;
      };

      // Helper to render document status
      const renderDocStatus = (fieldName, label) => {
        const hasDoc = hasValue(fieldName);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            {hasDoc ? (
              <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '18px' }} />
            ) : (
              <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '18px' }} />
            )}
            <span style={{ color: hasDoc ? '#262626' : '#999', fontSize: '14px' }}>
              {label}
            </span>
          </div>
        );
      };

      return (
        <div>
          <h3 style={{ 
            color: '#1890ff', 
            fontSize: '24px', 
            marginBottom: '16px',
            fontWeight: '600'
          }}>
            Review Your Information
          </h3>
          <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>
            Please review all information before submitting. You can go back to edit any section.
          </p>

          {/* Step 1 & 2: Client Type and Product */}
          <div style={{ 
            marginBottom: '32px',
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #e8e8e8'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <UserOutlined /> Client Type & Product Selection
            </h4>
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Client Type</div>
                  <div style={{ fontSize: '15px', fontWeight: '500' }}>
                    {displayValue('clientType')}
                  </div>
                </div>
              </Col>
              <Col xs={24} md={12}>
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ color: '#8c8c8c', fontSize: '13px', marginBottom: '4px' }}>Selected Product</div>
                  <div style={{ fontSize: '15px', fontWeight: '500' }}>
                    {displayValue('product')}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          {/* Step 3: Client Details */}
          <div style={{ 
            marginBottom: '32px',
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #e8e8e8'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <IdcardOutlined /> Client Details
            </h4>

            {clientType === 'Individual' ? (
              // Individual Client Review
              <>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Personal Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Full Name</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>
                        {displayValue('title', '')} {displayValue('firstName', '')} {displayValue('middleName', '')} {displayValue('lastName', 'N/A')}
                      </div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Gender</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('gender')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Date of Birth</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('dateOfBirth')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Occupation</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('occupation')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Contact Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Email</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('email')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Mobile 1</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('mobileNumber1')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Mobile 2</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('mobileNumber2')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Address Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={24} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Address</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('address')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Country</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('country')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>State</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('stateOfResidency')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Compliance Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>BVN</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('bvn')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>ID Type</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('identificationType')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Risk Classification</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('riskClassification')}</div>
                    </Col>
                    <Col xs={12} md={6}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>PEP Status</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('pepStatus')}</div>
                    </Col>
                  </Row>
                </div>
              </>
            ) : (
              // Corporate Client Review
              <>
                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Company Information
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Company Name</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('companyName')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>RC Number</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('rcNumber')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>TIN</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('tin')}</div>
                    </Col>
                    <Col xs={12} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Company Type</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('companyType')}</div>
                    </Col>
                    <Col xs={12} md={12}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Nature of Business</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('natureOfBusiness')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0f0f0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Contact Person
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Name</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>
                        {displayValue('contactFirstName', '')} {displayValue('contactMiddleName', '')} {displayValue('contactLastName', 'N/A')}
                      </div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Email</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('email')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Phone</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('phone')}</div>
                    </Col>
                  </Row>
                </div>

                <div style={{ marginBottom: '0' }}>
                  <h5 style={{ color: '#595959', fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>
                    Compliance
                  </h5>
                  <Row gutter={[16, 12]}>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Risk Classification</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('riskClassification')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>Sanction Status</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('sanctionStatus')}</div>
                    </Col>
                    <Col xs={12} md={8}>
                      <div style={{ color: '#8c8c8c', fontSize: '12px' }}>PEP Status</div>
                      <div style={{ fontSize: '14px', fontWeight: '500' }}>{displayValue('pepStatus')}</div>
                    </Col>
                  </Row>
                </div>
              </>
            )}
          </div>

          {/* Step 4: Documents */}
          <div style={{ 
            marginBottom: '32px',
            background: 'white',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #e8e8e8'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              fontSize: '16px', 
              fontWeight: '600', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <FileTextOutlined /> Document Uploads
            </h4>

            {clientType === 'Corporate' ? (
              <div>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    {renderDocStatus('incorporationCertificate', 'Incorporation Certificate')}
                    {['Limited Liability', 'Limited by Guarantee', 'Unlimited Liability', 'Public Limited Company'].includes(companyType) && 
                      renderDocStatus('memart', 'Memorandum & Articles of Association')}
                    {companyType === 'Incorporated Trustee' && 
                      renderDocStatus('constitution', 'Constitution')}
                    {renderDocStatus('companyProofOfAddress', 'Company Proof of Address')}
                    {renderDocStatus('cacStatusReport', 'CAC Status Report')}
                    {renderDocStatus('appointmentLetter', 'Appointment Letter')}
                    {renderDocStatus('legalSearch', 'Legal Search')}
                  </Col>
                  <Col xs={24} md={12}>
                    {renderDocStatus('companySanctionScreening', 'Company Sanction Screening')}
                    {renderDocStatus('adverseMediaSearch', 'Adverse Media Search')}
                    {renderDocStatus('identificationDocument', 'Identification Document')}
                    {renderDocStatus('contactSanctionScreening', 'Contact Person Sanction Screening')}
                  </Col>
                </Row>
              </div>
            ) : (
              <div>
                <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}>
                    {renderDocStatus('passportPhotograph', 'Passport Photograph')}
                    {renderDocStatus('identificationDocument', 'Identification Document')}
                    {['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && 
                      renderDocStatus('proofOfAddressDocument', 'Proof of Address')}
                    {['Private Trust', 'Comprehensive Will', 'SET'].includes(product) && 
                      renderDocStatus('appointmentLetter', 'Appointment Letter')}
                  </Col>
                  <Col xs={24} md={12}>
                    {renderDocStatus('sanctionScreening', 'Sanction Screening')}
                    {renderDocStatus('adverseMediaSearch', 'Adverse Media Search')}
                  </Col>
                </Row>
              </div>
            )}
          </div>

          {/* Step 5: Beneficiaries */}
          {clientType === 'Individual' && beneficiaries.length > 0 && (
            <div style={{ 
              marginBottom: '32px',
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              border: '2px solid #e8e8e8'
            }}>
              <h4 style={{ 
                color: '#1890ff', 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <TeamOutlined /> Beneficiaries ({beneficiaries.length})
              </h4>

              {beneficiaries.map((beneficiary, index) => {
                const firstName = form.getFieldValue(`ben_${beneficiary.id}_firstName`);
                const lastName = form.getFieldValue(`ben_${beneficiary.id}_lastName`);
                const relationship = form.getFieldValue(`ben_${beneficiary.id}_relationship`);
                
                return (
                  <div 
                    key={beneficiary.id}
                    style={{ 
                      marginBottom: index < beneficiaries.length - 1 ? '16px' : '0',
                      paddingBottom: index < beneficiaries.length - 1 ? '16px' : '0',
                      borderBottom: index < beneficiaries.length - 1 ? '1px solid #f0f0f0' : 'none'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#262626' }}>
                        Beneficiary {index + 1}: {firstName || 'N/A'} {lastName || ''}
                      </span>
                      {relationship && (
                        <Tag color="blue" style={{ marginLeft: '8px' }}>{relationship}</Tag>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Final Summary */}
          <div style={{
            background: '#f0f5ff',
            padding: '24px',
            borderRadius: '8px',
            border: '2px solid #1890ff',
            marginTop: '32px'
          }}>
            <h4 style={{ 
              color: '#1890ff', 
              marginBottom: '16px', 
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircleOutlined /> Ready to Submit
            </h4>
            <p style={{ color: '#262626', margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
              Please review all information above. If everything is correct, click <strong>"Complete Onboarding"</strong> to submit. 
              You can use the <strong>"Previous"</strong> button to go back and make changes to any section.
            </p>
          </div>
        </div>
      );
    };

    return (
      <div style={{
        background: '#f0f5ff',
        minHeight: 'calc(100vh - 120px)',
        padding: '0'
      }}>
        {/* Header Section */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderBottom: '1px solid #e8e8e8'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto'
          }}>
            <h2 style={{ 
              color: '#1890ff', 
              marginBottom: '10px',
              fontSize: '32px',
              fontWeight: '600'
            }}>
              <PlusOutlined style={{ marginRight: '12px' }} />
              Onboard New Client
            </h2>
            <p style={{ 
              color: '#666', 
              fontSize: '16px',
              margin: 0
            }}>
              Complete the following steps to add a new client to the system
            </p>
          </div>
        </div>

        {/* Steps Progress Section */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderBottom: '1px solid #e8e8e8'
        }}>
          <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto'
          }}>
            <Steps
              current={currentStep}
              items={steps}
            />
          </div>
        </div>

        {/* Form Section */}
        <div style={{
          padding: '60px 40px',
          minHeight: '400px'
        }}>
          <div style={{
            background: 'white',
            padding: '60px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleOnboardClient}
            >
              <div style={{ minHeight: '350px' }}>
                {currentStep === 0 && <Step1Content />}
                {currentStep === 1 && <Step2Content />}
                {currentStep === 2 && <Step3Content />}
                {currentStep === 3 && <Step4Content />}
                {currentStep === 4 && <Step5Content />}
                {currentStep === 5 && <Step6Content />}
              </div>

              {/* Navigation Buttons */}
              <Form.Item style={{ marginBottom: 0, marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #f0f0f0' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  <Button 
                    onClick={() => {
                      setCurrentPage('dashboard');
                      setCurrentStep(0);
                      form.resetFields();
                      setBeneficiaries([{ id: 1 }]); // Reset beneficiaries
                      setUploadedFiles({}); // Reset uploaded files
                    }}
                    size="large"
                    style={{ minWidth: '120px' }}
                  >
                    Cancel
                  </Button>

                  <Space size="large">
                    {currentStep > 0 && (
                      <Button 
                        icon={<ArrowLeftOutlined />}
                        onClick={handlePrevious}
                        size="large"
                        style={{ minWidth: '120px' }}
                      >
                        Previous
                      </Button>
                    )}
                    
                    {currentStep < steps.length - 1 && (
                      <Button 
                        type="primary"
                        icon={<ArrowRightOutlined />}
                        iconPosition="end"
                        onClick={handleNext}
                        size="large"
                        style={{
                          background: '#1890ff',
                          borderColor: '#1890ff',
                          minWidth: '120px'
                        }}
                      >
                        Next
                      </Button>
                    )}

                    {currentStep === steps.length - 1 && (
                      <Button 
                        type="primary" 
                        htmlType="submit"
                        loading={tableLoading}
                        icon={<CheckOutlined />}
                        size="large"
                        style={{
                          background: '#1890ff',
                          borderColor: '#1890ff',
                          minWidth: '180px'
                        }}
                      >
                        Complete Onboarding
                      </Button>
                    )}
                  </Space>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  };

  // Client Table content
  const ClientTableContent = () => (
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
              <Option value="all">All Client Types</Option>
              <Option value="Corporate">Corporate</Option>
              <Option value="Private">Private</Option>
              <Option value="Individual">Individual</Option>
            </Select>

            <Select
              value={statusFilter}
              onChange={handleStatusFilter}
              style={{ width: 150 }}
              suffixIcon={<FilterOutlined style={{ color: '#1890ff' }} />}
              disabled={tableLoading}
            >
              <Option value="all">All Status</Option>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
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
            pageSize: 5,
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
  );

  // Approvals Content
  const ApprovalsContent = () => {
    // Handler to view approval details
    const handleViewApproval = (approval) => {
      setSelectedApproval(approval);
      setCurrentPage('approvalDetail');
    };

    // Handler to approve client
    const handleApproveClient = (approval) => {
      const newClient = {
        key: String(initialData.length + data.length + 1),
        name: approval.clientType === 'Corporate' 
          ? approval.companyName 
          : `${approval.firstName} ${approval.lastName}`,
        contactPerson: approval.clientType === 'Corporate' 
          ? `${approval.contactFirstName} ${approval.contactLastName}`
          : `${approval.firstName} ${approval.lastName}`,
        email: approval.email,
        phone: approval.phone || approval.mobileNumber1,
        clientType: approval.clientType,
        product: approval.product,
        status: 'Active',
        joinDate: new Date().toISOString().split('T')[0],
        ...approval // Include all original data
      };

      // Add to active clients
      initialData.unshift(newClient);
      setData([newClient, ...data]);

      // Remove from pending approvals
      setPendingApprovals(pendingApprovals.filter(item => item.id !== approval.id));

      message.success(`Client "${newClient.name}" approved and added to active clients!`);
      setCurrentPage('clients');
    };

    // Handler to reject client
    const handleRejectClient = (approvalId, reason) => {
      setPendingApprovals(pendingApprovals.filter(item => item.id !== approvalId));
      message.warning(`Client submission rejected. Reason: ${reason || 'No reason provided'}`);
    };

    const approvalColumns = [
      {
        title: 'Submitted Date',
        dataIndex: 'submittedDate',
        key: 'submittedDate',
        width: '12%',
        sorter: (a, b) => new Date(a.submittedDate) - new Date(b.submittedDate),
      },
      {
        title: 'Client Name',
        key: 'clientName',
        width: '18%',
        render: (_, record) => (
          <span style={{ fontWeight: '500' }}>
            {record.clientType === 'Corporate' 
              ? record.companyName 
              : `${record.firstName} ${record.lastName}`}
          </span>
        ),
        sorter: (a, b) => {
          const nameA = a.clientType === 'Corporate' ? a.companyName : `${a.firstName} ${a.lastName}`;
          const nameB = b.clientType === 'Corporate' ? b.companyName : `${b.firstName} ${b.lastName}`;
          return nameA.localeCompare(nameB);
        },
      },
      {
        title: 'Client Type',
        dataIndex: 'clientType',
        key: 'clientType',
        width: '12%',
        render: (clientType) => (
          <Tag color={clientType === 'Corporate' ? 'blue' : 'cyan'}>
            {clientType}
          </Tag>
        ),
        filters: [
          { text: 'Individual', value: 'Individual' },
          { text: 'Corporate', value: 'Corporate' },
        ],
        onFilter: (value, record) => record.clientType === value,
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        width: '15%',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '18%',
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        width: '13%',
        render: (status) => (
          <Tag color="orange" icon={<ClockCircleOutlined />}>
            {status}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        width: '12%',
        render: (_, record) => (
          <Space size="small">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => handleViewApproval(record)}
              style={{ padding: '4px 8px' }}
            >
              Review
            </Button>
          </Space>
        ),
      },
    ];

    return (
      <Spin spinning={tableLoading} size="large" tip="Loading approvals...">
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <div>
              <h2 style={{ 
                color: '#1890ff', 
                marginBottom: '8px',
                fontSize: '24px',
                fontWeight: '600'
              }}>
                <CheckCircleFilled style={{ marginRight: '12px' }} />
                Pending Approvals
              </h2>
              <p style={{ color: '#666', margin: 0 }}>
                Review and approve client onboarding submissions
              </p>
            </div>
            <Card bordered={false} style={{ background: '#f0f5ff' }}>
              <Statistic
                title="Pending Reviews"
                value={pendingApprovals.length}
                valueStyle={{ color: '#1890ff', fontSize: '32px' }}
                prefix={<ClockCircleOutlined />}
              />
            </Card>
          </div>

          {pendingApprovals.length === 0 ? (
            <div style={{
              background: '#fafafa',
              padding: '64px',
              textAlign: 'center',
              borderRadius: '8px',
              border: '2px dashed #d9d9d9',
              marginTop: '24px'
            }}>
              <CheckCircleFilled style={{ fontSize: '64px', color: '#52c41a', marginBottom: '16px' }} />
              <h3 style={{ color: '#595959', marginBottom: '8px' }}>All Caught Up!</h3>
              <p style={{ color: '#999', margin: 0 }}>
                There are no pending client approvals at this time.
              </p>
            </div>
          ) : (
            <>
              <Table
                columns={approvalColumns}
                dataSource={pendingApprovals}
                rowKey="id"
                loading={tableLoading}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} pending approvals`,
                  pageSizeOptions: ['5', '10', '20', '50'],
                }}
                style={{
                  background: 'white'
                }}
                bordered
              />

              <div style={{
                background: '#fff7e6',
                border: '1px solid #ffd591',
                borderRadius: '6px',
                padding: '16px',
                marginTop: '24px',
                display: 'flex',
                gap: '12px'
              }}>
                <ClockCircleOutlined style={{ color: '#fa8c16', fontSize: '20px', marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#d46b08' }}>Approval Required</strong>
                  <p style={{ margin: '4px 0 0 0', color: '#ad6800', fontSize: '14px' }}>
                    Click "Review" to view full submission details and approve or reject each client onboarding request.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </Spin>
    );
  };

  // Approval Detail View
  const ApprovalDetailContent = () => {
    if (!selectedApproval) {
      return <div>No approval selected</div>;
    }

    const approval = selectedApproval;

    return (
      <div style={{
        background: '#f0f5ff',
        minHeight: 'calc(100vh - 120px)',
        padding: '40px'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setCurrentPage('approvals')}
            >
              Back to Approvals
            </Button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ 
                color: '#1890ff', 
                fontSize: '28px',
                fontWeight: '600',
                margin: '0 0 12px 0'
              }}>
                {approval.clientType === 'Corporate' 
                  ? approval.companyName 
                  : `${approval.firstName} ${approval.lastName}`}
              </h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Tag color={approval.clientType === 'Corporate' ? 'blue' : 'cyan'} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {approval.clientType}
                </Tag>
                <Tag color="orange" icon={<ClockCircleOutlined />} style={{ fontSize: '14px', padding: '4px 12px' }}>
                  Pending Approval
                </Tag>
                <Tag color="purple" style={{ fontSize: '14px', padding: '4px 12px' }}>
                  {approval.product}
                </Tag>
              </div>
              <div style={{ marginTop: '12px', color: '#666' }}>
                <span>Submitted: {approval.submittedDate} at {approval.submittedTime}</span>
              </div>
            </div>
            
            <Space size="middle">
              <Button 
                danger
                size="large"
                icon={<CloseCircleOutlined />}
                onClick={() => {
                  if (window.confirm('Are you sure you want to reject this submission?')) {
                    handleRejectClient(approval.id, 'Rejected by administrator');
                    setCurrentPage('approvals');
                  }
                }}
              >
                Reject
              </Button>
              <Button 
                type="primary" 
                size="large"
                icon={<CheckCircleFilled />}
                onClick={() => handleApproveClient(approval)}
              >
                Approve Client
              </Button>
            </Space>
          </div>
        </div>

        {/* Submission Details */}
        <Card
          title={<span style={{ fontSize: '18px', fontWeight: '600', color: '#1890ff' }}>
            <FileTextOutlined /> Submission Details
          </span>}
          bordered={false}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' }}
        >
          {approval.clientType === 'Individual' ? (
            // Individual Details
            <>
              <h4 style={{ color: '#595959', marginBottom: '16px' }}>Personal Information</h4>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Full Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {`${approval.title || ''} ${approval.firstName} ${approval.middleName || ''} ${approval.lastName}`.trim()}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Gender</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.gender || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Date of Birth</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.dateOfBirth || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Occupation</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.occupation || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.email}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Phone</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.mobileNumber1 || approval.phone || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>BVN</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.bvn || 'N/A'}
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          ) : (
            // Corporate Details
            <>
              <h4 style={{ color: '#595959', marginBottom: '16px' }}>Company Information</h4>
              <Row gutter={[24, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Company Name</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.companyName}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>RC Number</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.rcNumber || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>TIN</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.tin || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Company Type</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.companyType || 'N/A'}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Email</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.email}
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ color: '#8c8c8c', fontSize: '13px' }}>Phone</div>
                    <div style={{ fontSize: '15px', fontWeight: '500', color: '#262626' }}>
                      {approval.phone || 'N/A'}
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          )}
        </Card>

        {/* Documents */}
        <Card
          title={<span style={{ fontSize: '18px', fontWeight: '600', color: '#1890ff' }}>
            <FolderOutlined /> Uploaded Documents
          </span>}
          bordered={false}
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '24px' }}
        >
          <div style={{ color: '#666' }}>
            {Object.keys(approval.uploadedFiles || {}).length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(approval.uploadedFiles).map(([key, file]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircleFilled style={{ color: '#52c41a' }} />
                    <span>{key}: {file.name || 'Uploaded'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ margin: 0, color: '#999' }}>No documents uploaded</p>
            )}
          </div>
        </Card>

        {/* Beneficiaries (if Individual) */}
        {approval.clientType === 'Individual' && approval.beneficiariesData && approval.beneficiariesData.length > 0 && (
          <Card
            title={<span style={{ fontSize: '18px', fontWeight: '600', color: '#1890ff' }}>
              <TeamOutlined /> Beneficiaries
            </span>}
            bordered={false}
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {approval.beneficiariesData.map((ben, idx) => (
                <div key={ben.id} style={{ padding: '12px', background: '#fafafa', borderRadius: '6px' }}>
                  <strong>Beneficiary {idx + 1}:</strong> {Object.entries(ben)
                    .filter(([key]) => key.startsWith('ben_'))
                    .map(([key, value]) => `${key.split('_').pop()}: ${value}`)
                    .join(', ')}
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          background: '#f0f5ff'
        }}>
          <Spin 
            size="large" 
            tip={
              <span style={{ 
                color: '#1890ff', 
                fontSize: '16px',
                marginTop: '16px',
                display: 'block'
              }}>
                Loading Client Management System...
              </span>
            }
            indicator={<LoadingOutlined style={{ fontSize: 48, color: '#1890ff' }} spin />}
          />
        </div>
      ) : (
        <>
          {/* Collapsible Sidebar */}
          <Sider 
            trigger={null} 
            collapsible 
            collapsed={collapsed}
            style={{
              background: '#001529',
              position: 'fixed',
              height: '100vh',
              left: 0,
              top: 0,
              bottom: 0,
            }}
            width={250}
          >
            {/* Logo Section */}
            <div style={{
              height: '64px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#002140',
              margin: '0',
            }}>
              <h2 style={{ 
                color: '#1890ff', 
                margin: 0,
                fontSize: collapsed ? '20px' : '24px',
                fontWeight: 'bold',
                transition: 'all 0.2s'
              }}>
                {collapsed ? 'CM' : 'ClientManager'}
              </h2>
            </div>

            {/* Navigation Menu */}
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[currentPage]}
              onClick={handleMenuClick}
              style={{ 
                marginTop: '16px',
                background: '#001529'
              }}
              items={[
                {
                  key: 'dashboard',
                  icon: <DashboardOutlined />,
                  label: 'Dashboard',
                },
                {
                  key: 'clients',
                  icon: <TableOutlined />,
                  label: 'Client Table',
                },
                {
                  key: 'approvals',
                  icon: <CheckCircleFilled />,
                  label: 'Approvals',
                },
                {
                  key: 'teams',
                  icon: <TeamOutlined />,
                  label: 'Teams',
                },
                {
                  key: 'reports',
                  icon: <FileTextOutlined />,
                  label: 'Reports',
                },
                {
                  key: 'settings',
                  icon: <SettingOutlined />,
                  label: 'Settings',
                },
              ]}
            />
          </Sider>

          {/* Main Layout */}
          <Layout style={{ 
            marginLeft: collapsed ? 80 : 250,
            transition: 'all 0.2s'
          }}>
            {/* Header */}
            <Header style={{
              background: 'white',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  type="text"
                  icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '18px',
                    width: 48,
                    height: 48,
                    color: '#1890ff',
                  }}
                />
                <h1 style={{ 
                  margin: '0 0 0 16px',
                  fontSize: '20px',
                  color: '#1890ff',
                  fontWeight: '600'
                }}>
                  {currentPage === 'dashboard' ? 'Dashboard' : 
                   currentPage === 'onboard' ? 'Onboard New Client' : 
                   currentPage === 'viewClient' ? 'Client Details' :
                   'Client Management'}
                </h1>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {currentPage !== 'onboard' && currentPage !== 'viewClient' && (
                  <Button 
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showOnboardForm}
                    style={{
                      background: '#1890ff',
                      borderColor: '#1890ff',
                      fontWeight: '500',
                      height: '40px',
                      paddingLeft: '20px',
                      paddingRight: '20px',
                    }}
                  >
                    Onboard New Client
                  </Button>
                )}

                <Button 
                  type="text" 
                  icon={<BellOutlined />}
                  style={{ fontSize: '18px', color: '#1890ff' }}
                />
                
                <Dropdown 
                  menu={{ items: userMenuItems }}
                  trigger={['click']}
                >
                  <Space style={{ cursor: 'pointer' }}>
                    <Avatar 
                      style={{ 
                        backgroundColor: '#1890ff',
                        cursor: 'pointer'
                      }}
                      icon={<UserOutlined />}
                    />
                    <span style={{ color: '#1890ff' }}>Admin User</span>
                    <DownOutlined style={{ fontSize: '12px', color: '#1890ff' }} />
                  </Space>
                </Dropdown>
              </div>
            </Header>

            {/* Content Area */}
            <Content style={{ 
              margin: currentPage === 'onboard' ? '0' : '24px 24px 0',
              overflow: 'initial'
            }}>
              {currentPage === 'dashboard' && <DashboardContent />}
              {currentPage === 'clients' && <ClientTableContent />}
              {currentPage === 'approvals' && <ApprovalsContent />}
              {currentPage === 'approvalDetail' && <ApprovalDetailContent />}
              {currentPage === 'onboard' && <OnboardFormContent />}
              {currentPage === 'viewClient' && <ClientDetailsView />}
              {currentPage !== 'dashboard' && currentPage !== 'clients' && currentPage !== 'onboard' && currentPage !== 'viewClient' && currentPage !== 'approvals' && currentPage !== 'approvalDetail' && (
                <div style={{
                  background: 'white',
                  padding: '40px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  textAlign: 'center'
                }}>
                  <h2 style={{ color: '#1890ff' }}>Coming Soon</h2>
                  <p style={{ color: '#666' }}>This page is under construction.</p>
                </div>
              )}
            </Content>

            {/* Footer */}
            <div style={{
              textAlign: 'center',
              padding: '24px 0',
              color: '#1890ff',
              background: currentPage === 'onboard' ? 'transparent' : '#f0f5ff',
              marginTop: currentPage === 'onboard' ? '0' : '24px'
            }}>
              Client Management System ©2025
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
}