import React, { useContext, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../utils/axios.js";
import { UserContext } from "../../context/Context.jsx";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const { getServerTokenDecode } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendProduct = async (data) => {
    try {
      const user = getServerTokenDecode() ;
      const {
        p_name,
        p_address,
        p_category,
        p_description,
        p_discount,
        p_price,
      } = data;

      const formdata = {
        p_name,
        p_image: imagePreview,
        p_price,
        p_discount,
        p_category,
        p_description,
        p_address,
        user:user._id 
      };

      let res = await axios.post("/product/add", formdata);
      toast.success(res.data.message);
      navigate("/factory");
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="w-full h-auto py-[15vh]">
      <div className="md:w-1/2 mx-6 md:mx-auto">
        <div className="flex gap-10">
          <FaArrowLeft
            size={"1.5em"}
            className="mt-3 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-4xl font-semibold">Drop Some Prduct</h1>
        </div>

        <form
          className="mt-10 md:mx-5"
          onSubmit={handleSubmit((data) => sendProduct(data))}
        >
          <h1 className="text-sm">Title</h1>
          <input
            className="bg-transparent text-xl font-semibol md:mx-5d px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="text"
            placeholder="Product name"
            {...register("p_name", { required: true })}
          />
          <br />
          {errors.p_name && (
            <span className="text-red-600 font-semibold">
              Title is required
            </span>
          )}

          {imagePreview && (
            <>
              <h1 className="text-sm">Preview</h1>
              <img
                className="h-20  my-3"
                src={imagePreview}
                alt="img Preview"
              />
            </>
          )}

          <h1 className="text-sm">Item photo</h1>
          <input
            className="bg-transparent text-xl font-semibol md:mx-5d px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="file"
            accept="image/*"
            placeholder="Upload photo"
            {...register("p_image", { required: true })}
            onChange={(e) => {
              const img = e.target.files[0];
              
              const reader = new FileReader() ;
              reader.onloadend = function(){
                setImagePreview(reader.result);
              }
              reader.readAsDataURL(img)

            }}
          />
          <br />
          {errors.p_image && (
            <span className="text-red-600 font-semibold">
              Image is required
            </span>
          )}

          <h1 className="text-sm">Price</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            type="number"
            placeholder="Item price"
            {...register("p_price", { required: true, min: 10 })}
          />
          <br />
          {errors.p_price && (
            <span className="text-red-600 font-semibold">
              Price is required
            </span>
          )}

          <h1 className="text-sm">Discount (%)</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            type="number"
            placeholder="Place any discount (if any)"
            {...register("p_discount", { required: true, min: 0, max: 99 })}
          />
          <br />
          {errors.p_discount && (
            <span className="text-red-600 font-semibold">
              Discount is required
            </span>
          )}

          <h1 className="text-sm">Category</h1>
          <select
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5 cursor-pointer"
            defaultValue="Select" // Set defaultValue for default selection
            {...register("p_category", { required: true })}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="fashion">Fashion</option>
            <option value="gadgets">Gadgets</option>
            <option value="grocery">Grocery</option>
            <option value="home-items">Home items</option>
          </select>
          <br />
          {errors.p_category && (
            <span className="text-red-600 font-semibold">
              Category is required
            </span>
          )}

          <h1 className="text-sm">Description</h1>
          <textarea
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            rows="4"
            placeholder="Product description"
            {...register("p_description", { required: true })}
          ></textarea>
          <br />
          {errors.p_description && (
            <span className="text-red-600 font-semibold">
              Description is required
            </span>
          )}

          <h1 className="text-sm">Import Address</h1>
          <textarea
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            rows="4"
            placeholder="Zippy House ,123 Center Ln.Plymouth, MN 55441"
            {...register("p_address", { required: true })}
          ></textarea>
          <br />
          {errors.p_address && (
            <span className="text-red-600 font-semibold">
              Address is required
            </span>
          )}

          <br />
          <button className="bg-green-400 my-2 font-bold rounded-full px-6 py-3 ">
            Add product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
