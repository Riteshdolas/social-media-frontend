import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";

const PostContext = createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [postLoading, setLoading] = useState(true);
  const { user } = useUser();

  
  const fetchUserPosts = async () => {
    if (!user?._id) return;

    try {
      setLoading(true);
      const res = await fetch(
        `https://social-media-backend-725o.onrender.com/api/user/post/${user._id}`
      );
      const data = await res.json();
      setPosts(data.posts);
    } catch (error) {
      console.error("Failed to fetch user posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllPosts = async () => {
    try {
      const res = await fetch(
        "https://social-media-backend-725o.onrender.com/api/user/all/post"
      );
      const data = await res.json();
      setAllPosts(data.post);
    } catch (error) {
      console.error("Failed to fetch all posts:", error);
    }
  };

  // Initial fetch when user is available
  useEffect(() => {
    if (user?._id) {
      fetchUserPosts();
    }
  }, [user]);

  // Fetch all posts once on mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        allPosts,
        postLoading,
        fetchUserPosts,
        fetchAllPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export const usePosts = () => useContext(PostContext);
