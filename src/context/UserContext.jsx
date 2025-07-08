import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext(null);

export default function UserContext({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem("token");
   
    if (!token) {
      setLoading(false)
      return;
    }

    fetch("https://social-media-backend-725o.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {

        if (data) {
          setUser(data);
        }
        setLoading(false)
      })
      .catch((err) => console.log("Failed to auto-login", err));
  }, []);

  return (
    <DataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </DataContext.Provider>
  );
}

export const useUser = () => useContext(DataContext);
