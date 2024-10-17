import React, { useContext, useEffect, useMemo, useState } from "react";
import HorizontalProduct from "./partials/HorizontalProduct";
import { FaArrowLeft, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./partials/Footer";
import Navbar from "./partials/Navbar";
import { UserContext } from "../context/Context";
import axios from "../utils/axios.js";
import toast from "react-hot-toast";

const MyCart = () => {
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const { getServerTokenDecode } = useContext(UserContext);
  const user = useMemo(() => getServerTokenDecode(), [getServerTokenDecode]);

  const getProducts = async () => {
    if (!user) {
      navigate("/");
      return;
    }
    let product = await axios.get("/product/getcart", {
      params: {
        user: user,
      },
    });
    let totalPrice = product.data.reduce((acc, item) => {
      return acc + item.p_price;
    }, 0);
    setPrice(totalPrice);
    setCart(product.data);
  };

  let orderProducts = async () => {
    if (!user) {
      navigate("/");
      return;
    }
    let response = await axios.post("/product/order", {
      orders: cart,
      user: user._id,
    });
    toast.success(response.data.message);
    navigate("/");
  };

  useEffect(() => {
    getProducts();
  }, [user]);

  return (
    <>
      <div className="w-full h-[80vh] overflow-hidden overflow-y-auto no-scrollbar">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex flex-col py-6  mx-3 md:mx-16">
          <h1 className="flex justify-start items-center">
            <FaArrowLeft
              size={"2em"}
              className="cursor-pointer mr-10"
              onClick={() => navigate("/")}
            />
            <FaShoppingBag size={"3em"} />
            <span className="text-4xl font-semibold ml-2 font-serif">
              My Cart
            </span>
          </h1>

          {cart &&
            cart.map((d, i) => {
              return <HorizontalProduct data={d} key={i} />;
            })}
          <div className="bg-zinc-400 font-bold w-[70%] md:w-[30%] bottom-36   right-14 p-3 rounded-xl absolute flex justify-between items-center">
            <span>&#x20b9; {price}</span>
            <button
              className="bg-yellow-400 p-2 rounded-lg"
              onClick={() => {price > 0 ? setConfirm(true):toast.error("Please add some product first")}}
            >
              Place Order
            </button>
          </div>
        </div>

        {/* Confirm Order */}
        {confirm && (
          <>
            <div className="absolute top-0 left-0 h-full w-screen  bg-zinc-600 bg-opacity-70 duration-300">
              <div className="w-full h-auto md:w-[50%] md:h-[50%]  md:mx-auto p-10  mt-52 bg-zinc-200  rounded-lg">
                <h2 className="text-2xl font-semibold">
                  Do You Want To Confirm Your Order ?
                </h2>
                <p className="text-base font-bold mt-5">
                  Price: <span>&#x20b9; {price}</span>
                </p>
                <div className="w-full flex justify-between items-center mt-[15vh] xl:mt-[20vh]">
                  <button
                    className="px-5 py-2 bg-red-500 rounded-xl text-base font-semibold"
                    onClick={() => setConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2 bg-green-400 rounded-xl text-base font-semibold"
                    onClick={orderProducts}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="mb-0">
        <Footer />
      </div>
    </>
  );
};

export default MyCart;
