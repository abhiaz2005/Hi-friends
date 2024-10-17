import React, { useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import Product from "./partials/Product";
import data from "/public/data.json";
import Banner from "./partials/Banner";
import Footer from "./partials/Footer";
import axios from "../utils/axios.js";

const Home = () => {
  const [products, setProducts] = useState(data);

  const getProduct = async () => {
    try {
      const products = await axios.get("/product/get");
      setProducts(products.data);
    } catch (error) {
      console.log("error:"+error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);


  return (
    <div className="w-full h-screnn ">
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="flex flex-wrap justify-center items-center gap-5 my-10 overflow-hidden z-10">
        <Banner /> 
        {products ? (
          products.map((d, i) => {
            return <Product key={i} data={d} />;
          })
        ) : (
          <ContentLoader
            height={140}
            speed={1}
            backgroundColor={"#333"}
            foregroundColor={"#999"}
            viewBox="0 0 380 70"
          >
            <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
            <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
            <rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
          </ContentLoader>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
