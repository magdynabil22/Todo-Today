import { TodoContext } from "./context/TodoContext";
import { useContext, useState } from "react";
import TodoTask from "./TodoTask";
import EditPopup from "./EditPopup";

export default function UnDoneTodos() {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const todoContext = useContext(TodoContext);
  const todoData = todoContext.todos;

  const todoList = todoData.map((task) => {
    if (!task.isDone)
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
    </>
  );
}
