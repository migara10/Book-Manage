import { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "./auth/axiosInstance";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logOutUser = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await axiosInstance
        .delete("/auth/logout", { data: { refreshToken } })
        .then((res) => {
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, logOutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
