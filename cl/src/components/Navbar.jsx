import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  VideoCameraOutlined,  // Use VideoCameraOutlined instead of FilmOutlined
  ApartmentOutlined, 
  BranchesOutlined, 
  UserOutlined, 
  ClockCircleOutlined, 
  ScheduleOutlined // Change to an available icon
} from '@ant-design/icons'; // Ensure to import only the available icons
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  return (
    <Header style={{ background: '#fff', padding: '0 20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <h1 style={{ margin: 0, color: '#000', fontSize: '24px', flex: '1 1 auto' }}>
          Cinema Theatre System
        </h1>
        <Menu mode="horizontal" theme="light" style={{ border: 'none', flex: '1 1 auto', justifyContent: 'center', textAlign: 'center' }}>
          <Menu.Item icon={<ApartmentOutlined />} key="1">
            <Link to="/">Multiple complex</Link>
          </Menu.Item>
          <Menu.Item icon={<VideoCameraOutlined />} key="2">
            <Link to="/theatres">Theatre List</Link>
          </Menu.Item>
          <Menu.Item icon={<BranchesOutlined />} key="3">
            <Link to="/screens">Screen List</Link>
          </Menu.Item>
          <Menu.Item icon={<UserOutlined />} key="4">
            <Link to="/seats">Seat Management</Link>
          </Menu.Item>
          <Menu.Item icon={<ClockCircleOutlined />} key="5">
            <Link to="/showtime">Showtime</Link>
          </Menu.Item>
          <Menu.Item icon={<ScheduleOutlined />} key="6">
            <Link to="/movies">Movies</Link>
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
