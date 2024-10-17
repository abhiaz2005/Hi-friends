import axios from "../../utils/axios.js";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Context.jsx";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const {setServerToken} = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("/user/signin",data) ;
      toast.success(response.data.message);
      setServerToken(response.data.token) ; 
      navigate("/");
    } catch (error) {
      alert(error.response.data.message) ;
    }
  }


  return (
    <div className="w-full h-screen py-[15vh]">
      <div className="md:w-1/2 mx-6 md:mx-auto">
        <div className="flex gap-10">
          <FaArrowLeft
            size={"1.5em"}
            className="mt-3 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-4xl font-semibold">Login</h1>
        </div>

        <form className="my-10 md:mx-5" onSubmit={handleSubmit(data=>handleLogin(data))}>
          <h1 className="text-sm">Email</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="email"
            placeholder="xyz@email.com"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-600 font-semibold">Email is required</span>
          )}



          <h1 className="text-sm">Password</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 border-spacing-2 outline-none w-full md:w-3/4 mb-5"
            type="password"
            placeholder="qwertyuiop"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600 font-semibold">Email is required</span>
          )}

          <div className="flex justify-between">
            <button className="bg-green-500 px-3 py-2 rounded-full font-semibold">
              Login
            </button>
            <Link to="/signup" className="text-xs md:text-base flex justify-center items-center text-blue-500 underline xl:mr-32 font-semibold">
              New user? Signup now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
