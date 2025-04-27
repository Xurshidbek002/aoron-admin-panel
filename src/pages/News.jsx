import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";

function News() {
  const [addModal, setAddModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delId, setDelId] = useState(null);
  const [data, setData] = useState([]);

  // const getProduct = () => {
  //   setLoading(true);
  //   API.get("/news/")
  //     .then((res) => {
  //       setData(res.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // console.log(data);

  return (
    <div className="p-4">

      {/* <Modal>
        <div className="p-5 bg-white rounded-2xl relative">
          <button className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full">
            <IoClose size={27} />
          </button>
          <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
            Add Category
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5"
          >
            <input
              required
              type="text"
              className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
            />
            <input
              required
              className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
            />
            <input
              required
              className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
            />
            <button
              type="submit"
              className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
            >
              Add Category
            </button>
          </form>
        </div>
      </Modal>

      <Modal>
        <div className="p-5 bg-white rounded-2xl text-center">
          <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
          <p className="py-4">You are about to delete this category.</p>
          <div className="flex justify-center gap-4">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium">
              Cancel
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium">
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal> */}

      <div className="flex justify-between bg-white/18 px-4 py-5 rounded-xl mb-5">
        <div className="text-3xl tracking-wider font-extrabold text-white">
          News
        </div>
        <button className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
          Add News
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-xl shadow-white/5">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar"></div>
      </div>
    </div>
  );
}

export default News;
