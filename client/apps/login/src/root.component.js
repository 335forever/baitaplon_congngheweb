import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./login.component";
import { Register } from "./register.component";


export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Login />} /> 
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
