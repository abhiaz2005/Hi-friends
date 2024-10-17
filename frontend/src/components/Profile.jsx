import React, { useContext, useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowOutward, MdModeEdit } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Footer from "./partials/Footer";
import axios from "../utils/axios.js";
import { UserContext } from "../context/Context";

const Profile = () => {
  const navigate = useNavigate();
  const { getServerTokenDecode } = useContext(UserContext);
  const [profile, setProfile] = useState([]);

  const getProfileData = async () => {
    try {
      const token = getServerTokenDecode();
      let response = await axios.get(`/user/profile`, {
        params: {
          token: token,
        },
      });
      setProfile(response.data);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <>
      {profile && (
        <>
          <div className="w-full h-auto">
            <div className="sticky top-0 z-20">
              <Navbar />
            </div>

            <div className="flex justify-start items-center px-10 md:px-20 py-6">
              <FaArrowLeft
                size={"2em"}
                className="cursor-pointer mr-10"
                onClick={() => navigate("/")}
              />
              <CgProfile size={"3em"} />
              <h1 className="text-4xl font-semibold ml-2 font-serif">
                Profile
              </h1>
            </div>

            <div className="flex flex-wrap justify-center p-8">
              <div className="w-full md:w-1/2 ">
                <div className="w-[30vh] h-[30vh] md:w-[40vh] md:h-[40vh] mx-auto rounded-full overflow-hidden my-5">
                  <img
                    className="w-full h-full object-cover"
                    src={profile.photo}
                    alt=""
                  />
                </div>
                <p className="my-5 mx-4 xl:mx-10 text-justify font-semibold">
                  {profile.bio}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-5 py-5 flex flex-col gap-y-2">
                <p className="text-xs">Name</p>
                <h1 className="text-lg md:text-2xl font-semibold mb-3 border-b-2 border-zinc-700 ">
                  {profile.name}
                </h1>

                <p className="text-xs">Mobile Number</p>
                <h1 className="text-lg md:text-2xl font-semibold mb-3 border-b-2 border-zinc-700 ">
                  {
                    profile.phoneNumber
                  }
                </h1>

                <p className="text-xs">Email id</p>
                <h1 className="text-lg md:text-2xl font-semibold mb-3 border-b-2 border-zinc-700 ">
                {profile.email}
                </h1>

                <p className="text-xs">Gender</p>
                <h1 className="text-lg md:text-2xl font-semibold mb-3 border-b-2 border-zinc-700 ">
                {profile.gender}
                </h1>

                <p className="text-xs">Category</p>
                <h1 className="text-lg md:text-2xl font-semibold mb-3 border-b-2 border-zinc-700 ">
                {profile.category}
                </h1>

                <p className="text-xs">Orders</p>
                <h1 className="text-lg md:text-2xl font-semibold mb-3 border-b-2 border-zinc-700 flex justify-between">
                {profile.orders}
                  <Link to="/orders" className="mt-1 mr-14">
                    <MdArrowOutward size={"0.9em"} />
                  </Link>
                </h1>

              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
