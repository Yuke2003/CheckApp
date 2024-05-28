import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("user-info")) || null
  );
  const [loading, setLoading] = useState(false);
  const [filename, setFilename] = useState("");
  const [rentId, setRentId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        loading,
        setLoading,
        filename,
        setFilename,
        rentId,
        setRentId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
