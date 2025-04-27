import React, { useEffect, useState } from "react";
import API from "../api/Axios";
import { FaSpinner } from "react-icons/fa";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

function Category() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalModal] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);  // Store the category id to delete

  const [formData, setFormData] = useState({
    name_en: "",
    name_de: "",
    name_ru: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/category", formData)
      .then((res) => {
        setIsModalModal(false);
        toast.success(res.statusText);
        setFormData({ name_en: "", name_de: "", name_ru: "" });
        getCategory();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.statusText);
      });
  };

  const modalOch = () => {
    setIsModalModal(!isModalOpen);
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

  const handleDelete = (categoryId) => {
    setCategoryIdToDelete(categoryId);  // Store the category id to delete
    setIsDeleteModalOpen(true);         // Open the delete confirmation modal
  };

  const confirmDelete = () => {
    if (categoryIdToDelete) {
      API.delete(`/category/${categoryIdToDelete}`)
        .then((res) => {
          toast.success("Category deleted successfully");
          getCategory();
          setIsDeleteModalOpen(false);  // Close the delete modal
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error deleting category");
          setIsDeleteModalOpen(false);  // Close the delete modal in case of error
        });
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="p-4">
      {/* Add Category Modal */}
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
              Add Category
            </h1>
            <form
              onSubmit={handleSubmit}
              action=""
              className="flex flex-col gap-5"
            >
              <input
                required
                name="name_en"
                type="text"
                value={formData.name_en}
                onChange={handleChange}
                placeholder="Name en"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                name="name_de"
                type="text"
                value={formData.name_de}
                onChange={handleChange}
                placeholder="Name de"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                name="name_ru"
                type="text"
                value={formData.name_ru}
                onChange={handleChange}
                placeholder="Name ru"
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
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="p-5 bg-white rounded-2xl text-center">
            <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
            <p className="py-4">You are about to delete this category.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Category List Section */}
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

      <div className="relative overflow-hidden rounded-md shadow-md">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            {/* Fixed Header */}
            <div className="sticky top-0 z-10">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className="py-3 text-center border-b border-gray-600 w-16 sticky top-0 z-20 bg-gray-700">
                      №
                    </th>
                    <th className="py-3 text-center border-b border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title Eng
                    </th>
                    <th className="py-3 text-center border-b border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title Ru
                    </th>
                    <th className="py-3 text-center border-b border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title De
                    </th>
                    <th className="py-3 text-center border-b border-gray-600 sticky  z-20 bg-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
              <table className="min-w-full border-separate border-spacing-0">
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center">
                        <FaSpinner className="animate-spin mx-auto text-3xl text-white" />
                      </td>
                    </tr>
                  ) : data && data.length > 0 ? (
                    data.map((category, index) => (
                      <tr
                        key={category.id}
                        className="hover:bg-white/2 text-white text-center"
                      >
                        <td className="py-3 px-4 border-b border-gray-600">
                          {index + 1}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-600">
                          {category.name_en}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-600">
                          {category.name_ru}
                        </td>
                        <td className="py-3 px-4 border-b border-gray-600">
                          {category.name_de}
                        </td>
                        <td className="py-3  border-b border-gray-600 flex justify-center gap-5">
                          <button className="bg-blue-500 px-2 rounded-md font-medium cursor-pointer">
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="bg-red-500  px-2 rounded-md font-medium cursor-pointer"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-white">
                        No categories found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
