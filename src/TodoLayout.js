import { Button } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Stack from "@mui/material/Stack";
import { Link, Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import { TodoContext } from "./context/TodoContext";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function TodoLayout() {
  const [inputValue, setInputValue] = useState("");
  const todoContext = useContext(TodoContext);
  const todoData = todoContext.todos;
  function handleAddClick() {
    if (inputValue) {
      const lastTodoId = Math.max(...todoData.map((t) => t.id));
      const newTodo = {
        id: lastTodoId + 1,
        taskTitle: inputValue,
        taskDescreption: "",
        isDone: false,
      };
      todoContext.addTodo(newTodo);
      setInputValue("");
      todoContext.showToast("تم اضافة مهمة جديدة");
    }
  }
  // --- related to the button toggle ---//
  const [alignment, setAlignment] = useState("undone");

  const handleChange = (event, newAlignment) => {
    if (newAlignment === null) return;
    setAlignment(newAlignment);
  };
  // --- related to the button toggle ---//

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          backgroundColor: "white",
          height: "600px",
          width: "60%",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          مهامي
        </Typography>
        <Divider style={{ width: "800px", height: "1px", margin: "0" }} />
        <ToggleButtonGroup
          color="secondary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <Link to="/">
            <ToggleButton value="undone">غير منجز</ToggleButton>
          </Link>
          <Link to="/done">
            <ToggleButton value="done">منجز</ToggleButton>
          </Link>
          <Link to="all">
            <ToggleButton value="all">الكل</ToggleButton>
          </Link>
        </ToggleButtonGroup>
        <Outlet />
        <Stack direction={"row"} spacing={2}>
          <Button
            variant="contained"
            color="error"
            style={{
              paddingRight: "40px",
              paddingLeft: "40px",
              fontSize: "20px",
            }}
            onClick={handleAddClick}
          >
            اضافة
          </Button>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="عنوان المهمة"
            style={{ width: "250px", textAlign: "end", paddingRight: "20px" }}
          />
        </Stack>
      </Stack>
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
