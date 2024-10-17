import axios from "../../utils/axios";
import React, { useContext, useEffect, useState } from "react";
import { IoBagRemove } from "react-icons/io5";
import { UserContext } from "../../context/Context";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const HorizontalProduct = ({ data }) => {
  const [orders, setOrders] = useState(false);
  const { getServerTokenDecode } = useContext(UserContext);
  const location = useLocation();

  const removeProduct = async () => {
    const user = getServerTokenDecode();

    if (location.pathname == "/factory") {
      setOrders(false);
      let deletedProduct = await axios.delete("/product/removeproduct", {
        params: {
          p_id: data._id,
        },
      });
      
      toast.success(deletedProduct.data.message);
    } else {
      setOrders(false);
      let deletedProduct = await axios.delete("/product/deleteproduct", {
        params: {
          orderId: data._id,
          user: user._id,
        },
      });
      
      toast.success(deletedProduct.data.message);
    }
  };

  useEffect(() => {
    if (location.pathname === "/orders") {
      setOrders(true);
      console.log(orders);
    }
    else{
      setOrders(false);
      console.log(orders);
    };
  }, []);

  return (
    <div className="h-[20vh] bg-zinc-200 flex justify-start items-center mx-1 md:mx-14 my-10 rounded-md relative">
      {!orders && (
        <button
          className="absolute bottom-5 right-3 cursor-pointer bg-zinc-700 p-2 rounded-full"
          title="Remove"
          onClick={removeProduct}
        >
          <IoBagRemove size={"1.3em"} color="white" />
        </button>
      )}
      <div className="h-[16vh]  w-[30%] md:w-[10%] mx-4 bg-zinc-100 rounded-lg overflow-hidden">
        <img className="h-full w-full object-cover" src={data.p_image} alt="" />
      </div>
      <div className="ml-10 md:ml-20">
        <h1 className="text-lg md:text-2xl font-semibold ">
          {data.p_name.length > 10
            ? data.p_name.substring(0, 10) + "..."
            : data.p_name}
        </h1>
        <p className="font-semibold">&#x20b9; {data.p_price}</p>
        <p className="font-semibold">{!orders ? "On progress" : `Delivered✔`}</p>

      </div>
    </div>
  );
};

export default HorizontalProduct;
