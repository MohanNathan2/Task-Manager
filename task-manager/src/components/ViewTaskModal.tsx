import { Modal, Descriptions, Tag } from "antd";
import type { Task } from "../types/task";


export default function ViewTaskModal({
    open,
    task,
    onClose,
}: {
    open: boolean;
    task?: Task;
    onClose: () => void;
}) {
    if (!task) return null;

    const statusColor = (s: string) => {
        switch (s) {
            case "Completed":
                return "green";
            case "In Progress":
                return "blue";
            default:
                return "orange";
        }
    };


    const priorityColor = (p: string) => {
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
        <Modal
            open={open}
            title="View Task"
            footer={null}
            onCancel={onClose}
        >
            <Descriptions column={1}>
                <Descriptions.Item label="Name">
                    {task.name}
                </Descriptions.Item>

                <Descriptions.Item label="Description">
                    {task.description}
                </Descriptions.Item>




                <Descriptions.Item label="Priority">
                    <Tag color={priorityColor(task.priority)}>
                        {task.priority}
                    </Tag>
                </Descriptions.Item>

                <Descriptions.Item label="Status">
                    <Tag color={statusColor(task.status)}>
                        {task.status}
                    </Tag>
                </Descriptions.Item>


                <Descriptions.Item label="Assigned To">
                    {task.assignedTo}
                </Descriptions.Item>

                <Descriptions.Item label="Created At">
                    {new Date(task.updatedAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Descriptions.Item>

            </Descriptions>
        </Modal>
    );
}
