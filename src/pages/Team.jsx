import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";

function Team() {
  const api = "https://testaoron.limsa.uz/api/team-section";
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");

  //get-------------------------------
  const getApi = () => {
    setLoading(true);
    API.get("/team-section")
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

  //delete------------------------------------------
  const [delId, setDelId] = useState(null);
  const [delModal, setDelModal] = useState(false);
  const handleDelete = (id) => {
    setDelModal(true);
    setDelId(id);
  };
  const teamDelete = () => {
    console.log(delId);
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
  };

  //-----------------------------post-edit--------------
  const [addModal, setAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    image: "",
    full_name: "",
    position_de: "",
    position_ru: "",
    position_en: "",
  });

  const openAddModal = () => {
    setFormData({
      file: "",
      full_name: "",
      position_de: "",
      position_ru: "",
      position_en: "",
    });
    setEditId(null);
    setAddModal(true);
  };

  const handleEdit = (item) => {
    setAddModal(true);
    setEditId(item.id);
    setFormData({
      file: item.image,
      full_name: item.full_name,
      position_en: item.position_en,
      position_ru: item.position_ru,
      position_de: item.position_de,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("full_name", formData.full_name);
    form.append("position_en", formData.position_en);
    form.append("position_ru", formData.position_ru);
    form.append("position_de", formData.position_de);

    if (formData.image instanceof File) {
      form.append("file", formData.image);
    } else if (editId) {
      form.append("file", formData.image); // eski rasm bo‘lsa, string holatida yubor
    }

    const apiMethod = editId ? "PATCH" : "POST";
    const url = editId ? `${api}/${editId}` : api;

    fetch(url, {
      method: apiMethod,
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-type": "multipart/form-data",
      },
      body: form,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Xatolik yuz berdi");
        return res.json();
      })
      .then(() => {
        toast.success(
          editId ? "Muvaffaqiyatli tahrirlandi" : "Yangi qo‘shildi"
        );
        setAddModal(false);
        setEditId(null); // reset qilamiz
        setFormData({
          image: "",
          full_name: "",
          position_en: "",
          position_ru: "",
          position_de: "",
        });
        getApi();
      })
      .catch((err) => {
        toast.error("Xatolik: " + err.message);
        console.error(err);
      });
  };

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
              {editId ? "Edit Team" : "Add Team"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                required
                placeholder="full name"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                type="text"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                placeholder="Position (English)"
                value={formData.position_en}
                onChange={(e) =>
                  setFormData({ ...formData, position_en: e.target.value })
                }
                type="text"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                placeholder="Position (russian)"
                value={formData.position_ru}
                onChange={(e) =>
                  setFormData({ ...formData, position_ru: e.target.value })
                }
                type="text"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                placeholder="Position (german)"
                value={formData.position_de}
                onChange={(e) =>
                  setFormData({ ...formData, position_de: e.target.value })
                }
                type="text"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />

              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                {editId ? "Save Team" : "Add Team"}
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
                onClick={teamDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex justify-between bg-white/18 px-4 py-5 rounded-xl mb-5">
        <div className="text-3xl tracking-wider font-extrabold text-white">
          Team
        </div>
        <button
          onClick={openAddModal}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add Team
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
                      Full Name{" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Position{" "}
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
                        {item.full_name}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.position_en}
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

export default Team;
