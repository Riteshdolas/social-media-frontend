// context/PostContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postLoading, setLoading] = useState(true);
  const { user } = useUser()

 useEffect(() => {
  if (!user?._id) return; // wait for user to be loaded

  fetch(`https://social-media-backend-725o.onrender.com/api/user/post/${user._id}`)
    .then((res) => res.json())
    .then((data) => {
      setPosts(data.posts);  
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [user]); // if `user` is available

useEffect(() => {
  fetch("https://social-media-backend-725o.onrender.com/api/user/all/post")
    .then(res => res.json())
    .then(data => {
      setAllPosts(data.post);
    })
    .catch(err => console.error(err));
}, []);


  return (
    <PostContext.Provider value={{ posts, postLoading, allPosts }}>
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
