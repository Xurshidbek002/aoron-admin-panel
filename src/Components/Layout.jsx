import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import img from "../assets/logo.png";
import Modal from "./Modal";

const base = [
  {
    path: "/",
    name: "Products",
  },
  {
    path: "/category",
    name: "Category",
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
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(!open);
  };
  const navigate = useNavigate();
  const removeToken = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      {open && (
        <Modal onClose={openModal}>
          <h2 className="text-center p-5 text-2xl font-extrabold">
            Are you sure you want to <br /> log out?
          </h2>
          <div className="flex justify-center gap-5 p-5">
            <button
              onClick={openModal}
              className="px-3 py-1 rounded-md text-white bg-gray-500 hover:bg-gray-400 duration-150"
            >
              Cancel
            </button>
            <button
              onClick={removeToken}
              className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-400 duration-150"
            >
              Log Out
            </button>
          </div>
        </Modal>
      )}
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
                onClick={openModal}
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
