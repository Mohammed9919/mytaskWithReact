import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

// components
import Todo from "./Todo";

// context 
import { TodosContext } from "../contexts/todosContext";
import { useState , useContext ,useEffect } from "react";


//~ we use UUID libaray to generate unique id
// first go documention to get the commnad --> npm install uuid
// then  we import the uuid libaray to used
// uidv4 --> name of function that generate unique id like '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
import { v4 as uuidv4 } from 'uuid';



export default function TodoList() {
  const {todos , setTodos} = useContext(TodosContext);
  const [titleInput, setTiltlInput] = useState("");
  const [displaydedTodosType , setDisplayedTodosType ] = useState("all")
  
   
  // filterion array
  const completedTodos = todos.filter((t) => t.isCompleted);
  const notcompletedTodos = todos.filter((t) => !t.isCompleted);
  let todosToBeRendered = todos;
  if (displaydedTodosType === "completed") {
     todosToBeRendered = completedTodos;
  } else if (displaydedTodosType === "non-completed") {
    todosToBeRendered = notcompletedTodos;
  } else {
     todosToBeRendered = todos;
  }
    const todosTask = todosToBeRendered.map((t) => {
      return <Todo key={t.id} todo={t}  />
    })
  // give todos form the local Storge , this code while be called once when the component load
 useEffect(() => {
  const storageTodos = JSON.parse(localStorage.getItem("todos"));
  if (storageTodos && Array.isArray(storageTodos)) {
    setTodos(storageTodos);
  }
}, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleAddClick() {
    let updatedTodos = [...todos, { id: uuidv4(), title: titleInput, details: "", isCompleted: false }];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos) );
    setTiltlInput("");
   }
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 , "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },  }  } style={{maxHeight:"90vh" , borderRadius:"10px" , overflowY:"auto"}}>
        <CardContent>
          <Typography variant="h1" style={{ fontWeight: "400" }}>
            مهامي
          </Typography>
          <Divider />
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displaydedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color={"primary"}
          >
            <ToggleButton value="non-completed">غير المنجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton  value="all">الكل</ToggleButton>
          </ToggleButtonGroup>
          {todosTask}
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTiltlInput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Button style={{width:"100%", height:"100%"}} variant="contained" onClick={handleAddClick} disabled={titleInput.length === 0} >إضافة</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

// Typography is h1 , h2 ...h6 , use varient to chose form it
// ? diciders in mui , is the <hr> but more prefected and more flexiable
// toggel button group
// sx in matrail ui like style in css
// ~ you should aovid call use state function in the big scope like function scope , that case infinite loop , can slove this problem with useEffect hook
// ? Side Effect --> anything like operation or action outside the componet scope like edit state , call api , access to the cookies , the purpose of the componet return jsx code , so if need this thing outside the comoponet we use useEffect
// * useEffect --> also can use to do anyting for once when the component is load
// * UseEffect(function) --> called for each re-redering , so re-redering happen when state is changing , also useContext consider state
// * UseEffect (function called when the componet is re-redering , [ control the dependency]) --> ex [state1]   , when state one is changing then useEffect function called , can wite more one state in this array
// * UseEffect (, []) -->  if make this array empty , UseEffect called just one  , when the componet just load , focus load not re-redering.
// * useEffect --> use to manage side effect , if have any code represent side effect like api request , localSorage , cookies , then use useEffect.
// * useEffect --> just call when the componet is  completed drawed , so is best for api request , beacuse api request must be after the componet appearing , then we get state then change the UI depending a state change from api
// ? PureComponet --> A special type of class component in React , It automatically prevents unnecessary re-renders by doing a shallow comparison of props and state.
// Normal Component always re-renders, while PureComponent re-renders only when props or state actually change.
// ** should  change state from event handler to avoid infinite loop if put it in the parent componet  , same thing in side effect  like api request and localStorage put in useEffect to prvent call for each re-redering
// * in case the localStorge we use UseEffect when getItem , then we use handeler wehn setItem
// * so when use React focus for this thing can't repeat not important thing when the componet is re-redering that is not good for perfomance and to good for the user experence and maybe case some errors
// * so useEffect use to make side effect and also use to decide time for something like api request
// && mean and , but if have true befor it return the value after it
// ? when you work with localStorge or database try to make singel-soure of truth , mean singel path or way to obtian the information  ,search about it is very important
// ? single-source of truth in sotrge and database
// ~ if don't make singel-source of turth  that case if any changing happen that led to changeing all sources tath is not good pratic if have more sources and can led to some probelms
// ~ so any thing can be computed do that not need add , new varibale or row in database or complier , that cause unflexiablity and make change is very hard



/* Deploying The Project */
// browser not know react , he jsut know pure hmtl and js and css
// when you write npm run start , rect code translte to pure hmtl and js and css
// ~ go package.json --> scripts to show command for start and bulid and other
// ~ npm run build --> this command give you build foler
// ~ go to netlify.com to upload this project
// ~ production environment can appear proplem not apper in deloper environment check that problem and solve it
// ~ when use npm run build agine then we override to old file
// ~ so can upload folder (build) manual or can connect this file with github , if connect with github anycahnge in git appear in netlify
//* (??) returns the right value only if the left is null or undefined, while || returns it if the left is any falsy value.
// ? search about react gh pages to uplaod you project to git hup
// ** first we should create new repo
// ~  (1) $ npm install gh-pages --save-dev
// ~  (2) Add a homepage property in this format*: https://{username}.github.io/{repo-name}
// ~  (3) Add a (predeploy) property and a (deploy) property to the scripts object:
// ~  (4) $ git init
// ~  (5) $ git remote add origin https://github.com/{username}/{repo-name}.git
// ~  (6) npm run deploy


// creat repo , then go ghithub react gh pages to show cmmand
//  $ git init
// $ npm install gh-pages --save-dev --> from ghithub react gh pages
// $ git add . --> to uplod file
// $ git status --> to show file upload
// then copy comand form githp repo
// git commit -m "first commit"  --> fom git hup repo
// git branch -M main --> fom git hup repo
// git remote add origin git@github.com:Mohammed9919/mytaskWithReact.git --> fom git hup repo
// git push -u origin main --> fom git hup repo
// Add a homepage property in this format*: https://{username}.github.io/{repo-name} --> from ghithub react gh pages
//  "predeploy": "npm run build","deploy": "gh-pages -d build" to scripe in package.json --> from ghithub react gh pages
// npm run deploy