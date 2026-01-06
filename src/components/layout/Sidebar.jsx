import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined,
  TableOutlined,
  SettingOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckCircleFilled,
  LogoutOutlined,
  PlusOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';

const { Sider } = Layout;

function SideBar({props}) {

    const navigate = useNavigate()
    const {logout} = useAuth()

    const { collapsed } = props;
    
    const [currentPage, setCurrentPage] = useState('dashboard');

    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
        },
        {
            key: 'onboard',
            icon: <PlusOutlined />,
            label: 'Onboard New Client',
        },
        {
            key: 'incomplete-onboarding',
            icon: <ExclamationCircleOutlined />,
            label: 'Incomplete Onboarding',
        },
        {
            key: 'individual-clients',
            icon: <TableOutlined />,
            label: 'Individual Clients',
        },
        // {
        //     key: 'corporate-clients',
        //     icon: <TeamOutlined />,
        //     label: 'Corporate Clients',
        // },
        // {
        // key: 'approvals',
        // icon: <CheckCircleFilled />,
        // label: 'Approvals',
        // },
        {
            key: 'roles',
            icon: <TeamOutlined />,
            label: 'Manage Roles',
        },
        ]

    const handleMenuClick = (e) => {
        setCurrentPage(e.key);
        switch (e.key){
            case 'dashboard':
                navigate(`/dashboard`)
                break
            case 'individual-clients':
                navigate('/clients')
                break
            case 'corporate-clients':
                navigate('/itla')
                break
            case 'roles':
                navigate('/roles')
                break
            case 'incomplete-onboarding':
                navigate('/incomplete-onboarding')
                break
            case 'onboard':
                navigate('/onboard-client')
                break
            default:
                navigate('/dashboard')
                break
        }
    };
    

    const handleLogout = ()=>{
        logout()
    }
    

    return(
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
                {collapsed ? 'SITL' : 'SITL'}
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
                items={menuItems}
            >

            </Menu>
        

            {/* Bottom */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '16px',
                background: '#001529',
                borderTop: '1px solid #434343',
                fontSize:'15px',
            }} onClick={handleLogout}>
                <span style={{ 
                    color: 'white', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <LogoutOutlined />
                    {!collapsed && <span>Logout</span>}
                </span>
            </div>
        </Sider>
    )
}


export default SideBar