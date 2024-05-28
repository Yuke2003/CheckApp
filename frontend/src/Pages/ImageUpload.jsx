// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/authContext";

const ImageUpload = () => {
  const [image, setImage] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const { filename, setFilename } = useAuthContext();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      // const data = res.data;

      setUploadMessage("Upload image succesfully");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1 className="text-lg">Image:</h1>
      <form className="flex items-center gap-3">
        <input
          type="file"
          alt="image"
          accept="image/*"
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
          onChange={handleFileChange}
        />
        <button
          className="bg-[#444] p-1 px-3 text-[#fff] rounded-lg"
          onClick={handleUpload}
        >
          Upload
        </button>
      </form>
      {uploadMessage && <p>Uploaded filename: {filename}</p>}
    </div>
  );
};

export default ImageUpload;
