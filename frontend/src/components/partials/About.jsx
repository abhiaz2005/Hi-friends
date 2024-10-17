import React from "react";
import Navbar from "./Navbar";
import { MdArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[80vh]">
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      <div className="flex flex-col justify-start  gap-5 mx-auto my-10 overflow-hidden z-10 w-[90vw] text-justify">
        <h2 className="flex text-4xl font-semibold font-serif">
          <FaArrowLeft
            size={"1em"}
            className="cursor-pointer mr-10"
            onClick={() => navigate("/")}
          />
          <span>About us</span>
        </h2>
        <p className="text-xl">
          Welcome to <b>Hi-Friends</b>, your go-to destination for all your
          shopping needs! We are a passionate team dedicated to bringing you the
          latest trends, high-quality products, and exceptional customer
          service. Our mission is to make online shopping easy, enjoyable, and
          reliable for everyone.
        </p>
        <p className="text-xl">
          At <b>Hi-Friends</b>, we believe that shopping should be more than
          just a transaction—it should be a delightful experience. With a
          curated selection of products, competitive pricing, and a commitment
          to customer satisfaction, we strive to exceed your expectations every
          time you visit us.
        </p>
        <h3 className="text-xl">We pride ourselves on our core values :</h3>
        <ul className="text-lg flex flex-col gap-3">
          <li>
            <b>Customer First:</b> Our customers are at the heart of everything
            we do, and we are committed to providing top-notch support and
            service.
          </li>
          <li>
            <b>Quality Products:</b> We source the finest products to ensure
            that every item you purchase meets the highest standards of quality.
          </li>
          <li>
            <b>Innovation:</b> We continuously look for ways to enhance our
            platform, making your shopping journey as smooth and enjoyable as
            possible.
          </li>
          <li>
            <b>Trust and Transparency:</b> Your trust is important to us, and we
            guarantee secure transactions, clear communication, and an honest
            shopping experience.
          </li>
        </ul>
        <button
          onClick={() => navigate("/contact")}
          className="px-4 py-2 bg-zinc-400 w-40 flex items-center justify-center gap-2 font-semibold mb-5 rounded-lg text-white"
        >
          <span>Contact us</span>
          <MdArrowOutward size={"0.9em"} />
        </button>
      </div>
    </div>
  );
};

export default About;
