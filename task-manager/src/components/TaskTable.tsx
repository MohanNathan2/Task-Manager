import { Table, Select, Space, Button, Tag } from "antd";
import type { Task } from "../types/task";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Props {
  tasks: Task[];
  onStatusChange: (id: string, status: Task["status"]) => void;
  onView: (task: Task) => void;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
}

export default function TaskTable({
  tasks,
  onStatusChange,
  onView,
  onEdit,
  onDelete,
}: Props) {

  const priorityColor = (p: Task["priority"]) => {
    switch (p) {
      case "High":
        return "red";
      case "Medium":
        return "orange";
      default:
        return "green";
    }
  };

  return (
    <Table<Task>
      rowKey="id"
      dataSource={tasks}
      columns={[
        {
          title: "Sl No",
          render: (_value: unknown, _record: Task, index: number) =>
            index + 1,
        },

        { title: "Task Name", dataIndex: "name" },

        { title: "Description", dataIndex: "description" },

        {
          title: "Status",
          render: (_value: unknown, task: Task) => (
            <Select<Task["status"]>
              value={task.status}
              onChange={(v) => onStatusChange(task.id, v)}
              options={[
                { value: "Open", label: "Open" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
              ]}
            />
          ),
        },

        {
          title: "Priority",
          render: (_value: unknown, task: Task) => (
            <Tag color={priorityColor(task.priority)}>
              {task.priority}
            </Tag>
          ),
        },

        { title: "Assigned To", dataIndex: "assignedTo" },

        {
          title: "Created On",
          render: (_: unknown, task: Task) =>
            new Date(task.updatedAt).toLocaleString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
        },


        {
          title: "Actions",
          render: (_value: unknown, task: Task) => (
            <Space>
              <Button
                icon={<EyeOutlined />}
                onClick={() => onView(task)}
              />

              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => onEdit?.(task)}
              />

                <Button danger icon={<DeleteOutlined />}   onClick={() => {
                  onDelete?.(task.id);
                  
                }}/>
              
            </Space>
          ),
        },
      ]}
    />
  );
}
