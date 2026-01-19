import React,{useEffect} from "react";
import { Modal, Form, Input, Select  } from "antd";
import type { Task } from "../types/task";

interface Props {
  open: boolean;
  task?: Task | null;
  onClose: () => void;
  onSubmit: (task: Task) => void;
}

export default function TaskFormModal({
  open,
  task,
  onClose,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<Task>();

useEffect(() => {
  if (task) {
    form.setFieldsValue(task);
  } else {
    form.resetFields();
  }
}, [task, open, form]);


  const handleOk = () => {
  form.validateFields().then((values) => {
    onSubmit({
      ...values,
      id: task?.id ?? Date.now().toString(),
    });

    onClose();
  });
};


  return (
    <Modal
      title={task ? "Edit Task" : "Add Task"}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <Form layout="vertical" form={form}>
        <Form.Item name="name" label="Task Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item name="assignedTo" label="Assigned To">
          <Input />
        </Form.Item>

        <Form.Item name="priority" label="Priority">
          <Select options={[{ value: "Low" }, { value: "Medium" }, { value: "High" }]} />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <Select
            options={[
              { value: "Open" },
              { value: "In Progress" },
              { value: "Completed" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
