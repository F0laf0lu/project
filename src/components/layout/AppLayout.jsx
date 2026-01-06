import { useState } from 'react';
import { Select, Layout } from 'antd';
import SideBar from './Sidebar';
import HeaderComponent from './Header'; 
import { Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Option } = Select;



function AppLayout() {

    const [collapsed, setCollapsed] = useState(false)
    const handleSetCollapsed = ()=>{
        setCollapsed(prev => !prev);
    }

    return(
        <Layout style={{ minHeight: '100vh'}}>
            <SideBar  props={{collapsed}} />
            <Layout style={{ marginLeft: collapsed ? 80 : 250, transition: 'all 0.2s', background: '#f0f5ff'}}>
                <HeaderComponent props={{collapsed, handleSetCollapsed}} />
                <Content style={{ margin:'24px 24px 0', overflow: 'initial'}}>
                    <Outlet/>
                </Content> 
            </Layout>
        </Layout>
    )
}

export default AppLayout