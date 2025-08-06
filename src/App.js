import "./App.css";
import TodoLit from "./TodoListPoject/TodoLIst";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

// we use this function to make font in all compontent , use inline style if you want add for one componet
// we get this way form mui docmumention , not save anything
const theme = createTheme({
  typography: {
    fontFamily: ["mycairofont"]
  }, 
  palette: {
    primary: {
      main:"#dd2c00"
    }
  }
});

const initialToodos = [
  {
    id: uuidv4(),
    title: "قراءة كتاب",
    details: "قراءة 30 صفحة من كتاب تطوير الذات",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "مراجعة درس برمجة",
    details: "حل 5 تمارين JavaScript من الكورس",
    isCompleted: false
  },
  {
    id: uuidv4(),
    title: "ممارسة الرياضة",
    details: "تمارين شد لمدة 20 دقيقة في الصباح",
    isCompleted: false
  }
];

// provide the font for all componet
function App() {
  const [todos, setTodos] = useState(initialToodos);
  return (

    <ThemeProvider theme={theme}>
        <div
        className="App"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "#191b1f",
          direction: "rtl"
        }}
      >
        <TodosContext.Provider value={{ todos, setTodos }}>
          <TodoLit />
        </TodosContext.Provider>
      </div>
      
    </ThemeProvider>
  );
}

export default App;

// value={{todos: todos , setTodos: setTodos}} , key have the same name so can value={{todos,setTodos}}

//~ Imperative programming focuses on how to do something by specifying each step in detail. ex js
// ~Declarative programming focuses on what you want as the end result, leaving the steps to the system or framework. ex react.js
// in programing memory mean temporary storage , if need permanent Memory that called Storage