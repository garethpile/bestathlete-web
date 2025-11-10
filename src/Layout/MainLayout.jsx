import { Auth } from 'aws-amplify';
import React, { useMemo } from 'react';
import { Layout, Menu, Grid, Button, Avatar, Dropdown } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ApiOutlined,
  DatabaseOutlined,
  CalendarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import AIAssistant from '../features/ai-assistant/AIAssistant';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = ({ customer, workouts, assistantReady }) => {
  const location = useLocation();
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const mobileNavHeight = 72;

  const getSelectedKey = () => {
    if (location.pathname.startsWith('/profile')) return 'profile';
    if (location.pathname.startsWith('/thirdparty')) return 'thirdparty';
    if (location.pathname.startsWith('/calendar')) return 'calendar';
    if (location.pathname.startsWith('/workouts')) return 'workouts';
    if (location.pathname.startsWith('/administration')) return 'administration';
    return 'dashboard';
  };
  const selectedKey = getSelectedKey();
  const athleteName = useMemo(() => {
    if (!customer) return 'Athlete';
    const first = customer.FirstName || '';
    const last = customer.LastName || '';
    return `${first} ${last}`.trim() || 'Athlete';
  }, [customer]);
  const athleteInitials = useMemo(() => {
    if (!customer) return 'A';
    const first = customer.FirstName?.[0] || '';
    const last = customer.LastName?.[0] || '';
    const initials = `${first}${last}`.toUpperCase();
    return initials || 'A';
  }, [customer]);

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      window.location.href = '/';
    } catch (err) {
      console.error('Error signing out:', err);
    }
  };

  const navItems = useMemo(
    () => [
      { key: 'dashboard', icon: DashboardOutlined, label: 'Home', path: '/' },
      { key: 'calendar', icon: CalendarOutlined, label: 'Calendar', path: '/calendar' },
      { key: 'thirdparty', icon: ApiOutlined, label: 'ThirdParty', path: '/thirdparty' },
      { key: 'administration', icon: DatabaseOutlined, label: 'Admin', path: '/administration' },
    ],
    []
  );

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

          {!isMobile && (
            <div style={{ flex: 1 }}>
              <Menu
                mode="horizontal"
                selectedKeys={[selectedKey]}
                style={{ borderBottom: 'none' }}
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
              </Menu>
            </div>
          )}

          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key="profile-menu">
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item key="logout-menu" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
            placement="bottomRight"
          >
            <Button
              type="text"
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 0',
              }}
            >
              <Avatar
                size={isMobile ? 36 : 42}
                style={{ backgroundColor: '#1890ff' }}
              >
                {athleteInitials}
              </Avatar>
              <div
                style={{
                  fontSize: isMobile ? 13 : 15,
                  fontWeight: 600,
                  color: '#0f172a',
                  maxWidth: 160,
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                {athleteName}
              </div>
            </Button>
          </Dropdown>
        </div>
      </Header>

      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          paddingBottom: isMobile ? mobileNavHeight + 32 : 24,
          background: '#fff',
          minHeight: 280,
        }}
      >
        <Outlet />
      </Content>
      {assistantReady && customer && (
        <AIAssistant customer={customer} workouts={workouts} />
      )}
      {isMobile && (
        <nav
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#ffffff',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-around',
            padding: '6px 0',
            zIndex: 1200,
          }}
        >
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = selectedKey === item.key;
            const color = isActive ? '#1890ff' : '#6b7280';
            return (
              <Link
                key={item.key}
                to={item.path}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  color,
                }}
              >
                <IconComponent style={{ fontSize: 18, color }} />
                <div style={{ fontSize: 11, marginTop: 2 }}>{item.label}</div>
              </Link>
            );
          })}
        </nav>
      )}
    </Layout>
  );
};

MainLayout.propTypes = {
  customer: PropTypes.shape({
    idCustomer: PropTypes.string,
    FirstName: PropTypes.string,
  }),
  workouts: PropTypes.arrayOf(PropTypes.shape({
    WorkoutDateTime: PropTypes.string,
    WorkoutType: PropTypes.string,
    WorkoutDistance: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  })),
  assistantReady: PropTypes.bool,
};

MainLayout.defaultProps = {
  customer: null,
  workouts: [],
  assistantReady: false,
};

export default MainLayout;
