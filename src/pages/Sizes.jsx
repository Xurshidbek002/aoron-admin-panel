import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";

function Sizes() {
  const [addModal, setAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ size: "" });

  const getApi = () => {
    setLoading(true);
    API.get("/sizes")
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
  // ------------------post --- edit
  const handleEdit = (item) => {
    setEditId(item.id);
    setAddModal(true);
    setFormData({ size: item?.size });
  };
  const addModalOpen = () => {
    setAddModal(!addModal);
    setFormData({ size: "" });
    setEditId(null);
  };
  const postSizes = (e) => {
    e.preventDefault();
    const apiMethod = editId ? API.patch : API.post;
    const apiUrl = editId ? `/sizes/${editId}` : "/sizes";

    apiMethod(apiUrl, formData)
      .then((res) => {
        toast.success(res.statusText);
        setFormData({ size: "" });
        getApi();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setAddModal(false);
      });
  };

  // delete-----------------------
  const [delModal, setDelModal] = useState(false);
  const [delId, setDelId] = useState(null);
  const handleDelete = (id) => {
    setDelModal(true);
    setDelId(id);
  };
  const appDelete = () => {
    if (delId) {
      API.delete(`/sizes/${delId}`)
        .then((res) => {
          toast.success(res.statusText);
          getApi();
        })
        .catch((err) => {
          toast.error(err.message);
          console.log(err);
        })
        .finally(() => {
          setDelModal(false);
        });
    }
  };

  return (
    <div className="p-4">
      {addModal && (
        <Modal onClose={addModalOpen}>
          <div className="p-5 bg-white rounded-2xl relative">
            <button
              onClick={addModalOpen}
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
            >
              <IoClose size={27} />
            </button>
            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              {editId ? "Edit Sizes" : "Add Sizes"}
            </h1>
            <form
              action=""
              onSubmit={postSizes}
              className="flex flex-col gap-5"
            >
              <input
                placeholder="Size"
                required
                value={formData.size}
                onChange={(e) =>
                  setFormData({ ...formData, size: e.target.value })
                }
                type="text"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                {editId ? "Edit Sizes" : "Add Sizes"}
              </button>
            </form>
          </div>
        </Modal>
      )}

      {delModal && (
        <Modal onClose={() => setDelModal(false)}>
          <div className="p-5 bg-white rounded-2xl text-center">
            <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
            <p className="py-4">You are about to delete this Sizes.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDelModal(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={appDelete}
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
          Sizes
        </div>
        <button
          onClick={addModalOpen}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add Sizes
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
                      Sizes
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
                        {item.size}
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

export default Sizes;
