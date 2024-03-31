import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Main from "./CRUD/Main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
         <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/crud" element={<Main />}></Route>
      </Routes>
    </div>
  );
}

export default App;
