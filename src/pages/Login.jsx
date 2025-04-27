import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../api/Axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    API.post("/auth/login", { login: email, password })
      .then((res) => {
        const token = res.data?.data?.access_token;
        localStorage.setItem("token", token);
        toast.success(res.data?.data?.message);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message?.message);
      });
  };

  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <div data-aos="zoom-in" className="bg-white h-auto rounded-2xl px-7 py-5 overflow-hidden z-10">
          <h2 className="text-center font-bold text-2xl pb-5 text-purple-900">
            Login Page
          </h2>
          <form
            onSubmit={login}
            action=""
            autoComplete="off"
            className="flex flex-col gap-3 items-center"
          >
            <label className="flex flex-col gap-2 font-medium text-gray-600">
              Login
              <input
                required
                onChange={(e) => setEmail(e?.target?.value)}
                type="text"
                placeholder="login"
                autoComplete="new-username"
                className="px-5 py-2 rounded-2xl w-80 focus:outline-purple-500 bg-gray-200"
              />
            </label>
            <label className="flex flex-col gap-2 font-medium text-gray-600">
              Password
              <input
                required
                onChange={(e) => setPassword(e?.target?.value)}
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                className="px-5 py-2 rounded-2xl w-80 focus:outline-purple-500 bg-gray-200"
              />
            </label>
            <div className="w-full flex justify-between text-blue-700 mt-5">
              <button
                type="submit"
                className="cursor-pointer hover:text-blue-400"
              >
                Forget password
              </button>
              <button className="bg-purple-600 font-extrabold px-5 py-1 rounded-md text-white cursor-pointer duration-500 hover:scale-105 hover:bg-purple-800">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
