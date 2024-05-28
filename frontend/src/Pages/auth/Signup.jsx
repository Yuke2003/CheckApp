// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Header from "../Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/authContext";

const SignUpForm = () => {
  const { setLoading } = useAuthContext();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/auth/signup",
        inputs
      );

      // navigate("/login");
      console.log(response.data);
      navigate("/login");
      if (response.error) {
        throw new Error(response.error);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className=" bg-[#e2dede] h-screen">
        <form
          className="flex flex-col items-center justify-center p-16"
          onSubmit={handleSubmit}
        >
          <div className="mb-4" name="username">
            <h3 className="text-lg ">Username</h3>
            <input
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              className="border-2 border-black p-2 rounded w-96"
              placeholder="username"
            />
          </div>
          <div className="mb-4" name="Email">
            <h3 className="text-lg ">Email</h3>
            <input
              type="text"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              className="border-2 border-black p-2 rounded w-96"
              placeholder="Email"
            />
          </div>
          <div className="mb-4" name="password">
            <h3 className="text-lg ">Password</h3>
            <input
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              className="border-2 border-black p-2 rounded w-96"
              placeholder="password"
            />
          </div>
          <div className="mb-4" name="confirmPassword">
            <h3 className="text-lg ">confirmPassword</h3>
            <input
              type="password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              className="border-2 border-black p-2 rounded w-96"
              placeholder="confirmPassword"
            />
          </div>

          <div className="mb-4 ">
            <h3 className="text-lg ">role</h3>
            <select
              className="w-96 border-2 border-black p-2"
              value={inputs.role}
              onChange={(e) => setInputs({ ...inputs, role: e.target.value })}
            >
              <option value="">Select a role</option>
              <option value="seller">seller</option>
              <option value="buyer">buyer</option>
            </select>
          </div>

          <button className="text-center w-96 text-[#f7f7f7] p-2 mt-4 rounded-full bg-[#444]">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
