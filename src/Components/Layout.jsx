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
            <div className="w-full h-full relative bg-[#00036371] pt-7 px-5 flex flex-col gap-3 items-center">
              <img src={img} alt="" className="w-[65%] mb-3" />
              {base.map((item, index) => (
                <NavLink
                  key={index}
                  to={item?.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#1c21af] text-[20px] text-white  text-center rounded-md font-bold w-full"
                      : "text-[20px] duration-100 text-white hover:bg-[#1c21af2b]  text-center rounded-md font-bold w-full"
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
            <div className="w-full h-full bg-[#100022] p-2">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
