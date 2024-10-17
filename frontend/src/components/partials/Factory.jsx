import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Navbar from "./Navbar";
import HorizontalProduct from "./HorizontalProduct";
import { MdSell } from "react-icons/md";
import { GrAddCircle } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "../../utils/axios.js";
import { UserContext } from "../../context/Context.jsx";

const Factory = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const { getServerTokenDecode } = useContext(UserContext);

  const getProduct = async () => {
    let user = getServerTokenDecode() ;
    try {
      const products = await axios.get("/product/getseller",{
        params:{
          user: user._id 
        }
      });
      setProduct(products.data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="h-[80vh]">
        <div className="sticky top-0 z-20">
          <Navbar />
        </div>
        <div className="flex flex-col py-6  mx-3 md:mx-16 h-[70vh] overflow-y-auto overflow-hidden">
          <div className="flex justify-between">
            <h1 className="flex justify-start items-center">
              <FaArrowLeft
                size={"2em"}
                className="cursor-pointer mr-10"
                onClick={() => navigate("/")}
              />
              <MdSell size={"3em"} />
              <span className="text-4xl font-semibold ml-2 font-serif">
                My Factory
              </span>
            </h1>
            <Link to="/factory/add" className="pr-16">
              <GrAddCircle size={"2em"} />
            </Link>
          </div>
          {product.length > 0 &&
            product.map((item, index) => (
              <HorizontalProduct data={item} key={index} />
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Factory;
