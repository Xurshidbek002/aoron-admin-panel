import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";

function Discount() {
  const [addModal, setAddModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [delId, setDelId] = useState(null);
  const [data, setData] = useState([]);

  // -----------------get-------------
  const getApi = () => {
    setLoading(true);
    API.get("/discount")
      .then((res) => {
        setData(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getApi();
  }, []);

  // ------------------post---------------
  const [formData, setFormData] = useState({
    discount: "",
    started_at: "",
    finished_at: "",
    status: false,
  });
  const postModal = () => {
    setAddModal(!addModal);
    setFormData({
      discount: "",
      started_at: "",
      finished_at: "",
      status: false,
    });
  };
  const post = (e) => {
    e.preventDefault();
    API.post("/discount", formData)
      .then((res) => {
        console.log(res);
        setAddModal(false);
        toast.success(res.statusText);
        setFormData({
          discount: "",
          started_at: "",
          finished_at: "",
          status: false,
        });
        getApi();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setAddModal(false);
      });
  };
  //--------------------------------delete-----------------
  const handleDelete = (itemDelete) => {
    setDelId(itemDelete);
    setDelModal(true);
  };

  const deleteFunk = () => {
    if (delId) {
      API.delete(`/discount/${delId}`)
        .then((res) => {
          getApi();
          toast.success(res.statusText);
          setDelModal(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
          setDelModal(false);
        });
    }
  };
  return (
    <div className="p-4">
      {addModal && (
        <Modal onClose={postModal}>
          <div className="p-5 bg-white rounded-2xl relative">
            <button
              onClick={postModal}
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
            >
              <IoClose size={27} />
            </button>
            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              Add Discount
            </h1>
            <form onSubmit={post} className="flex flex-col gap-5">
              <input
                required
                type="number"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: Number(e.target.value) })
                }
                placeholder="Discount (%)"
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="date"
                value={formData.started_at}
                onChange={(e) =>
                  setFormData({ ...formData, started_at: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <input
                required
                type="date"
                value={formData.finished_at}
                onChange={(e) =>
                  setFormData({ ...formData, finished_at: e.target.value })
                }
                className="py-2 w-100 rounded-md bg-cyan-400/15 focus:outline-cyan-500 px-4"
              />
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.checked })
                  }
                  className="w-5 h-5"
                />
                Active
              </label>
              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                Add discount
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
                onClick={deleteFunk}
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
          Discount
        </div>
        <button
          onClick={postModal}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add Discount
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-xl shadow-white/5">
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
                      Discount (%)
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Created Date{" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Finished Date{" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Status{" "}
                    </th>
                    <th className="py-3 px-2 text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Actions{" "}
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
                        {item?.discount}%
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item?.started_at}
                      </td>
                      <td className="py-3 border border-gray-600">
                        {item?.finished_at}
                      </td>
                      <td className="py-3 border border-gray-600">
                        <span
                          className={`${
                            item.status == true
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.status == true ? "active" : "inActive"}
                        </span>
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

export default Discount;
