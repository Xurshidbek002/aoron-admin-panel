import { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { MdImageNotSupported } from "react-icons/md";
import API from "../api/Axios";
import { toast } from "react-toastify";

function Products() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getProduct = () => {
    setLoading(true);
    API.get("/product")
      .then((res) => {
        setData(res.data.data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const initialFormData = {
    title_ru: "",
    title_en: "",
    title_de: "",
    description_ru: "",
    description_en: "",
    description_de: "",
    price: "",
    min_sell: "",
    category_id: "",
    discount_id: "",
    sizes_id: [],
    colors_id: [],
    materials: {
      cotton: "",
      wool: "",
    },
    files: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [discount, setDiscount] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    API.get("/category").then((res) => {
      setCategory(res.data.data);
    });
    API.get("/colors").then((res) => {
      setColors(res.data.data);
    });
    API.get("/sizes").then((res) => {
      setSizes(res.data.data);
    });
    API.get("/discount").then((res) => {
      setDiscount(res.data.data);
    });
  }, []);

  const addEditModal = () => {
    setIsOpen(true);
    setFormData(initialFormData);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title_ru", formData.title_ru);
    form.append("title_en", formData.title_en);
    form.append("title_de", formData.title_de);
    form.append("description_ru", formData.description_ru);
    form.append("description_en", formData.description_en);
    form.append("description_de", formData.description_de);
    form.append("price", formData.price);
    form.append("min_sell", formData.min_sell);
    form.append("category_id", formData.category_id);
    form.append("discount_id", formData.discount_id);
    formData.sizes_id.forEach((id) => {
      form.append("sizes_id[]", id);
    });
    formData.colors_id.forEach((id) => {
      form.append("colors_id[]", id);
    });
    form.append("materials", JSON.stringify(formData.materials));
    if (formData.files) {
      form.append("files", formData.files);
    }

    const ApiMethod = editId ? API.patch : API.post;
    const ApiUrl = editId ? `/product/${editId}` : "/product";

    ApiMethod(ApiUrl, form)
      .then((res) => {
        toast.success(res.statusText || "Success");
        setIsOpen(false);
        getProduct();
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error");
      });
  };

  // Tahrirlash tugmasi bosilganda formani to‘ldirish
  const handleEdit = (item) => {
    setEditId(item.id);
    setIsOpen(true);
    setFormData({
      title_ru: item.title_ru || "",
      title_en: item.title_en || "",
      title_de: item.title_de || "",
      description_ru: item.description_ru || "",
      description_en: item.description_en || "",
      description_de: item.description_de || "",
      price: item.price || "",
      min_sell: item.min_sell || "",
      category_id: item.category_id || "",
      discount_id: item.discount_id || "",
      sizes_id: item.sizes_id || [],
      colors_id: item.colors_id || [],
      materials: item.materials || { cotton: "", wool: "" },
      files: null,
    });
  };

  const [deleteId, setDeleteId] = useState(null);
  const [delModal, setDelModal] = useState(false);
  const handleDelete = (id) => {
    setDeleteId(id);
    setDelModal(true);
  };
  const productsDelete = () => {
    API.delete(`/product/${deleteId}`)
      .then((res) => {
        toast.success("O'chirildi");
        setDelModal(false);
      })
      .catch((err) => {
        toast.error("Xatolik");
      })
      .finally(() => {
        setDelModal(false);
        setDeleteId(null);
        getProduct();
      });
  };

  return (
    <div className="p-4">
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <div className="p-5 w-180 h-130 overflow-y-auto bg-white rounded-2xl overflow-hidden no-scrollbar relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
            >
              <IoClose size={27} />
            </button>

            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              {editId ? "Edit Product" : "Add Product"}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              {/* Title fields */}
              <div className=" flex gap-2">
                <input
                  type="text"
                  value={formData.title_ru}
                  onChange={(e) =>
                    setFormData({ ...formData, title_ru: e.target.value })
                  }
                  placeholder="Title (ru)"
                  className="bg-gray-100 px-3 py-1 w-full rounded-sm text-black outline-blue-400"
                  required
                />
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) =>
                    setFormData({ ...formData, title_en: e.target.value })
                  }
                  placeholder="Title (en)"
                  className="bg-gray-100 px-3 py-1 w-full rounded-sm text-black outline-blue-400"
                  required
                />
                <input
                  type="text"
                  value={formData.title_de}
                  onChange={(e) =>
                    setFormData({ ...formData, title_de: e.target.value })
                  }
                  placeholder="Title (de)"
                  className="bg-gray-100 px-3 py-1 w-full rounded-sm text-black outline-blue-400"
                  required
                />
              </div>
              {/* Description fields */}
              <div className="flex gap-2">
                <textarea
                  value={formData.description_ru}
                  onChange={(e) =>
                    setFormData({ ...formData, description_ru: e.target.value })
                  }
                  placeholder="Description (ru)"
                  rows={3}
                  className="bg-gray-100 px-3 py-1 w-full rounded-sm text-black outline-blue-400 resize-none"
                  required
                />
                <textarea
                  value={formData.description_en}
                  onChange={(e) =>
                    setFormData({ ...formData, description_en: e.target.value })
                  }
                  placeholder="Description (en)"
                  rows={3}
                  className="bg-gray-100 px-3 py-1 w-full rounded-sm text-black outline-blue-400 resize-none"
                  required
                />
                <textarea
                  value={formData.description_de}
                  onChange={(e) =>
                    setFormData({ ...formData, description_de: e.target.value })
                  }
                  placeholder="Description (de)"
                  rows={3}
                  className="bg-gray-100 px-3 py-1 w-full rounded-sm text-black outline-blue-400 resize-none "
                  required
                />
              </div>

              {/* Price & Min Sell */}
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="Price"
                  required
                  className="bg-gray-200 w-full px-4 py-1 rounded-sm"
                />
                <input
                  type="number"
                  value={formData.min_sell}
                  onChange={(e) =>
                    setFormData({ ...formData, min_sell: e.target.value })
                  }
                  placeholder="Min Sell"
                  className="bg-gray-200 w-full px-4 py-1 rounded-sm"
                  required
                />

                {/* Category Select */}
                <select
                  value={formData.category_id}
                  onChange={(e) =>
                    setFormData({ ...formData, category_id: e.target.value })
                  }
                  className="bg-gray-200 w-full px-4 py-1 rounded-sm"
                  required
                >
                  <option value="">Select Category</option>
                  {category.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name_ru}
                    </option>
                  ))}
                </select>

                {/* Discount Select */}
                <select
                  value={formData.discount_id}
                  onChange={(e) =>
                    setFormData({ ...formData, discount_id: e.target.value })
                  }
                  className="bg-gray-200 w-full px-4 py-1 rounded-sm"
                >
                  <option value="">Select Discount</option>
                  {discount.map((dis) => (
                    <option key={dis.id} value={dis.id}>
                      {dis.discount}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2 justify-center">
                {/* Sizes Checkboxes */}
                <div className="bg-gray-200 w-full p-2 rounded-sm">
                  <p className="font-bold text-gray-700">Sizes:</p>
                  <div className="flex flex-wrap gap-3">
                    {sizes.map((size) => (
                      <label key={size.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={size.id}
                          checked={formData.sizes_id.includes(size.id)} // bu yerda number
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            const updated = e.target.checked
                              ? [...formData.sizes_id, id]
                              : formData.sizes_id.filter((item) => item !== id);
                            setFormData({ ...formData, sizes_id: updated });
                          }}
                        />
                        {size.size}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors Checkboxes */}
                <div className="bg-gray-200 w-full p-2 rounded-sm">
                  <p className="font-bold text-gray-700">Colors:</p>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <label key={color.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={color.id}
                          checked={formData.colors_id.includes(color.id)} // ← endi bu ham number
                          onChange={(e) => {
                            const id = Number(e.target.value);
                            const updated = e.target.checked
                              ? [...formData.colors_id, id]
                              : formData.colors_id.filter(
                                  (item) => item !== id
                                );
                            setFormData({ ...formData, colors_id: updated });
                          }}
                        />
                        {color.color_en}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="">
                <h2 className="text-2xl">Materials</h2>
                <div className="flex gap-2">
                  {/* Materials */}
                  <input
                    type="number"
                    value={formData.materials.cotton}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        materials: {
                          ...formData.materials,
                          cotton: e.target.value,
                        },
                      })
                    }
                    placeholder="Cotton %"
                    className="px-4 py-1 bg-gray-200 w-full rounded-md input-no-spinner"
                  />
                  <input
                    type="number"
                    value={formData.materials.wool}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        materials: {
                          ...formData.materials,
                          wool: e.target.value,
                        },
                      })
                    }
                    placeholder="Wool %"
                    className="px-4 py-1 bg-gray-200 w-full rounded-md input-no-spinner"
                  />
                </div>
              </div>

              {/* File input */}
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, files: e.target.files[0] })
                }
                className="bg-blue-500 w-[40%] px-5 py-2 rounded-2xl"
              />

              {/* Submit */}
              <button
                type="submit"
                className="bg-blue-700 py-2 text-xl rounded-xl font-bold text-white"
              >
                {editId ? "Save Changes" : "Add Product"}
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
                onClick={productsDelete}
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
          Products
        </div>
        <button
          onClick={addEditModal}
          className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Add Products
        </button>
      </div>

      <div className="relative overflow-hidden rounded-md shadow-2xl">
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] no-scrollbar">
          {loading ? (
            <div className="flex flex-col gap-4 items-center py-5 text-3xl text-white">
              <FaSpinner className="animate-spin" />
              <div>loading</div>
            </div>
          ) : (
            <table className="min-w-full border-collapse border-spacing-0">
              {data && data.length > 0 ? (
                <thead>
                  <tr className="bg-gray-700 text-white">
                    <th className=" py-1 px-2 text-center border border-gray-600 w-16 sticky top-0 z-20 bg-gray-700">
                      №
                    </th>
                    <th className="  text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Images
                    </th>
                    <th className="  text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Title
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Description
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Price
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Category
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Colors
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Sizes
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Discount
                    </th>
                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
                      Materials
                    </th>

                    <th className=" text-center border border-gray-600 sticky top-0 z-20 bg-gray-700">
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
                      <td className="py-1 border border-gray-600">
                        {index + 1}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={`https://testaoron.limsa.uz/${item.images[0]}`}
                            alt={item.title_en}
                            className="w-12 h-12 object-cover mx-auto rounded-md"
                          />
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.title_en?.split(" ").slice(0, 1).join(" ") +
                          "..." || "-"}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.description_en?.split(" ").slice(0, 2).join(" ") +
                          "..." || "-"}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.price || "-"}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.category?.name_en
                          ?.split(" ")
                          .slice(0, 1)
                          .join(" ") + "..." || "-"}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.colors && item.colors.length > 0
                          ? item.colors
                              .map((color) => color.color_en)
                              .join(", ")
                          : "🤷‍♂️"}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item.sizes && item.sizes.length > 0
                          ? item.sizes.map((size) => size.size).join(", ")
                          : "🤷‍♂️"}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {item?.discount?.discount}
                      </td>
                      <td className="py-1 border border-gray-600">
                        {Object.entries(item?.materials || {}).map(
                          ([key, value]) => (
                            <div key={key}>
                              {key}: {value}
                            </div>
                          )
                        )}
                      </td>

                      <td className="py-1 border border-gray-600">
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

export default Products;
