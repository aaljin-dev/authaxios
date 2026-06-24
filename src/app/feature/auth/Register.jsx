import React, { useEffect, useState } from "react";
import { registerUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSuccess } from "./authSlice";
import Error from "./Error";

const Register = () => {
  const [register, setRegister] = useState({});

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const success = useSelector((state) => state.auth.success);
  const errorMessage = useSelector((state) => state.auth.message);
  const networkError = useSelector((state) => state.auth.networkError);

  const handleRegister = () => {
    dispatch(registerUser(register));
  };

  useEffect(() => {
    if (success) {
      navigate("/otp");
      dispatch(resetSuccess());
    }
    if (errorMessage || networkError) {
      navigate("/error");
    }
  }, [success, navigate, dispatch, errorMessage, networkError]);

  console.log();

  const canRegister = Boolean(register.name && register.contactNumber);
  console.log(register);

  return (
    <div>
      <div className="border-2 flex justify-center items-center h-[100vh]">
        <div className="border-2 w-[50%] flex flex-col items-center justify-center">
          <h1 className="my-5 text-2xl">Login</h1>
          <div className="flex flex-col items-center gap-8 w-[70%]  my-5">
            <input
              placeholder="name"
              name="name"
              value={register.name || ""}
              type="text"
              onChange={(e) =>
                setRegister({ ...register, [e.target.name]: e.target.value })
              }
              className="border-2 w-[50%] rounded-2xl px-3 py-2"
            />

            {/* <input
              placeholder="email"
              name="email"
              value={register.email || ""}
              type="text"
              className="border-2 w-[50%] rounded-2xl px-3 py-2"
              onChange={(e) =>
                setRegister({ ...register, [e.target.name]: e.target.value })
              }
            /> */}

            <input
              placeholder="contactNumber"
              name="contactNumber"
              value={register.contactNumber || ""}
              onChange={(e) => {
                setRegister({ ...register, [e.target.name]: e.target.value });
              }}
              type="number"
              className="border-2 w-[50%] rounded-2xl px-3 py-2"
            />
            <button
              className="bg-blue-500 px-8 py-2 rounded-2xl"
              onClick={handleRegister}
              disabled={!canRegister}
            >
              {loading ? "loading" : "Signup"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
