import React from 'react';
import { Layout, Menu, Tooltip, Grid } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
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
    if (location.pathname.startsWith('/workouts')) return 'workouts';
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
            gap: '24px',
          }}
        >
          <div
            style={{
              fontWeight: 'bold',
              fontSize: isMobile ? 18 : 24,
              color: '#1890ff',
            }}
          >
            BestAthlete
          </div>

          <Menu
            mode="horizontal"
            selectedKeys={[getSelectedKey()]}
            style={{ borderBottom: 'none', flex: 1 }}
            theme="light"
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              {isMobile ? (
                <Tooltip title="Dashboard">
                  <Link to="/" />
                </Tooltip>
              ) : (
                <Link to="/">Dashboard</Link>
              )}
            </Menu.Item>

            <Menu.Item key="workouts" icon={<DatabaseOutlined />}>
              {isMobile ? (
                <Tooltip title="Workouts">
                  <Link to="/workouts" />
                </Tooltip>
              ) : (
                <Link to="/workouts">Workouts</Link>
              )}
            </Menu.Item>

            <Menu.Item key="profile" icon={<UserOutlined />}>
              {isMobile ? (
                <Tooltip title="Profile">
                  <Link to="/profile" />
                </Tooltip>
              ) : (
                <Link to="/profile">Profile</Link>
              )}
            </Menu.Item>

            <Menu.Item key="thirdparty" icon={<ApiOutlined />}>
              {isMobile ? (
                <Tooltip title="Third Party">
                  <Link to="/thirdparty" />
                </Tooltip>
              ) : (
                <Link to="/thirdparty">ThirdParty</Link>
              )}
            </Menu.Item>
          </Menu>
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