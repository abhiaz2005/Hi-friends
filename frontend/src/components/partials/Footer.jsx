import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="footer bg-gradient-to-r from-zinc-500 to-zinc-700 py-10">
        <div className="container mx-auto px-4">
          <ul className="flex justify-around items-center text-white mb-5">
            <li className="hover:scale-105 cursor-pointer duration-500">Home</li>
            <li className="hover:scale-105 cursor-pointer duration-500">About</li>
            <li className="hover:scale-105 cursor-pointer duration-500">Contact us</li>
          </ul>
          <div className="row ">
            <div className="col-lg-12 text-center">
              <p className="copyright text-white text-sm border-t border-gray-400 pt-6">
                Copyright © 2024{" "}
                <a  className="text-blue-400 hover:text-pink-500 transition ease-in-out duration-200">
                  Abhishek
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
