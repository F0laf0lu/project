import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button, Space, Layout, Avatar, Dropdown, Typography } from 'antd';
import { 
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  BellOutlined,
  DownOutlined,
  PlusOutlined,
  SettingOutlined,
  LogoutOutlined,

} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Header } = Layout;
const {Text}  = Typography


function HeaderComponent({props}) {

    const navigate = useNavigate()
    const {authUser} = useAuth()
    
    const [currentPage, setCurrentPage] = useState('dashboard');
    const {collapsed, handleSetCollapsed} = props

    const showOnboardForm = () => {
        // setCurrentStep(0);
        // form.resetFields();
        navigate('/onboard-client')
  };


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

    return (
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
                onClick={handleSetCollapsed}
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '70px'}}>
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

            <div style={{ cursor: 'pointer', display:"flex", gap:"17px"}}>
                <Avatar 
                    style={{ 
                    backgroundColor: '#1890ff',
                    cursor: 'pointer',
                    }}
                    icon={<UserOutlined />}
                />
                <Text style={{ color: '#1890ff', fontSize:'20px'}}>{authUser?.Fullname.split(" ")[1]}</Text>
            </div>            
            
            {/* <Dropdown 
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
            </Dropdown> */}
            </div>
        </Header>
    )
}


export default HeaderComponent