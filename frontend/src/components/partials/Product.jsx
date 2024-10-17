import React, { useContext } from "react";
import { FaPlus } from "react-icons/fa";
import { UserContext } from "../../context/Context";
import axios from "../../utils/axios.js";
import toast from "react-hot-toast";

const Product = ({ data }) => {
  const { p_id, p_name, p_price, p_description, p_image, p_discount } =
    data || {};
  const { getServerTokenDecode } = useContext(UserContext);

  const addToCart = async () => {
    try {
      let user = getServerTokenDecode();

      if (!user) {
        toast.error("Please login first");
      } else {
        let productResponse = await axios.post("/product/addtocart", {
          p_id: data._id,
          u_id: user._id,
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
        toast.success(productResponse.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] h-auto m-2  rounded-lg px-4 py-4 flex flex-col justify-between cursor-pointer shadow-md hover:shadow-zinc-900 hover:shadow-2xl duration-500 hover:scale-105 shadow-zinc-800">
      {/* Fixed height for the p_image container */}
      <div className="h-[40vh] overflow-hidden rounded-lg">
        <img
          className="w-full h-full object-cover"
          src={p_image}
          alt={p_name}
        />
      </div>
      <div
        className="absolute top-8 right-10 p-2 rounded-full bg-zinc-400"
        onClick={() => addToCart()}
      >
        <FaPlus />
      </div>

      <h1 className="text-base xl:text-xl font-bold mt-3 leading-tight h-[60px]">
        {p_name && p_name.length > 50
          ? p_name.substring(0, 45) + "..."
          : p_name}
      </h1>

      {/* Price section */}
      <p className="font-semibold mt-1">
        <span className="text-lg">
          &#8377;{Math.floor(p_price - p_price * (p_discount / 100))}
        </span>
        <span className="line-through decoration-green-500 text-black opacity-45 ml-2">
          &#8377;{p_price}
        </span>
      </p>
    </div>
  );
};

export default Product;
