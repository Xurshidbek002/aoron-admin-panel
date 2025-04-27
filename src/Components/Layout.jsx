import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import img from "../assets/logo.png";

const base = [
  {
    path: "/",
    name: "Category",
  },
  {
    path: "/products",
    name: "Products",
  },

  {
    path: "/discount",
    name: "Discount",
  },
  {
    path: "/sizes",
    name: "Sizes",
  },
  {
    path: "/colors",
    name: "Colors",
  },
  {
    path: "/faq",
    name: "Faq",
  },
  {
    path: "/contact",
    name: "Contact",
  },
  {
    path: "/team",
    name: "Team",
  },
  {
    path: "/news",
    name: "News",
  },
];

function Layout() {
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <div className="">
        <div className="grid grid-cols-12 h-screen overflow-y-hidden">
          <div className="col-span-2">
            <div className="w-full h-full bg-[#06082f] pt-7 px-5 flex flex-col gap-1 items-center">
              <img src={img} alt="" className="w-30 h-25 mb-3" />
              {base.map((item, index) => (
                <NavLink
                  key={index}
                  to={item?.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#1c21af] text-[17px] py-1 text-white  text-center rounded-md font-medium w-full"
                      : "text-[17px] text-white py-1 hover:bg-[#ffffff08] text-center rounded-md font-medium w-full"
                  }
                >
                  {item?.name}
                </NavLink>
              ))}
              <button
                onClick={removeToken}
                className="absolute cursor-pointer bottom-0 mb-10 px-4 py-1 bg-red-700/80 hover:bg-red-700 text-white hover:tracking-wider duration-500  rounded-2xl font-bold"
              >
                Log out
              </button>
            </div>
          </div>
          <div className="col-span-10">
            <div className="w-full h-full bg-[#100022]">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
