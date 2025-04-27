import React, { useEffect } from "react";
import AnimatedBackground from "./Components/Background";
import Login from "./pages/Login";
import { Outlet, useNavigate } from "react-router-dom";
import Layout from "./Components/Layout";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [token]);
  return (
    <div>
      <AnimatedBackground />
      {token ? (
        <Layout>
          <Outlet />
        </Layout>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
