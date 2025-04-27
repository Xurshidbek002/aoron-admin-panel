import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Discount from "./pages/Discount";
import Sizes from "./pages/Sizes";
import Colors from "./pages/Colors";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import News from "./pages/News";
import Login from "./pages/Login";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Category />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      
      {
        path: "/discount",
        element: <Discount />,
      },
      {
        path: "/sizes",
        element: <Sizes />,
      },
      {
        path: "/colors",
        element: <Colors />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/news",
        element: <News />,
      },
    ],
  },
]);
