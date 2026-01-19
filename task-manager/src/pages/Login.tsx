import { Button, Card, Form, Input, Select, message } from "antd";

interface LoginFormValues {
  email: string;
  password: string;
  role: "Admin" | "User";
}

interface Props {
  onLogin: () => void;
}

export default function Login({ onLogin }: Props) {
  const onFinish = (values: LoginFormValues) => {

    const users = [
      { email: "admin@example.com", password: "admin123", name: "Admin" },
      { email: "ravi@example.com", password: "user123", name: "Ravi" },
      { email: "john@example.com", password: "user123", name: "John" },
    ];

    const user = users.find(
      (u) =>
        u.email === values.email &&
        u.password === values.password
    );

    if (user) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", values.role);
      localStorage.setItem("username", user.name);   // 👈 KEY

      onLogin();
    } else {
      message.error("Invalid credentials");
    }
  };

  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <Card title="Login" style={{ width: 350 }}>
        <Form<LoginFormValues> layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Role" initialValue="User">
            <Select
              options={[
                { value: "Admin" },
                { value: "User" },
              ]}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
