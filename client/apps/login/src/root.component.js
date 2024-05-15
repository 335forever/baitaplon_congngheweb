import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./login.component";
import { Register } from "./register.component";
import { isSignedIn } from "@TachMonShop/api";

export default function Root() {
  const urlParams = new URLSearchParams(window.location.search);

  return (
    <BrowserRouter>
      {isSignedIn() && <Navigate to={urlParams.get('redirect') || '/'} replace="true"/>}
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
