import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";

function News() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getApi = () => {
    setLoading(true);
    API.get("/news")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    getApi();
  }, []);

  // ------------------------------post-edit-------------

  const api = "https://testaoron.limsa.uz/api/news";
  const [formData, setFormData] = useState({
    title_en: "",
    title_ru: "",
    title_de: "",
    description_en: "",
    description_ru: "",
    description_de: "",
    file: null,
  });
  const [addModal, setAddModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const openModal = () => {
    setAddModal(!addModal);
    setFormData({
      title_en: "",
      title_ru: "",
      title_de: "",
      description_en: "",
      description_ru: "",
      description_de: "",
      file: null,
      preview: null,
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        file: file,
        preview: file ? URL.createObjectURL(file) : null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title_en", formData.title_en);
    form.append("title_ru", formData.title_ru);
    form.append("title_de", formData.title_de);
    form.append("description_en", formData.description_en);
    form.append("description_ru", formData.description_ru);
    form.append("description_de", formData.description_de);
    if (formData.file) {
      form.append("file", formData.file);
    }

    const url = editId ? `${api}/${editId}` : api;
    const apiMethod = editId ? "PATCH" : "POST";
    fetch(url, {
      method: apiMethod,
      body: form,
    })
      .then((res) => {
        if (!res.ok) {
          toast.error("hatolik");
        }
        return res.json();
      })
      .then((data) => {
        toast.success(
          editId ? "Muvaffaqiyatli o'zgartirildi" : "Muvaffaqiyatli qo'shildi"
        );
        setFormData({
          title_en: "",
          title_ru: "",
          title_de: "",
          description_en: "",
          description_ru: "",
          description_de: "",
          file: null,
        });
        setEditId(null);
        setAddModal(false);
      })
      .catch((err) => {
        toast.error("Xatolik");
        console.log(err);
      })
      .finally(() => {
        setAddModal(false);
        getApi();
      });
  };
  console.log(editId);
  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData({
      title_en: item.title_en || "",
      title_ru: item.title_ru || "",
      title_de: item.title_de || "",
      description_en: item.description_en || "",
      description_ru: item.description_ru || "",
      description_de: item.description_de || "",
      file: item.file || null,
      preview: `https://testaoron.limsa.uz/${item.image}`,
    });
    setAddModal(true);
  };

  //---------------------------delete
  const [delModal, setDelModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const token = localStorage.getItem("token");
  const handleDelete = (id) => {
    setDelId(id);
    setDelModal(true);
  };
  const newsDelete = () =>
    fetch(`${api}/${delId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        setDelModal(false);
        getApi();
        toast.success("O'chirildi");
      })
      .catch((err) => {
        toast.error("Xatolik: " + err.message);
        console.error("Delete error:", err);
      })
      .finally(() => {
        setDelModal(false);
      });

  return (
    <div className="p-4">
      {addModal && (
        <Modal onClose={() => setAddModal(false)}>
          <div className="p-5 bg-white rounded-2xl relative">
            <button
              onClick={() => setAddModal(false)}
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
            >
              <IoClose size={27} />
            </button>
            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              Add Category
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex gap-3">
                <input
                  required
                  type="text"
                  name="title_en"
                  value={formData.title_en}
                  onChange={handleChange}
                  placeholder="Title (en)"
                  className="py-2  rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
                <input
                  required
                  type="text"
                  name="title_ru"
                  value={formData.title_ru}
                  onChange={handleChange}
                  placeholder="Title (ru)"
                  className="py-2  rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
                <input
                  required
                  type="text"
                  name="title_de"
                  value={formData.title_de}
                  onChange={handleChange}
                  placeholder="Title (de)"
                  className="py-2  rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
              </div>
              <div className="flex gap-3">
                <input
                  required
                  type="text"
                  name="description_en"
                  value={formData.description_en}
                  onChange={handleChange}
                  placeholder="description (en)"
                  className="py-2 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
                <input
                  required
                  type="text"
                  name="description_ru"
                  value={formData.description_ru}
                  onChange={handleChange}
                  placeholder="description (ru)"
                  className="py-2 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
                <input
                  required
                  type="text"
                  name="description_de"
                  value={formData.description_de}
                  onChange={handleChange}
                  placeholder="description (de)"
                  className="py-2 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
              </div>
              <div className="flex w-full gap-5 items-start">
                <input
                  required
                  type="file"
                  name="file"
                  onChange={handleChange}
                  className="py-2 w-full rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
                />
                {formData.preview && (
                  <div className="w-50 h-30">
                    <img
                      src={formData.preview}
                      alt={formData.title_en}
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
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
      {delModal && (
        <Modal onClose={() => setDelModal(false)}>
          <div className="p-5 bg-white rounded-2xl text-center">
            <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
            <p className="py-4">You are about to delete this category.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDelModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={newsDelete}
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
          News
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add News
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
                      Images{" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title (EN){" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Description
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
                          src={`https://testaoron.limsa.uz/${item.image}`}
                          alt={item.title_en}
                          className="w-16 h-16 object-cover mx-auto rounded-md"
                        />
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.title_en?.split(" ").slice(0, 3).join(" ") +
                          "..."}
                      </td>
                      <td className="py-3 border border-gray-600 ">
                        {item.description_en?.split(" ").slice(0, 5).join(" ") +"..."}
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
        </div>{" "}
      </div>
    </div>
  );
}

export default News;
