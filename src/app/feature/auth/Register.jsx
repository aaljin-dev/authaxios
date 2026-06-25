import React, { useEffect, useState } from "react";
import { registerUser, loginUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetSuccess, clearError, setLogin } from "./authSlice";
import Error from "./Error";

const Register = () => {
  const login = useSelector((state) => state.auth.login);

  const [loginData, setLoginData] = useState({});

  const [register, setRegister] = useState({});

  const serverOtp = useSelector((state) => state.auth.data.code);

  console.log(serverOtp);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  // const otp = useSelector((state)=> state.auth.)
  const loading = useSelector((state) => state.auth.loading);
  const success = useSelector((state) => state.auth.success);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const networkError = useSelector((state) => state.auth.networkError);

  const handleRegister = () => {
    dispatch(registerUser(register));
  };
  const handleLogin = () => {
    dispatch(loginUser(loginData));
    console.log("loginData", loginData);
  };

  useEffect(() => {
    if (success) {
      navigate("/otp");
      dispatch(resetSuccess());
    }

    if (errorMessage || networkError) {
      navigate("/error");
      dispatch(clearError());
    }
  }, [success, errorMessage, networkError, navigate, dispatch]);

  const canRegister = Boolean(register.name && register.contactNumber);
  const canLogin = Boolean(loginData.contactNumber);
  console.log(register);
  console.log("log", loginData);

  return (
    <div>
      <div className="border-2 flex justify-center items-center h-[100vh]">
        <div className="border-2 w-[50%] flex flex-col items-center justify-center">
          <h1 className="my-5 text-2xl">{login ? "Login" : "Register"}</h1>
          <div className="flex flex-col items-center gap-8 w-[70%]  my-5">
            {!login && (
              <input
                placeholder="name"
                name="name"
                value={register.name || ""}
                type="text"
                className="border-2 w-[50%] rounded-2xl px-3 py-2"
                onChange={(e) =>
                  setRegister({ ...register, [e.target.name]: e.target.value })
                }
              />
            )}

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
              value={
                login
                  ? loginData.contactNumber || ""
                  : register.contactNumber || ""
              }
              type="number"
              onChange={(e) => {
                if (login) {
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  });
                } else {
                  setRegister({
                    ...register,
                    [e.target.name]: e.target.value,
                  });
                }
              }}
              className="border-2 w-[50%] rounded-2xl px-3 py-2"
            />
            <button
              className="bg-blue-500 px-8 py-2 rounded-2xl"
              onClick={login ? handleLogin : handleRegister}
              disabled={login ? !canLogin : !canRegister}
            >
              {loading ? "loading" : login ? "Login" : "Signup"}
            </button>
          </div>
          <div onClick={() => dispatch(setLogin())} className="cursor-pointer">
            {login ? "Register" : "Login"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
