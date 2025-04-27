import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Router.jsx";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Router} />
    <ToastContainer
      position="top-center" // <-- toast ekran o‘rtasida chiqadi
      autoClose={3000} // 3 sekunddan keyin yopiladi
      hideProgressBar={false} // progress chiziq chiqishi
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // 'light' yoki 'dark' tema
    />
  </StrictMode>
);
