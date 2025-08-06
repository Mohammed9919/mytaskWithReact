import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TodosContext } from "../contexts/todosContext";
import { useContext, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const [showDeleteDialog, setShowDelete] = useState(false);
  const [showUpdateDialog, setShowUpdate] = useState(false);
  const [UpdatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details
  });
  const { todos, setTodos } = useContext(TodosContext);

  // Event Handeler
  function handleCheckClick() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handelDeleteClick() {
    setShowDelete(true);
  }
  function handelUpdateClick() {
    setShowUpdate(true);
  }
  function handelDeleteClose() {
    setShowDelete(false);
  }
  function handeUpdatelClose() {
    setShowUpdate(false);
  }
  function handelDeleteConfirm() {
    const updatedTodos = todos.filter((t) => t.id !== todo.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handelUpdateConfirm() {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? { ...t, title: UpdatedTodo.title, details: UpdatedTodo.details }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    handeUpdatelClose();
  }

  return (
    <>
      {/* delete modal (popup)  */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handelDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          هل أنت متأكد من رغبتك في حذف المهمة؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد إتمامه
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handelDeleteClose}>إغلاق</Button>
          <Button onClick={handelDeleteConfirm} autoFocus>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* delete modal (popup)  */}
      {/* Update modal */}
      <Dialog
        style={{ direction: "rtl" }}
        open={showUpdateDialog}
        onClose={handeUpdatelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل مهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="عنوان المهمة"
            type="email"
            fullWidth
            variant="standard"
            value={UpdatedTodo.title}
            onChange={(e) =>
              setUpdatedTodo({ ...UpdatedTodo, title: e.target.value })
            }
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            type="email"
            fullWidth
            variant="standard"
            value={UpdatedTodo.details}
            onChange={(e) =>
              setUpdatedTodo({ ...UpdatedTodo, details: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handeUpdatelClose}>إغلاق</Button>
          <Button onClick={handelUpdateConfirm} autoFocus>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      {/* Update modal */} 
      <Card
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: 5,
          transition: "transform .2s, box-shadow .2s, background-color .2s",
          "&:hover": {
            backgroundColor: "#1e3f8a",
            transform: "scale(1.02)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)"
          }
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{xs:12 , sm:8 , md:8  ,lg:8}}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none"
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
            <Grid
              size={{xs:0, sm:4, md:4 , lg:4}}
              display="flex"
              justifyContent="space-around"
              gap={1}
              alignItems="center"
             
            >
              <IconButton
                aria-label="check"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px"
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                aria-label="edit"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px"
                }}
                onClick={handelUpdateClick}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px"
                }}
                onClick={handelDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
