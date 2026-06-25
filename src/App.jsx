import React from "react";
import Register from "./app/feature/auth/Register";
import { Routes, Route } from "react-router-dom";
import Otp from "./app/feature/auth/Otp";
import Error from "./app/feature/auth/Error";
import Home from "./app/Home";

const App = () => {
  return (
    <>
      {/* <Register /> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/error" element={<Error />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
