// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage on component mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const updateUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  const logOutUser = () => {
    localStorage.removeItem('user');
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
