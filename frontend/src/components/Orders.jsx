import React, { useContext, useEffect, useMemo, useState } from "react";
import Navbar from "./partials/Navbar";
import { FaArrowLeft, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./partials/Footer";
import axios from "../utils/axios.js";
import { UserContext } from "../context/Context.jsx";
import HorizontalProduct from "./partials/HorizontalProduct.jsx";

const Orders = () => {
  const navigate = useNavigate();
  const { getServerTokenDecode } = useContext(UserContext);
  const user = useMemo(() => getServerTokenDecode(), [getServerTokenDecode]);
  const [orders, setOrders] = useState([]);


  const getProducts = async () => {
    if (!user) {
      navigate("/");
      return;
    }
    let product = await axios.get("/product/getorder", {
      params: {
        user: user,
      },
    });
    
    setOrders(product.data) ;
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
            <FaBoxOpen size={"3em"} />
            <span className="text-4xl font-semibold ml-2 font-serif">
              Orders
            </span>
          </h1>
          {
            orders.map((d,i)=>{
              return <HorizontalProduct key={i} data={d} />
            })
          }
        </div>
      </div>
        <div className="mb-0">
        <Footer />
        </div>
    </>
  );
};

export default Orders;
