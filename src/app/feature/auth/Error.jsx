import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Error = () => {
  const navigate = useNavigate();

  const errorMessage = useSelector((state) => state.auth.errorMessage);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Registration Failed</h1>

      <p className="my-4">{errorMessage}</p>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Back to Register
      </button>
    </div>
  );
};

export default Error;
