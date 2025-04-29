import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";

function Faq() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getApi = () => {
    setLoading(true);
    API.get("/faq")
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
  console.log(data);

  // ----------------------------post edit---------
  const [modal, setModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    question_en: "",
    question_ru: "",
    question_de: "",
    answer_en: "",
    answer_ru: "",
    answer_de: "",
  });
  const openModal = () => {
    setModal(!modal);
    setFormData({
      question_en: "",
      question_ru: "",
      question_de: "",
      answer_en: "",
      answer_ru: "",
      answer_de: "",
    });
    setEditId(null);
  };
  const handleEdit = (item) => {
    setModal(true);
    setEditId(item.id);
    setFormData({
      question_en: item.question_en,
      question_ru: item.question_ru,
      question_de: item.question_de,
      answer_en: item.answer_en,
      answer_ru: item.answer_ru,
      answer_de: item.answer_de,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const apiMethod = editId ? API.patch : API.post;
    const apiUrl = editId ? `/faq/${editId}` : "/faq";
    apiMethod(apiUrl, formData)
      .then((res) => {
        toast.success(res.statusText);
        setModal(false);
        getApi()
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  // -----------------------------delete
  const [delModal, setDelModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const deleteId = (id) => {
    setDelModal(true);
    setDelId(id);
  };
  const handleDelete = () => {
    if (delId) {
      API.delete(`/faq/${delId}`)
        .then((res) => {
          toast.success(res.statusText);
          setDelModal(false);
          getApi();
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="p-4">
      {modal && (
        <Modal onClose={openModal}>
          <div className="p-5 bg-white rounded-2xl relative">
            <button
              onClick={openModal}
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
                type="text"
                placeholder="Question en"
                value={formData.question_en}
                onChange={(e) =>
                  setFormData({ ...formData, question_en: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="text"
                placeholder="Question ru"
                value={formData.question_ru}
                onChange={(e) =>
                  setFormData({ ...formData, question_ru: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="text"
                placeholder="Question de"
                value={formData.question_de}
                onChange={(e) =>
                  setFormData({ ...formData, question_de: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="text"
                placeholder="Answer en"
                value={formData.answer_en}
                onChange={(e) =>
                  setFormData({ ...formData, answer_en: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
               <input
                required
                type="text"
               placeholder="Answer ru"
                value={formData.answer_ru}
                onChange={(e) =>
                  setFormData({ ...formData, answer_ru: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
               <input
                required
                type="text"
                placeholder="Answer de"
                value={formData.answer_de}
                onChange={(e) =>
                  setFormData({ ...formData, answer_de: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />

              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                Add Faq
              </button>
            </form>
          </div>
        </Modal>
      )}

      {delModal && (
        <Modal onClose={() => setDelModal(false)}>
          <div className="p-5 bg-white rounded-2xl text-center">
            <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
            <p className="py-4">You are about to delete this Faq</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDelModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
          Faq
        </div>
        <button
          onClick={openModal}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add Faq
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
                      Question (EN){" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Answer (EN){" "}
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
                        {item.question_en}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item.answer_en}
                      </td>
                      <td className="py-3 border border-gray-600">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-500 hover:scale-105 duration-150 hover:underline mr-2 font-medium cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteId(item.id)}
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

export default Faq;
