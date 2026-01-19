import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Header, Content } = Layout;

export default function AppLayout({
  children,
  onLogout,
  onMenu,
}: {
  children: React.ReactNode;
  onLogout: () => void;
  onMenu: (key: string) => void;
}) {
  const role = localStorage.getItem("role");

  const userMenu = {
    items: [
      {
        key: "logout",
        label: "Logout",
        onClick: onLogout,
      },
    ],
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 24px",
        }}
      >
        {/* LEFT SECTION */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <h3 style={{ color: "#fff", margin: 0, whiteSpace: "nowrap" }}>
            Task Manager
          </h3>

          <Menu
            theme="dark"
            mode="horizontal"
            style={{ minWidth: 260 }}
            defaultSelectedKeys={["tasks"]}
            onClick={(e) => onMenu(e.key)}
            items={[
              {
                key: "dashboard",
                icon: <DashboardOutlined />,
                label: "Dashboard",
              },
              {
                key: "tasks",
                icon: <UnorderedListOutlined />,
                label: "Tasks",
              },
            ]}
          />
        </div>

        {/* RIGHT SECTION */}
        <div
          style={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span>{role}</span>

          <Dropdown menu={userMenu} trigger={["click"]}>
            <Avatar
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
            />
          </Dropdown>
        </div>
      </Header>

      <Content style={{ padding: 24 }}>{children}</Content>
    </Layout>
  );
}
