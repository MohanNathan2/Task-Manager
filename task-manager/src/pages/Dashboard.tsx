import { Card, Row, Col, List } from "antd";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from "recharts";
import dayjs from "dayjs";
import type { Task } from "../types/task";

const COLORS = ["#1890ff", "#52c41a", "#f5222d"];

export default function Dashboard({ tasks }: { tasks: Task[] }) {

  // ----- 1. Priority Chart -----
  const priorityData = ["High", "Medium", "Low"].map(p => ({
    name: p,
    value: tasks.filter(t => t.priority === p).length,
  }));

  // ----- 2. Tasks per User -----
  const userData = Array.from(new Set(tasks.map(t => t.assignedTo))).map(u => ({
    user: u,
    count: tasks.filter(t => t.assignedTo === u).length,
  }));

  // ----- 4. Recent Activity -----
  const recent = [...tasks]
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 5);

  return (
    <>
      <Row gutter={16}>
        {/* Priority Pie */}
        <Col span={12}>
          <Card title="Priority Distribution">
            <PieChart width={260} height={240}>
              <Pie data={priorityData} dataKey="value" nameKey="name" label>
                {priorityData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        {/* Tasks per User */}
        <Col span={12}>
          <Card title="Tasks per User">
            <BarChart width={260} height={240} data={userData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="user" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1890ff" />
            </BarChart>
          </Card>
        </Col>

        {/* Overdue */}
       
      </Row>

      {/* Recent Activity */}
      <Card title="Recent Activity" style={{ marginTop: 20 }}>
        <List
          dataSource={recent}
          renderItem={t => (
            <List.Item>
              <b>{t.name}</b> updated at{" "}
              {dayjs(t.updatedAt).format("DD MMM HH:mm")}
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
