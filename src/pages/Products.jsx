import React, { useEffect, useState } from "react";
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
    form.append("sizes_id", formData.sizes_id.join(","));
    form.append("colors_id", formData.colors_id.join(","));
    form.append("materials", JSON.stringify(formData.materials));
    if (formData.files) {
      form.append("files", formData.files);
    }

    const ApiMethod = editId ? API.patch : API.post;
    const ApiUrl = editId ? `/product${editId}` : "/product";
    ApiMethod(ApiUrl, form)
      .then((res) => {
        toast.success(res.statusText);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

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

  return (
    <div className="p-4">
      {isOpen && (
        <Modal onClose={()=>setIsOpen(false)}>
          <div className="p-5 w-200 h-130 overflow-y-auto bg-white rounded-2xl relative">
            <button
              onClick={()=>setIsOpen(false)}
              className="absolute top-2 right-2 p-1 hover:bg-black/20 rounded-full"
            >
              <IoClose size={27} />
            </button>
            <h1 className="text-2xl pb-4 text-blue-800 font-extrabold">
              {editId ? "Edit Product" : "Add Product"}
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Title fields */}
              <input
                type="text"
                value={formData.title_ru}
                onChange={(e) =>
                  setFormData({ ...formData, title_ru: e.target.value })
                }
                placeholder="Title (ru)"
                className="input"
                required
              />
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) =>
                  setFormData({ ...formData, title_en: e.target.value })
                }
                placeholder="Title (en)"
                className="input"
                required
              />
              <input
                type="text"
                value={formData.title_de}
                onChange={(e) =>
                  setFormData({ ...formData, title_de: e.target.value })
                }
                placeholder="Title (de)"
                className="input"
                required
              />

              {/* Description fields */}
              <textarea
                value={formData.description_ru}
                onChange={(e) =>
                  setFormData({ ...formData, description_ru: e.target.value })
                }
                placeholder="Description (ru)"
                className="input"
                required
              />
              <textarea
                value={formData.description_en}
                onChange={(e) =>
                  setFormData({ ...formData, description_en: e.target.value })
                }
                placeholder="Description (en)"
                className="input"
                required
              />
              <textarea
                value={formData.description_de}
                onChange={(e) =>
                  setFormData({ ...formData, description_de: e.target.value })
                }
                placeholder="Description (de)"
                className="input"
                required
              />

              {/* Price & Min Sell */}
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="Price"
                className="input"
                required
              />
              <input
                type="number"
                value={formData.min_sell}
                onChange={(e) =>
                  setFormData({ ...formData, min_sell: e.target.value })
                }
                placeholder="Min Sell"
                className="input"
                required
              />

              {/* Category Select */}
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="input"
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
                className="input"
              >
                <option value="">Select Discount</option>
                {discount.map((dis) => (
                  <option key={dis.id} value={dis.id}>
                    {dis.name_ru}
                  </option>
                ))}
              </select>

              {/* Sizes Multi Select */}
              <select
                multiple
                value={formData.sizes_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sizes_id: Array.from(
                      e.target.selectedOptions,
                      (opt) => opt.value
                    ),
                  })
                }
                className="input"
              >
                {sizes.map((size) => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </select>

              {/* Colors Multi Select */}
              <select
                multiple
                value={formData.colors_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    colors_id: Array.from(
                      e.target.selectedOptions,
                      (opt) => opt.value
                    ),
                  })
                }
                className="input"
              >
                {colors.map((color) => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </select>

              {/* Materials */}
              <input
                type="text"
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
                className="input"
              />
              <input
                type="text"
                value={formData.materials.wool}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    materials: { ...formData.materials, wool: e.target.value },
                  })
                }
                placeholder="Wool %"
                className="input"
              />

              {/* File input */}
              <input
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, files: e.target.files[0] })
                }
                className="input"
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

      {/* <Modal onClose={() => setDelModal(false)}>
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
        </Modal> */}

      <div className="flex justify-between bg-white/18 px-4 py-5 rounded-xl mb-5">
        <div className="text-3xl tracking-wider font-extrabold text-white">
          Products
        </div>
        <button onClick={addEditModal} className="px-4 py-2 cursor-pointer bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition">
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
                            src={`https://back.ifly.com.uz/${item.images[0]}`}
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
                              {key}: {value}%
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
                        <button className="text-red-500 hover:scale-105 duration-150 hover:underline font-medium cursor-pointer">
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
