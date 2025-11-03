import "./App.css";
import { Routes, Route } from "react-router-dom";
import TodoLayout from "./TodoLayout";
import TodoList from "./TodoList";
import { TodoProvider } from "./context/TodoContext";
import DoneTodos from "./DoneTodos";
import UnDoneTodos from "./UnDoneTodos";
import { ToastProvider } from "./context/ToastContext";
function App() {
  return (
    <ToastProvider>
      <TodoProvider>
        <div
          className="App"
          style={{
            backgroundColor: "teal",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Routes>
            <Route path="/" element={<TodoLayout />}>
              <Route index element={<UnDoneTodos />}></Route>
              <Route path="done" element={<DoneTodos />}></Route>
              <Route path="all" element={<TodoList />}></Route>
            </Route>
          </Routes>
        </div>
      </TodoProvider>
    </ToastProvider>
  );
}

export default App;
