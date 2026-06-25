import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();

  const dataAll = useSelector((state) => state.auth);
  console.log(dataAll);

  const [input, setInput] = useState("");

  const otp = useSelector((state) => state.auth.data.code);

  console.log(typeof otp);

  const register = () => {
    if (input === otp) {
      console.log("work");
      navigate("/home");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="border-2 w-[50%] flex flex-col justify-center items-center py-5">
        <input
          name="otp"
          value={input}
          type="number"
          className="border-2 w-[60%] my-5 px-5"
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />

        <button
          className="my-5 bg-blue-500 py-2 px-5 rounded-2xl "
          onClick={register}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Otp;
