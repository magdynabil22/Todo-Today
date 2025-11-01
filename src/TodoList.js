import { TodoContext } from "./context/TodoContext";
import { useContext, useState, useEffect } from "react";
import TodoTask from "./TodoTask";
import EditPopup from "./EditPopup";

export default function TodoList() {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const todoContext = useContext(TodoContext);
  const todoData = todoContext.todos;

  const todoList = todoData.map((task) => {
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
