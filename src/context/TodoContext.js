import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { ToastContext } from "./ToastContext";
const initialTodos = [
  {
    id: 1,
    taskTitle: "قراءة كتاب",
    taskDescreption: "الانجاز قبل نهاية الشهر",
    isDone: false,
  },
  {
    id: 2,
    taskTitle: "انهاء كورس ريأكت",
    taskDescreption: "",
    isDone: false,
  },
  {
    id: 3,
    taskTitle: "async و ال await  في الجافاسكريبت",
    taskDescreption: "",
    isDone: false,
  },
];
// Get initial todos from localStorage or use defaults
const getInitialTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : initialTodos;
};
export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState(getInitialTodos);
  const toastContext = useContext(ToastContext);

  function toggleTodo(id) {
    setTodos((task) =>
      task.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
    todos.map((t) =>
      t.id === id
        ? !t.isDone
          ? toastContext.showToast("تم اتمام المهمة")
          : toastContext.showToast("تم ارجاع المهمة الي الغير منجز")
        : t
    );
  }
  //to use localStorage
  // Use useEffect to watch todos changes and update localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // This runs whenever todos changes

  function editTodo(id, title, desc) {
    setTodos((task) =>
      task.map((t) =>
        t.id === id
          ? {
              ...t,
              taskTitle: title,
              taskDescreption: desc,
            }
          : t
      )
    );
    toastContext.showToast("تم تعديل المهمة بنجاح");
  }

  function addTodo(todo) {
    // setTodos((task) => [...task, todo]);

    //if wanting to use localStorage
    const newTodo = [...todos, todo];
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
    toastContext.showToast("تم اضافة المهمة بنجاح");
  }

  function deleteTodo(id) {
    setTodos((task) => task.filter((t) => t.id !== id));
    toastContext.showToast("تم حذف المهمة بنجاح");
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        toggleTodo,
        addTodo,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
