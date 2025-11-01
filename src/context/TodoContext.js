import { createContext, useState } from "react";
import { useEffect } from "react";
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

  function toggleTodo(id) {
    setTodos((task) =>
      task.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
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
  }

  function addTodo(todo) {
    // setTodos((task) => [...task, todo]);

    //if wanting to use localStorage
    const newTodo = [...todos, todo];
    setTodos(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  }

  function deleteTodo(id) {
    setTodos((task) => task.filter((t) => t.id !== id));
  }

  return (
    <TodoContext.Provider
      value={{ todos, toggleTodo, addTodo, editTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
}
