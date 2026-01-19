    export interface Task {
    id: string;
    name: string;
    description: string;
    status: "Open" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    assignedTo: string;
    assignedTime: string;
    dueDate: string; 
    updatedAt: number;
    }