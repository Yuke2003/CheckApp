// eslint-disable-next-line no-unused-vars
import React from "react";
import { IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuthContext } from "../Context/authContext";

const Header = () => {
  const { authUser } = useAuthContext();
  return (
    <div className="flex flex-row items-center justify-between px-6 text-[#f7f7f7] bg-[#444] p-3">
      <div className="text-2xl">
        <Link to="/">
          <h1 className="flex items-center gap-1 ml-7">
            <span>
              <IoHome />
            </span>
            Rentify
          </h1>
        </Link>
      </div>
      <div className="imagelogo"></div>
      <div className="flex gap-7 text-lg">
        {authUser ? (
          <Link to="/profilePage">
            <div className="flex gap-2 cursor-pointer items-center mr-10 hover:border-2 border-gray-50 p-2 rounded-2xl">
              <h3 className=" text-3xl ">
                <CgProfile />
              </h3>
              <h3>{authUser.data.user.username}</h3>
            </div>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <button className="p-2">Log In</button>
            </Link>
            <Link to="/signup">
              <button className="border text-[#f7f7f7] rounded-full p-2 px-4 hover:bg-[#f7f7f7] hover:text-[#444]">
                Sign up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
