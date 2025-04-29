import React, { useEffect, useState } from "react";
import API from "../api/Axios";
import { FaSpinner } from "react-icons/fa";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdImageNotSupported } from "react-icons/md";

function Category() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name_en: "",
    name_de: "",
    name_ru: "",
  });

  const modalOch = () => {
    setIsModal(!isModalOpen);
    setFormData({
      name_en: "",
      name_de: "",
      name_ru: "",
    });
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const metod = editId ? API.patch : API.post;
    const apiUrl = editId ? `/category/${editId}` : "/category";
    metod(apiUrl, formData)
      .then((res) => {
        setIsModal(false);
        toast.success(res.statusText);
        setFormData({ name_en: "", name_de: "", name_ru: "" });
        getCategory();
        setEditId(null);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.statusText);
      });
  };
  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      name_de: item.name_de,
      name_en: item.name_en,
      name_ru: item.name_ru,
    });
    setIsModal(true); 
  };

  const getCategory = () => {
    setLoading(true);
    API.get("/category")
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleDelete = (categoryId) => {
    setCategoryIdToDelete(categoryId);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (categoryIdToDelete) {
      API.delete(`/category/${categoryIdToDelete}`)
        .then((res) => {
          toast.success(res.statusText);
          getCategory();
          setIsDeleteModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setIsDeleteModalOpen(false);
        });
    }
  };

  return (
    <div className="p-4">
      {isModalOpen && (
        <Modal onClose={modalOch}>
          <div className="p-5 bg-white rounded-2xl relative">
            <button
              onClick={modalOch}
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
            >
              <IoClose size={27} />
            </button>
            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              {editId ? "Edit Category" : "Add Category"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                required
                type="text"
                value={formData.name_en}
                onChange={(e) =>
                  setFormData({ ...formData, name_en: e.target.value })
                }
                placeholder="Name en"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="text"
                value={formData.name_ru}
                onChange={(e) =>
                  setFormData({ ...formData, name_ru: e.target.value })
                }
                placeholder="Name ru"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="text"
                value={formData.name_de}
                onChange={(e) =>
                  setFormData({ ...formData, name_de: e.target.value })
                }
                placeholder="Name de"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />

              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                {editId ? "Edit Category" : "Add Category"}
              </button>
            </form>
          </div>
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-5 bg-white rounded-2xl text-center">
            <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
            <p className="py-4">You are about to delete this category.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex justify-between bg-white/18 px-4 py-5 rounded-xl mb-5">
        <div className="text-3xl tracking-wider font-extrabold text-white">
          Category
        </div>
        <button
          onClick={modalOch}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add Category
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-2xl">
        <div className="overflow-y-auto max-h-[calc(110vh-200px)] no-scrollbar">
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
                    <th className="py-3 px-2 text-center border border-gray-600 w-16 sticky top-0 z-20 bg-gray-700">
                      №
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title Eng
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title Ru
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title De
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
                        {item.name_en}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.name_ru}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.name_de}
                      </td>
                      <td className="py-3 border border-gray-600">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 hover:scale-105 duration-150 hover:underline mr-2 font-medium cursor-pointer"
                        >
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

export default Category;
