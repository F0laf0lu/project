import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Typography,
  Card,
  Row,
  Col,
  message,
  Spin,
  Descriptions
} from 'antd';
import { 
  UserOutlined, 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined,
  TeamOutlined 
} from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;


const UserRoleManagement = () => {
  const BASE_URL = "https://webdev.stanbicibtcpension.com:7789"
  const mockUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', department: 'IT' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', department: 'Marketing' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', department: 'Sales' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Admin', department: 'IT' },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Editor', department: 'HR' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Viewer', department: 'Finance' },
    { id: 7, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Editor', department: 'Operations' },
    { id: 8, name: 'Fiona Green', email: 'fiona@example.com', role: 'Viewer', department: 'Marketing' },
  ]
  
  const {isAuthenticated, authUser} = useAuth()

  // console.log(authUser)
  
  // Initial mock data
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState({});
  const [isLoading, setIsLoading] = useState(false)


  const [roles, setRoles] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [roleForm] = Form.useForm();
  const [userForm] = Form.useForm();


  useEffect(()=>{
    const fetchUsers = async ()=>{
      setIsLoading(true)
      try {
        const response = await fetch(`${BASE_URL}/api/Admin/LoggedInUsers`, {
          method:'POST',
          headers:{
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            User:authUser.UserName
          })
        })
        if (!response.ok) {
          throw new Error("An error occured")
        }
        const result = await response.json()
        setUsers(result.Data)
        setIsLoading(false)
        return {...result}
      } catch (error) {
        console.log('error')
        setIsLoading(false)
      }
    }
    fetchUsers()
  }, [])

  useEffect(()=>{
    async function getUserRole() {
        try {
          const response = await fetch(`${BASE_URL}/api/Admin/ManageUserRole`, {
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "SapID": selectedUser.Username
            })
          })
          if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
          }
          const result = await response.json()
          setRoles(result.Data.Roles)  
          setUserRole(()=>result.Data.Roles.find(role => role.Value === result.Data.GeUserBySapId.Role_ID))
          return {...result}         
        } catch (error) {
          console.log(error.message)
        }
      }
      if (isEditUserModalVisible) {
          getUserRole()
      }
  }, [isEditUserModalVisible])
  
  // Handle table changes (sorting, filtering)
  const handleTableChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Filter users based on search text
  const getFilteredUsers = () => {
    return users.filter(user => 
      user.Username.toLowerCase().includes(searchText.toLowerCase()) ||
      user.Email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.Fullname.toLowerCase().includes(searchText.toLowerCase()) 
    );
  };

  // Create new role
  const handleCreateRole = async (values) => {
    const newRole = {
      id: roles.length + 1,
      name: values.name,
      description: values.description,
      createdBy: ''
    };
    const response = await fetch(`${BASE_URL}/api/Admin/CreateNewRole`, {
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        Name:values.name,
        Descriptions:values.description,
        CreatedBy: authUser.UserName
      })
    })
    if (!response.ok) {
      throw new Error("Error occured while creating role")
    }
    const result = await response.json()
    console.log(result.Success, result.Message)

    // setRoles([...roles, newRole]);
    console.log(`Role "${values.name}" created successfully!`);
    setIsRoleModalVisible(false);
    roleForm.resetFields();
  };

  // Update user role
  const handleUpdateUserRole = async (values) => {
      try {
          const response = await fetch(`${BASE_URL}/api/Admin/AssignUserRole`, {
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              "ModifiedBy": authUser.UserName,
              "Role_ID": values.role,
              "Locked": false,
              "Status": true,
              "Username": selectedUser.Username
            })
          })
          if (!response.ok) {
            throw new Error("Error while updating role")
          }
          const result = await response.json() 
          if (result.Success) {
            console.log(`${selectedUser.Fullname}'s role updated`)
          }
          setIsEditUserModalVisible(false);
          setSelectedUser(null);
          userForm.resetFields();
        } catch (error) {
          console.log(error.message)
      }
  };

  // Open edit user modal
  const openEditUserModal = (user) => {
    setSelectedUser(user);
    userForm.setFieldsValue({ role: userRole });
    setIsEditUserModalVisible(true);
  };


  // Table columns configuration
  const columns = [
    {
      title: 'Username',
      dataIndex: 'Username',
      key: 'Username',
      sorter: (a, b) => a.Username.localeCompare(b.Username),
      sortOrder: sortedInfo.columnKey === 'Username' ? sortedInfo.order : null,
    },
    {
      title: 'FULLNAME',
      dataIndex: 'Fullname',
      key: 'Fullname',
      sorter: (a, b) => a.Fullname.localeCompare(b.Fullname),
      sortOrder: sortedInfo.columnKey === 'Fullname' ? sortedInfo.order : null,
    },
    {
      title: 'EMAIL',
      dataIndex: 'Email',
      key: 'Email',
      sorter: (a, b) => a.Email.localeCompare(b.Email),
      sortOrder: sortedInfo.columnKey === 'Email' ? sortedInfo.order : null,
    },
    // {
    //   title: 'ROLE',
    //   dataIndex: 'role',
    //   key: 'role',
    //   filters: roles.map(role => ({ text: role.name, value: role.name })),
    //   filteredValue: filteredInfo.role || null,
    //   onFilter: (value, record) => record.role === value,
    //   render: (role) => (
    //     <Tag color={getRoleColor(role)} icon={<UserOutlined />}>
    //       {role}
    //     </Tag>
    //   ),
    //   sorter: (a, b) => a.role.localeCompare(b.role),
    //   sortOrder: sortedInfo.columnKey === 'role' ? sortedInfo.order : null,
    // },
    // {
    //   title: 'Department',
    //   dataIndex: 'department',
    //   key: 'department',
    //   filters: [...new Set(users.map(u => u.department))].map(dept => ({ 
    //     text: dept, 
    //     value: dept 
    //   })),
    //   filteredValue: filteredInfo.department || null,
    //   onFilter: (value, record) => record.department === value,
    //   sorter: (a, b) => a.department.localeCompare(b.department),
    //   sortOrder: sortedInfo.columnKey === 'department' ? sortedInfo.order : null,
    // },
    {
      title: 'ACTIONS',
      key: 'actions',
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<EditOutlined />}
          onClick={() => openEditUserModal(record)}
        >
          Change Role
        </Button>
      ),
    },
  ];

  return (
    <Spin spinning={isLoading} size="large" tip="Loading client data...">
      <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
        <Card>
          <Title level={2}>
            <TeamOutlined /> Role Management
          </Title>
          
          {/* Header with search and buttons */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Search users..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={16} style={{ textAlign: 'right' }}>
              <Space>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setIsRoleModalVisible(true)}
                >
                  Create New Role
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Roles Summary */}
          <Card 
            size="small" 
            style={{ marginBottom: 16, background: '#fafafa' }}
            title="Available Roles"
          >
            {/* <Space wrap>
              {roles.map(role => (
                <Tag 
                  key={role.id} 
                  color={getRoleColor(role.name)}
                  style={{ marginBottom: 8 }}
                >
                  <strong>{role.name}</strong>: {role.description}
                </Tag>
              ))}
            </Space> */}
          </Card>

          {/* Users Table */}
          <Table
            columns={columns}
            dataSource={getFilteredUsers()}
            rowKey="Num"
            onChange={handleTableChange}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} users`,
            }}
          />
        </Card>

        {/* Create Role Modal */}
        <Modal
          title="Create New Role"
          open={isRoleModalVisible}
          onCancel={() => {
            setIsRoleModalVisible(false);
            roleForm.resetFields();
          }}
          footer={null}
        >
          <Form
            form={roleForm}
            layout="vertical"
            onFinish={handleCreateRole}
          >
            <Form.Item
              name="name"
              label="Role Name"
              rules={[
                { required: true, message: 'Please enter role name' },
                { min: 2, message: 'Role name must be at least 2 characters' }
              ]}
            >
              <Input placeholder="e.g., Manager, Contributor" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Role Description"
              rules={[
                { required: true, message: 'Please enter role description' },
                { min: 10, message: 'Description must be at least 10 characters' }
              ]}
            >
              <TextArea 
                rows={4} 
                placeholder="Describe the permissions and responsibilities of this role..."
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setIsRoleModalVisible(false);
                  roleForm.resetFields();
                }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Create Role
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Edit User Role Modal */}
        <Modal
          title={`Change Role for ${selectedUser?.Fullname}`}
          open={isEditUserModalVisible}
          onCancel={() => {
            setIsEditUserModalVisible(false);
            setSelectedUser(null);
            userForm.resetFields();
          }}
          footer={null}
        >
          <Form
            form={userForm}
            layout="vertical"
            onFinish={handleUpdateUserRole}
          >
            <div style={{ marginBottom: 16, padding: 12, background: '#f0f2f5', borderRadius: 4 }}>
              <p style={{ margin: 0 }}><strong>Fullname:</strong> {selectedUser?.Fullname}</p>
              <p style={{ margin: 0 }}><strong>Email:</strong> {selectedUser?.Email}</p>
              <p style={{ margin: 0 }}>
                <strong>Current Role:</strong> 
                <Tag style={{ marginLeft: 8 }}>
                  {userRole.Name}
                </Tag>
              </p>
            </div>

            <Form.Item
              name="role"
              label="New Role"
              rules={[{ required: true, message: 'Please select a role' }]}
            >
              <Select placeholder="Select a role">
                {roles.map(role => (
                  <Select.Option key={role.Value} value={role.Value}>
                    <Space>
                      <Tag>{role.Name}</Tag>
                      <span style={{ fontSize: '12px', color: '#888' }}>
                        {/* {role.description} */}
                      </span>
                    </Space>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setIsEditUserModalVisible(false);
                  setSelectedUser(null);
                  userForm.resetFields();
                }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update Role
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Spin>
  );
};

export default UserRoleManagement;