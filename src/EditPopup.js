import "./Popup.css";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { TodoContext } from "./context/TodoContext";
import Button from "@mui/material/Button";
import { useState } from "react";
export default function EditPopup({ id, onClose }) {
  const todoContext = useContext(TodoContext);
  const taskEdit = todoContext.todos.find((t) => {
    return t.id === id;
  });

  const [title, setTitle] = useState(taskEdit ? taskEdit.taskTitle : "");
  const [desc, setDesc] = useState(taskEdit ? taskEdit.taskDescreption : "");

  function handleEditTask() {
    todoContext.editTodo(id, title, desc);
    onClose();
  }
  return (
    <div className="pop-up-overlay">
      <Stack
        component="form"
        sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
        className="pop-up"
      >
        <Stack
          display={"flex"}
          justifyContent={"space-between"}
          direction={"row"}
        >
          <TextField
            id="filled-helperText"
            label="العنوان"
            variant="filled"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <TextField
            id="filled-helperText"
            label="التفاصيل"
            variant="filled"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />
        </Stack>
        <Stack
          direction={"row"}
          display={"flex"}
          justifyContent={"space-around"}
        >
          <Button onClick={handleEditTask} color="secondary">
            تعديل
          </Button>
          <Button onClick={onClose} color="secondary">
            الغاء
          </Button>
        </Stack>
      </Stack>
    </div>
  );
}
