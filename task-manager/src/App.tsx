import { useState } from "react";
import { Button, Empty, Space, Input, Modal ,message} from "antd";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import TaskTable from "./components/TaskTable";
import TaskFormModal from "./components/TaskFormModal";
import ViewTaskModal from "./components/ViewTaskModal";
import Dashboard from "./pages/Dashboard";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { Task } from "./types/task";

export default function App() {
  const [auth, setAuth] = useState(
    localStorage.getItem("auth") === "true"
  );

  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role")
  );

  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState<Task | null>(null);
  const [view, setView] = useState<Task | undefined>();

  const [search, setSearch] = useState("");

  const [page, setPage] = useState<"tasks" | "dashboard">("tasks");



  // ✅ When login → clear old tasks
  const handleLogin = () => {
    setAuth(true);
    setRole(localStorage.getItem("role"));
  };

  if (!auth) return <Login onLogin={handleLogin} />;

  // ✅ Add / Update
  const submit = (task: Task) => {
  const exists = tasks.find((t) => t.id === task.id);

  const finalTask: Task = {
    ...task,
    updatedAt: Date.now(),       // 👈 always update timestamp
  };

  if (exists) {
    setTasks(tasks.map((t) => (t.id === task.id ? finalTask : t)));
  } else {
    setTasks([...tasks, finalTask]);
  }

  setModal(false);
};

  // ✅ Delete with confirmation
  const deleteTask = (id: string) => {
    Modal.confirm({
      title: "Delete Task?",
      content: "Are you sure you want to delete this task?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        setTasks(tasks.filter((t) => t.id !== id));
        message.success("Task deleted");
      },
    });
  };

  // ✅ Search filter
  const filtered = tasks.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase())
  );

  // ✅ Role based visibility
const username = localStorage.getItem("username");

const visibleTasks =
  role === "Admin"
    ? filtered
    : filtered.filter((t) => t.assignedTo === username);


  return (
    <AppLayout
      onMenu={(key: string) => setPage(key as "tasks" | "dashboard")}
      onLogout={() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("role");
        setAuth(false);
      }}
    >
      {page === "dashboard" ? (
        <Dashboard tasks={visibleTasks} />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            {/* LEFT */}
            <h3 style={{ margin: 0 }}>List Tasks</h3>

            {/* RIGHT */}
            <Space>
              <Input.Search
                placeholder="Search task..."
                allowClear
                style={{ width: 220 }}
                onChange={(e) => setSearch(e.target.value)}
              />

              {role === "Admin" && (
                <Button
                  type="primary"
                  onClick={() => {
                    setSelected(null);
                    setModal(true);
                  }}
                >
                  Add Task
                </Button>
              )}
            </Space>
          </div>

          {tasks.length === 0 ? (
            <Empty description="No task is assigned or added">
              {role === "Admin" && (
                <Button type="primary" onClick={() => setModal(true)}>
                  Add Task
                </Button>
              )}
            </Empty>
          ) : (
            <TaskTable
              tasks={visibleTasks}
              onView={setView}
              onEdit={
                role === "Admin"
                  ? (t) => {
                      setSelected(t);
                      setModal(true);
                    }
                  : undefined
              }
              onDelete={role === "Admin" ? deleteTask : undefined}
              onStatusChange={(id, status) =>
                setTasks(
                  tasks.map((t) =>
                    t.id === id ? { ...t, status } : t
                  )
                )
              }
            />
          )}

          <TaskFormModal
            open={modal}
            task={selected}
            onClose={() => setModal(false)}
            onSubmit={submit}
          />

          <ViewTaskModal
            open={!!view}
            task={view}
            onClose={() => setView(undefined)}
          />
        </>
      )}
    </AppLayout>
  );
}
