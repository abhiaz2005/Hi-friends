import React, { useContext, useState } from "react";
import axios from "../../utils/axios.js";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Context.jsx";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");
  const [otp, setOtp] = useState(false);
  const [signup, setSignup] = useState(false);
  const [otptoverify, setOtpToVerify] = useState("");
  const { setServerToken } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendOTP = async () => {
    try {
      const email = document.getElementById("email").value;
      if (email === "" || !email.includes("@")) {
        toast.error("Please enter a valid email");
        return;
      }
      const response = await axios.post("/user/sendotp", {
        email: email,
      });
      toast.success(response.data.message);
      setOtp(true);
      setOtpToVerify(response.data.otp);
    } catch (error) {
      console.log("error: " + error.message);
    }
  };

  const verifyOTP = () => {
    const otpGot = document.getElementById("otp").value;
    if (otpGot === "") {
      toast.error("Please enter OTP");
      return;
    } else if (otpGot !== otptoverify) {
      toast.error("Enter valid OTP");
      return;
    }
    toast.success("OTP Verified");
    setSignup(true);
  };

  const handleSignUp = async (data) => {
    try {
      const {
        name,
        gender,
        age,
        phoneNumber,
        email,
        category,
        bio,
        address,
        password,
      } = data;

      const formData = {
        name,
        password,
        gender: gender.toLowerCase(),
        image: imagePreview,
        email,
        age,
        phoneNumber,
        category: category.toLowerCase(),
        bio,
        address,
      };

      const response = await axios.post("/user/signup", formData);
      toast.success(response.data.message);
      setServerToken(response.data.token);
      navigate("/");
    } catch (error) {
      console.log("Error: " + error);
      toast.error(error.data.message);
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
          <h1 className="text-4xl font-semibold">Signup</h1>
        </div>

        <form
          className="mt-10 md:mx-5"
          onSubmit={handleSubmit((data) => handleSignUp(data))}
        >
          <h1 className="text-sm">Name</h1>
          <input
            className="bg-transparent text-xl font-semibol md:mx-5d px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="text"
            placeholder="John Doe"
            {...register("name", { required: true })}
          />
          <br />
          {errors.name && (
            <span className="text-red-600 font-semibold">Name is required</span>
          )}

          <h1 className="text-sm">Password</h1>
          <input
            className="bg-transparent text-xl font-semibol md:mx-5d px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="password"
            placeholder="Enter password"
            {...register("password", { required: true })}
          />
          <br />
          {errors.password && (
            <span className="text-red-600 font-semibold">
              Password is required
            </span>
          )}

          <h1 className="text-sm">Gender</h1>
          <select
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5 cursor-pointer"
            defaultValue="Select"
            {...register("gender", { required: true })}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <br />
          {errors.gender && (
            <span className="text-red-600 font-semibold">Gender is required</span>
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

          <h1 className="text-sm">Photo</h1>
          <input
            className="bg-transparent text-xl font-semibol md:mx-5d px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="file"
            accept="image/*"
            placeholder="Upload photo"
            {...register("image", { required: true })}
            onChange={(e) => {
              const img = e.target.files[0];

              const reader = new FileReader();
              reader.onloadend = function () {
                setImagePreview(reader.result);
              };
              reader.readAsDataURL(img);
            }}
          />
          <br />
          {errors.image && (
            <span className="text-red-600 font-semibold">
              Image is required
            </span>
          )}

          <h1 className="text-sm">Age</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            type="number"
            placeholder="20"
            {...register("age", { required: true, min: 10, max: 90 })}
          />
          <br />
          {errors.age && (
            <span className="text-red-600 font-semibold">Age is required</span>
          )}

          <h1 className="text-sm">Phone number</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            type="number"
            placeholder="1234567890"
            {...register("phoneNumber", { required: true, minLength: 10 })}
            onInput={(e) => {
              if (e.target.value.length > 10) {
                e.target.value = e.target.value.slice(0, 10);
              }
            }}
          />
          <br />
          {errors.phoneNumber && (
            <span className="text-red-600 font-semibold">
              Phone Number is required
            </span>
          )}

          <h1 className="text-sm">Email</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900  outline-none w-full md:w-3/4 mb-5"
            id="email"
            type="email"
            placeholder="john@email.com"
            {...register("email", { required: true })}
          />
          <br />
          {errors.email && (
            <span className="text-red-600 font-semibold">
              Email is required
            </span>
          )}

          <h1 className="text-sm">Type</h1>
          <select
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5 cursor-pointer"
            defaultValue="Select"
            {...register("category", { required: true })}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
          </select>
          <br />
          {errors.category && (
            <span className="text-red-600 font-semibold">Type is required</span>
          )}

          <h1 className="text-sm">Bio</h1>
          <textarea
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            rows="4"
            placeholder="Enter something that you can show on your profile"
            {...register("bio", { required: true })}
          ></textarea>
          <br />
          {errors.bio && (
            <span className="text-red-600 font-semibold">Bio is required</span>
          )}

          <h1 className="text-sm">Address</h1>
          <textarea
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900 outline-none w-full md:w-3/4 mb-5"
            rows="4"
            placeholder="Zippy House ,123 Center Ln.Plymouth, MN 55441"
            {...register("address", { required: true })}
          ></textarea>
          <br />
          {errors.address && (
            <span className="text-red-600 font-semibold">
              Address is required
            </span>
          )}

          <h1 className="text-sm">Verify OTP</h1>
          <input
            className="bg-transparent text-xl font-semibold px-4 py-2 border-b-2 border-zinc-900  outline-none w-1/2 mb-5 mr-10"
            type="text"
            placeholder="Send to mail"
            id="otp"
          />
          {otp ? (
            <span
              onClick={verifyOTP}
              className="inline font-semibold bg-green-500 my-2 rounded-full px-4 py-2 cursor-pointer"
            >
              Verify
            </span>
          ) : (
            <span
              onClick={sendOTP}
              className="inline font-semibold bg-red-500 my-2 rounded-full px-4 py-2 cursor-pointer"
            >
              Send Otp
            </span>
          )}

          <br />
          {signup ? (
            <button className="bg-green-400 my-2 font-semibold rounded-full px-6 py-3 ">
              Signup
            </button>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default Signup;
