import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";

function Contact() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    phone_number: "",
    email: "",
    address_en: "",
  });
  const [selectedId, setSelectedId] = useState(null);

  const getApi = () => {
    setLoading(true);
    API.get("/contact")
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getApi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = formData.id ? API.patch : API.post;
    const url = formData.id ? `/contact/${formData.id}` : "/contact";

    method(url, formData)
      .then(() => {
        setShowFormModal(false);
        setFormData({ id: null, phone_number: "", email: "", address_en: "" });
        getApi();
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (item) => {
    setFormData(item);
    setShowFormModal(true);
  };

  const handleDelete = () => {
    API.delete(`/contact/${selectedId}`)
      .then(() => {
        setShowDeleteModal(false);
        setSelectedId(null);
        getApi();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-4">
      {/* Add / Edit Modal */}
      {showFormModal && (
        <Modal onClose={()=>setShowFormModal(false)}>
          <div className="p-5 bg-white rounded-2xl w-100 relative">
            <button
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
              onClick={() => setShowFormModal(false)}
            >
              <IoClose size={27} />
            </button>
            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              {formData.id ? "Edit Contact" : "Add Contact"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <input
                required
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                className="py-2 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="py-2 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                placeholder="Address (EN)"
                value={formData.address_en}
                onChange={(e) =>
                  setFormData({ ...formData, address_en: e.target.value })
                }
                className="py-2 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                {formData.id ? "Update Contact" : "Add Contact"}
              </button>
            </form>
          </div>
        </Modal>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal>
          <div className="p-5 bg-white rounded-2xl text-center w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
            <p className="py-4">You are about to delete this contact.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex justify-between bg-white/18 px-4 py-5 rounded-xl mb-5">
        <div className="text-3xl tracking-wider font-extrabold text-white">
          Contact
        </div>
        <button
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
          onClick={() => {
            setFormData({ id: null, phone_number: "", email: "", address_en: "" });
            setShowFormModal(true);
          }}
        >
          Add Contact
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-2xl">
        <div className="overflow-y-auto max-h-[calc(110vh-200px)] no-scrollbar">
          {loading ? (
            <div className="flex flex-col gap-4 items-center py-5 text-3xl text-white">
              <FaSpinner className="animate-spin" />
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
                      Phone Number
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Email
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Address (EN)
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
                {data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-white/2 text-white text-center">
                    <td className="py-3 border border-gray-600">{index + 1}</td>
                    <td className="py-3 border border-gray-600">{item.phone_number}</td>
                    <td className="py-3 border border-gray-600">{item.email}</td>
                    <td className="py-3 border border-gray-600">{item.address_en}</td>
                    <td className="py-3 border border-gray-600">
                      <button
                        className="text-blue-500 hover:scale-105 duration-150 hover:underline mr-2 font-medium cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:scale-105 duration-150 hover:underline font-medium cursor-pointer"
                        onClick={() => {
                          setSelectedId(item.id);
                          setShowDeleteModal(true);
                        }}
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

export default Contact;
