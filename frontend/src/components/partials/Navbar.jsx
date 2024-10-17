import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { GiShoppingCart, GiHamburgerMenu } from "react-icons/gi";
import { SlOptionsVertical } from "react-icons/sl";
import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { TiGroup } from "react-icons/ti";
import { FaHome, FaShoppingBag } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { PiPhoneCallFill } from "react-icons/pi";
import { FcAbout, FcContacts, FcFactory, FcKey } from "react-icons/fc";
import { UserContext } from "../../context/Context";
import axios from "../../utils/axios";
import toast from "react-hot-toast";


const Navbar = () => {
  const [menu, setMenu] = useState(true);
  const [option, setOption] = useState(false);
  const [login, setLogin] = useState(false);
  const [factory, setFactory] = useState(false);
  const [wishlist, setWishlist] = useState(0) ;
  const navigate = useNavigate();
  const { getServerTokenDecode } = useContext(UserContext);
  const user = getServerTokenDecode();

  const handleNavigation = (path) => {
    if (login) {
      navigate(path);
    } else {
      toast.error('Please Login or signUp first!');
    }
  };

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
    setWishlist(product.data.length);
  };

  const handleLogout = () => {
    navigate("/");
    toast.success('Log out successfully!');
    localStorage.removeItem("authToken");
    setLogin(false);
    setFactory(false);
  };

  useEffect(() => {
    const verifiedToken = getServerTokenDecode();
    if (verifiedToken) {
      setLogin(true);
      getProducts()
      if (verifiedToken.category === "seller") {
        setFactory(true);
      }
    } else {
      setLogin(false);
    }
  }, [wishlist]);


  return (
    <>
      <div className="w-full md:min-h-[10vh] bg-[#dadbe0] md:flex md:justify-around md:items-center hidden text-lg font-semibold shadow-md shadow-zinc-600">
        <Link
          className="flex items-center justify-center gap-3 cursor-pointer hover:scale-105 
          duration-300"
          title="Home"
          to="/"
        >
          <FaHome size={"1.8em"} />
          <span className="text-xl font-bold">Home</span>
        </Link>
        <div className="flex items-center justify-center gap-10  hover:outline hover:outline-zinc-900 hover:outline-1 rounded-lg px-10 xl:px-20 ">
          <CiSearch size={"1.8em"} />
          <input
            className="px-10 py-3 bg-inherit outline-none placeholder-zinc-900"
            type="search"
            placeholder="Search here"
            name="search"
          />
        </div>
        <div className="flex items-center justify-center gap-5 xl:gap-10">
          <div onClick={() => handleNavigation("/profile")}>
            <CgProfile
              size={"1.8em"}
              className="cursor-pointer hover:scale-110 duration-300"
              title="profile"
            />
          </div>
          <div
            onClick={() => handleNavigation("/cart")}
            className="relative z-0 cursor-pointer"
            id="cart"
          >
            <GiShoppingCart
              size={"1.8em"}
              className="hover:scale-110 duration-300"
              title="cart"
            />
            <span className="absolute z-10 -top-1 left-6 bg-red-600 bg-opacity-80 px-1 text-sm rounded-full text-white">
              {wishlist}
            </span>
          </div>

          <SlOptionsVertical
            size={"1.8em"}
            className="cursor-pointer hover:scale-110 duration-300"
            title="options"
            onClick={() => setOption(!option)}
          />
          {/* Option pane */}
          <div
            className={`${
              option ? `absolute` : `hidden`
            } top-[12vh] right-10 bg-opacity-50 bg-zinc-500 px-5 rounded-lg flex flex-col`}
          >
            <div
              onClick={() => handleNavigation("/orders")}
              className="px-10 py-3 bg-slate-300  my-3 text-sm xl:text-base flex justify-start items-center rounded-xl cursor-pointer"
            >
              <GiShoppingCart size={"1.2em"} className="mt-1 mr-4" />
              <span>Orders</span>
            </div>
            {factory && (
              <Link
                to="/factory"
                className="px-10 py-3 bg-slate-300  my-3 text-sm xl:text-base flex justify-start items-center rounded-xl"
              >
                <FcFactory size={"1.2em"} className="mt-1 mr-4" />
                <span>My Factory</span>
              </Link>
            )}
            <Link
              to="/contact"
              className="px-10 py-3 bg-slate-300  my-3 text-sm xl:text-base flex justify-start items-center rounded-xl"
            >
              <FcContacts size={"1.2em"} className="mt-1 mr-4" />
              <span>Contact Us</span>
            </Link>
            <Link to="/about" className="px-10 py-3 bg-slate-300  my-3 text-sm xl:text-base flex justify-start items-center rounded-xl">
              <FcAbout size={"1.2em"} className="mt-1 mr-4" />
              <span>About Us</span>
            </Link>
            {login ? (
              <button
                onClick={handleLogout}
                className="px-10 py-3 bg-red-500  my-3 text-sm xl:text-base flex justify-start items-center rounded-xl"
              >
                <BiLogOut size={"1.2em"} className="mt-1 mr-4" />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="px-10 py-3 bg-green-400  my-3 text-sm xl:text-base flex justify-start items-center rounded-xl"
              >
                <FcKey size={"1.3em"} className="mt-1 mr-4" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className={`bg-[#B4B4B8] md:hidden ${menu ? "py-5 px-5" : ""} `}>
        {menu ? (
          <GiHamburgerMenu
            size={"2em"}
            className="cursor-pointer duration-300 md:hidden"
            onClick={() => setMenu((prev) => !prev)}
          />
        ) : (
          <div
            className={`bg-[#B4B4B8] w-full h-screen md:hidden fixed top-0 left-0 flex justify-center items-center 
      transition-all duration-300 ease-in-out ${
        menu ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
      }`}
          >
            <div className="w-full h-full overflow-y-auto my-10 p-5">
              <Link
                to="/"
                className="w-[90%] bg-[#C7C8CC] my-10 px-6 py-4 rounded-md  mx-auto flex items-center justify-start gap-10 cursor-pointer hover:scale-105 hover:duration-300"
              >
                <IoMdHome size={"2.1em"} />
                <span className="text-xl font-semibold">Home</span>
              </Link>

              <div
                onClick={() => handleNavigation("/profile")}
                className="w-[90%] bg-[#C7C8CC] cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md  mx-auto flex items-center justify-start gap-10"
              >
                <CgProfile size={"2.1em"} />
                <span className="text-xl font-semibold">Profile</span>
              </div>

              <div
                onClick={() => handleNavigation("/cart")}
                className="w-[90%] bg-[#C7C8CC] cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md  mx-auto flex items-center justify-start gap-10"
              >
                <GiShoppingCart size={"2.1em"} />
                <span className="text-xl font-semibold">Cart</span>
              </div>

              <Link
                onClick={() => handleNavigation("/orders")}
                className="w-[90%] bg-[#C7C8CC] cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md  mx-auto flex items-center justify-start gap-10"
              >
                <FaShoppingBag size={"2.1em"} />
                <span className="text-xl font-semibold">Orders</span>
              </Link>

              <Link
                to="/contact"
                className="w-[90%] bg-[#C7C8CC] cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md  mx-auto flex items-center justify-start gap-10"
              >
                <PiPhoneCallFill size={"2.1em"} />
                <span className="text-xl font-semibold">Contact us</span>
              </Link>

              <Link
                to="/about"
                className="w-[90%] bg-[#C7C8CC] cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md  mx-auto flex items-center justify-start gap-10"
              >
                <TiGroup size={"2.1em"} />
                <span className="text-xl font-semibold">About us</span>
              </Link>

              {factory && (
                <Link
                  to="/factory"
                  className="w-[90%] bg-[#C7C8CC] cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md mx-auto flex items-center justify-start gap-10"
                >
                  <FcFactory size={"2.1em"} />
                  <span className="text-xl font-semibold">My Factory</span>
                </Link>
              )}

              {login ? (
                <Link
                  onClick={handleLogout}
                  className="w-[90%] bg-red-600 cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md mx-auto flex items-center justify-start gap-10"
                >
                  <BiLogOut size={"2.1em"} />
                  <span className="text-xl font-semibold">Logout</span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-[90%] bg-green-600 cursor-pointer hover:scale-105 hover:duration-300 my-10 px-6 py-4 rounded-md mx-auto flex items-center justify-start gap-10"
                >
                  <FcKey size={"2.1em"} />
                  <span className="text-xl font-semibold">Login</span>
                </Link>
              )}
            </div>

            <div className="w-[10vw] h-full pt-10 pl-[2%]">
              <RxCross2
                size={"1.8em"}
                className="cursor-pointer"
                onClick={() => setMenu(!menu)}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
