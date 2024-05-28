// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "./Header";
import { useAuthContext } from "../Context/authContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { authUser,setAuthUser,setRentId } = useAuthContext();
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user-info");
    localStorage.removeItem("rentId");
    setAuthUser(null)
    setRentId(null)
    navigate("/login");
  };

  return (
    <div className="bg-[#f2eeee] h-screen">
      <Header />

      <div
        id="userDetails"
        className="flex flex-col items-center justify-center mt-14"
      >
        <h1 className=" font-extrabold text-3xl text-black">Profile</h1>
        <div id="profile" className="">
          <form>
            <div id="form">
              <h3 className="font-bold text-xl mt-2">Username</h3>
              <input
                type="text"
                defaultValue={authUser.data.user.username}
                className="border-2 border-black p-2 rounded w-96"
              />
              <h3 className="font-bold text-xl mt-2">Email</h3>
              <input
                type="text"
                defaultValue={authUser.data.user.email}
                className="border-2 border-black p-2 rounded w-96"
              />
              <h3 className="font-bold text-xl mt-2">Password</h3>
              <input
                type="password"
                className="border-2 border-black p-2 rounded w-96"
              />
            </div>
            <button
              onClick={logout}
              className="w-96 bg-[#444] mt-6 p-2 rounded-sm font-bold text-[#fff] "
            >
              Logout
            </button>
          </form>

          <div id="userRents">
            {authUser.data.user.role === "buyer" ? "" :<Link to="/MyProperty">
              <button className="w-96 bg-[#444] mt-6 p-2 rounded-sm font-bold text-[#fff]">
                My Property
              </button>
            </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
