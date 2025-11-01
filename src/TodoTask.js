import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EditPopup from "./EditPopup";
export default function TodoTask({
  title,
  desc,
  isDone,
  onToggle,
  onEdit,
  onDelete,
}) {
  // derive color from prop and notify parent via onToggle
  const checkIconColor = isDone ? "darkgreen" : "#5b7672ff";

  return (
    <ListItem
      style={{ backgroundColor: "lightblue", width: "90%", height: "70px" }}
    >
      <ListItemIcon>
        <Button onClick={onDelete}>
          <DeleteOutlineOutlinedIcon
            color="error"
            style={{ paddingRight: "5px", fontSize: "30px" }}
          />
        </Button>
        <Button onClick={onEdit}>
          <EditOutlinedIcon
            color="info"
            style={{ paddingRight: "5px", fontSize: "30px" }}
          />
        </Button>
        <Button onClick={onToggle}>
          <CheckCircleOutlinedIcon
            style={{
              paddingRight: "5px",
              fontSize: "30px",
              color: checkIconColor,
            }}
          />
        </Button>
      </ListItemIcon>
      <ListItemText
        primary={title}
        secondary={desc || null}
        style={{ textAlign: "end", fontSize: "30px" }}
      />
    </ListItem>
  );
}
