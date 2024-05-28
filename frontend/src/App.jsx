import HomePage from "./Pages/HomePage";
import { Routes, Route, Navigate } from "react-router";
import LoginForm from "./Pages/auth/LoginForm";
import SignUpForm from "./Pages/auth/Signup";
import CreateRents from "./Pages/CreateRents";
import { useAuthContext } from "./Context/authContext";
import OneRentDetail from "./Pages/OneRentDetail";
import ProfilePage from "./Pages/ProfilePage";
import SellerProperty from "./Pages/SellerProperty";
import RentDetails from "./Pages/RentDetails";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/createProperty" element={<CreateRents />} />
        <Route path="/OneRentDetail" element={<OneRentDetail />} />
        <Route path="/RentDetail" element={<RentDetails />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/MyProperty" element={<SellerProperty />} />
      </Routes>
    </>
  );
}

export default App;

// <div>
// {/* <HomePage /> */}
// {/* <CreateRents /> */}
// <SignUpForm />
// {/* <LoginForm /> */}
// </div>

// const [image, setImage] = useState(null);
//   const [uploadMessage, setUploadMessage] = useState(null);

//   const getRentDetails = async (e) => {
//     e.preventDefault();
//     if (!image) {
//       console.log("select a file");
//     }

//     const formData = new FormData();
//     formData.append("image", image);

//     try {
//       // eslint-disable-next-line no-undef
//       const response = await axios.post(
//         "http://localhost:8000/api/v1/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       const data = response.data;
//       console.log("Upload successful:", data);
//       setUploadMessage("File uploaded successfully!");

//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   const handleChange = (e) => {
//     console.log(e.target.files[0]);
//     setImage(e.target.files[0]);
//     setUploadMessage(null)
//   };

{
  /* <form>
<input
  type="file"
  alt="image"
  accept="image/*"
  onChange={handleChange}
/>
<button className="submit" type="submit" onClick={getRentDetails}>
  upload
</button>
{uploadMessage && <p>{uploadMessage}</p>}
</form> */
}
