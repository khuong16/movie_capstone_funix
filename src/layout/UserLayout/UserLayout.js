import React from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Header from "../../components/Header/Header";
import { Outlet, useNavigate } from "react-router-dom";
const { Content, Footer, Sider } = Layout;
const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const UserLayout = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("User");
    window.location.href = "/";
  };
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[
            {
              label: (
                <p
                  onClick={() => {
                    navigate("/User/UserPage");
                  }}
                >
                  <UserOutlined />
                  <span>Quản lý user</span>
                </p>
              ),
            },
            {
              label: (
                <p
                  onClick={() => {
                    navigate("/User/MovieAdmin");
                  }}
                >
                  <UserOutlined />
                  <span>Quản lý Movie</span>
                </p>
              ),
            },
            {
              label: (
                <p
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <UserOutlined />
                  <span>Home</span>
                </p>
              ),
            },
            {
              label: (
                <p onClick={handleLogOut}>
                  <UserOutlined />
                  <span>Đăng Xuất</span>
                </p>
              ),
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: 200,
        }}
      >
        {/* <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        /> */}
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default UserLayout;
