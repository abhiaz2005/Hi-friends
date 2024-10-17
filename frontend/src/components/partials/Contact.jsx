import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useForm } from "react-hook-form";
import  axios from "../../utils/axios.js"

const Contact = () => {
    const navigate = useNavigate() ;

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();


    const handleQuery = async(data) =>{
        const response = await axios.post("/user/sendmail",data) ;
        console.log(response.data.message) ;
    }

  return (
    <>
    <div className="w-full h-screen py-[15vh]">
        <div className="md:w-1/2 mx-6 md:mx-auto">
        <div className="flex gap-10">
          <FaArrowLeft
            size={"1.5em"}
            className="mt-3 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <h1 className="text-4xl font-semibold">Contact Us</h1>
        </div>
        <form className="my-10 md:mx-5" action="" onSubmit={handleSubmit((data)=>handleQuery(data))}>
          <h1 className="text-sm">Your Email</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="email"
            placeholder="xyz@email.com"
            {...register("email", { required: true })}
          />
          <br />
          {errors.email && (
            <span className="text-red-600 font-semibold">
              Email is required
            </span>
          )}

          <h1 className="text-sm mt-5">Enter your queries</h1>
          <textarea
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            rows="5"
            placeholder="Enter your queries . Give some feedback . ."
            {...register("queries", { required: true })}
          ></textarea>
          <br />
          {errors.queries && (
            <span className="text-red-600 font-semibold ">
              Your can't send out of Query
            </span>
          )}


          <div className="flex justify-between mt-5">
            <button className="bg-green-500 px-3 py-2 rounded-full font-semibold">
              Send mail
            </button>
          </div>
        </form>
        </div>
        </div>
      
    </>
  );
};

export default Contact;
