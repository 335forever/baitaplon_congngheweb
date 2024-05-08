import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./login.component";
import { Register } from "./register.component";
export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/v1">
            {/* <Route index element={<Navigate to="/login"/>} exact/> */}
            <Route path="sign-in" element={<Login />} /> 
            <Route path="sign-up" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
