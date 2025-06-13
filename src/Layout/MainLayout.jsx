import { Auth } from 'aws-amplify';
import React from 'react';
import { Layout, Menu, Tooltip, Grid } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const getSelectedKey = () => {
    if (location.pathname.startsWith('/profile')) return 'profile';
    if (location.pathname.startsWith('/thirdparty')) return 'thirdparty';
    if (location.pathname.startsWith('/calendar')) return 'calendar';
    if (location.pathname.startsWith('/workouts')) return 'workouts';
    if (location.pathname.startsWith('/administration')) return 'administration';
    return 'dashboard';
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          padding: '0 16px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: isMobile ? 18 : 24,
              color: '#1890ff',
              flexShrink: 0,
            }}
          >
            BestAthlete
          </div>

          <div
            style={{
              overflowX: isMobile ? 'auto' : 'unset',
              overflow: isMobile ? 'auto' : 'unset',
              whiteSpace: isMobile ? 'nowrap' : 'normal',
              flex: 1,
              WebkitOverflowScrolling: isMobile ? 'touch' : 'unset',
              padding: isMobile ? '4px 0' : '0',
              backgroundColor: isMobile ? '#fff' : 'transparent',
            }}
          >
            <Menu
              mode="horizontal"
              selectedKeys={[getSelectedKey()]}
              style={{
                borderBottom: 'none',
                display: isMobile ? 'inline-flex' : 'flex',
                minWidth: isMobile ? '600px' : 'unset',
                width: isMobile ? 'unset' : '100%',
              }}
              theme="light"
            >
              <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
                <Link to="/">Dashboard</Link>
              </Menu.Item>


              <Menu.Item key="calendar" icon={<CalendarOutlined />}>
                <Link to="/calendar">Calendar</Link>
              </Menu.Item>

              <Menu.Item key="thirdparty" icon={<ApiOutlined />}>
                <Link to="/thirdparty">ThirdParty</Link>
              </Menu.Item>
              
             <Menu.Item key="administration" icon={<DatabaseOutlined />}>
                <Link to="/administration">Administration</Link>
              </Menu.Item>

              <Menu.Item key="profile" icon={<UserOutlined />}>
                <Link to="/profile">Profile</Link>
              </Menu.Item>

              <Menu.Item key="logout" onClick={async () => {
                try {
                  await Auth.signOut();
                  window.location.href = '/';
                } catch (err) {
                  console.error('Error signing out:', err);
                }
              }}>
                Logout
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Header>

      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;