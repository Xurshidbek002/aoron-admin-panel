import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";
import { span } from "motion/react-client";

function Products() {
  const [addModal, setAddModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delId, setDelId] = useState(null);
  const [data, setData] = useState();

  const getProduct = () => {
    setLoading(true);
    API.get("/product")
      .then((res) => {
        setData(res.data.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

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
          <form action="" className="flex flex-col gap-5">
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
      </Modal> */}

      {/* 
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
          Products
        </div>
        <button className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
          Add Products
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-xl shadow-white/5">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
          {loading ? (
            <div className="flex flex-col gap-4 items-center py-5 text-3xl text-white">
              <FaSpinner className="animate-spin " />
              <div className="">loading</div>
            </div>
          ) : (
            <table className="min-w-full border-collapse border-spacing-0">
              {data && data.length > 0 ? (
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="py-3 text-center border border-gray-600 w-16 sticky top-0 z-20 bg-gray-700">
                      №
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Images
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Description
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Price{" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Category
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Colors
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Sizes
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Discount
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Materials
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="100" className="py-8 text-center text-white">
                    No Data Available
                      <MdImageNotSupported size={30} className="mx-auto mt-5" />
                    </td>
                  </tr>
                </tbody>
              )}

              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-white/2 text-white text-center"
                    >
                      <td className="py-3 border border-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-3 border border-gray-600">
                        <img
                          src={`https://back.ifly.com.uz/${item.images[0]}`}
                          alt={item.title_en}
                          className="w-16 h-16 object-cover mx-auto rounded-md"
                        />
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.title_en}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.description_en}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.price}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.category?.name_en}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.colors && item.colors.length > 0
                          ? item.colors
                              .map((color) => color.color_en)
                              .join(", ")
                          : "-"}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.sizes && item.sizes.length > 0
                          ? item.sizes.map((size) => size.size).join(", ")
                          : "-"}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.discount ? item.discount : "-"}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.materials &&
                        Object.keys(item.materials).length > 0
                          ? JSON.stringify(item.materials)
                          : "-"}
                      </td>
                      <td className="py-3 border border-gray-600">
                        <button className="text-blue-500 hover:scale-105 duration-150 hover:underline mr-2 font-medium cursor-pointer">
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-500 hover:scale-105 duration-150 hover:underline font-medium cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
