import { TodoContext } from "./context/TodoContext";
import { useContext, useState } from "react";
import TodoTask from "./TodoTask";
import EditPopup from "./EditPopup";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { Fragment } from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

export default function DoneTodos() {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const todoContext = useContext(TodoContext);
  const todoData = todoContext.todos;

  const todoList = todoData.map((task) => {
    if (task.isDone)
      return (
        <TodoTask
          key={task.id}
          title={task.taskTitle}
          desc={task.taskDescreption}
          isDone={task.isDone}
          onToggle={() => todoContext.toggleTodo(task.id)}
          onEdit={() => setEditingTaskId(task.id)}
          onDelete={() => todoContext.deleteTodo(task.id)}
        />
      );
    return null;
  });

  return (
    <>
      {todoList}
      {editingTaskId && (
        <EditPopup id={editingTaskId} onClose={() => setEditingTaskId(null)} />
      )}
      {todoContext.toast && todoContext.toast.open && (
        <Snackbar
          open={todoContext.toast.open}
          autoHideDuration={3000}
          onClose={todoContext.closeToast}
        >
          <Alert
            onClose={todoContext.closeToast}
            severity="success"
            variant="filled"
            sx={{ width: "90%" }}
          >
            {todoContext.toast.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
