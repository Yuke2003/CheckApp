// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useAuthContext } from "../Context/authContext";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";
import Loader from "./Loader";

const SellerProperty = () => {
  const { authUser } = useAuthContext();
  const [getUser, setGetUser] = useState([]);
  const [loading,setLoading] = useState(false)
  const [rentId,setRentId] = useState("")

  useEffect(() => {
    const getOneUser = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/auth/${authUser.data.user._id}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
            },
          }
        );
        const data = response.data;
        setGetUser(data.data.getOneUser.rentDetails);
      } catch (err) {
        console.log(err.message);
      }finally{
        setLoading(false)
      }
    };
    getOneUser();
  }, [authUser]);

  useEffect(()=>{
    const DeleteUser = async()=>{
        try{
            const response = await axios.delete(`http://localhost:8000/api/v1/rents/${rentId}`,
            {
                headers: {
                  Authorization: `Bearer ${authUser.token}`, // Send token in Authorization header
                },
              }
            )
            setGetUser((prevGetUser) => prevGetUser.filter((item) => item.id !== rentId));
            console.log(response.data)
        }catch(err){
            console.log(err.message)
        }
    }
    DeleteUser();
  },[authUser,rentId])

  const handleDelete = (id)=>{
    setRentId(id)
  }

  return (
    <div>
      <Header />
      {loading ? <Loader /> :<div id="rentDetails" className=" p-11 ">
        <h1 className="text-black font-bold text-2xl text-center mb-7">My Property</h1>
        <ul className="grid place-items-center grid-cols-3 gap-40" >
          {getUser.map((Item) => (
            <li key={Item.id}>
              <div>
                <div className="shadow-2xl w-80 h-auto">
                  <div className="image">
                    <img
                      src={`/uploads/${Item.photo}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-6">
                    <h3 className="font-bold">{Item.name}</h3>
                    <h3 className="flex gap-2 items-center">
                      <span>
                        <FiMapPin />
                      </span>
                      {Item.address}
                    </h3>
                    <h3 className="italic">{Item.description}</h3>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-16 bg-[#f2eeee] w-80 h-auto p-5">
               <button onClick={()=>handleDelete(Item.id)} className="bg-red-600 text-sm text-[#fff] p-3 rounded-lg ">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default SellerProperty;
