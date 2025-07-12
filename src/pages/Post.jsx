import { useEffect, useState } from "react";
import Input from "../components/Input";
import { useUser } from "../context/UserContext";
import PopupMessage from "../components/PopupMessage";
import { usePosts } from "../context/PostContext";

function Post() {
  const { user, loading } = useUser();
  const { fetchUserPosts, fetchAllPosts } = usePosts()
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });
  const [user_id, setUserId] = useState("");

  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    if (user && user._id) {
      setUserId(user._id);
    }
  }, [user]);

  if (!loading && !user) {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl font-semibold text-red-500">You must be logged in to post.</p>
    </div>
  );
}

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const handler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const post = formData.get("post")
    const caption = formData.get("caption")

    const token = localStorage.getItem("token");

    if(!post || !caption) {
      showPopup("Please fill in all fields", "error");
      return;
    }

    const option = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const postData = async () => {
      try {
        const res = await fetch("https://social-media-backend-725o.onrender.com/api/user/post", option);
        const data = await res.json();

        if (res.ok) {
          showPopup(data.message, "success");
          await fetchUserPosts()
          await fetchAllPosts()
          return { success: true, message: "post created" };
        } else {
          showPopup(data.error, "failed");
          return { success: false, message: data.error || "try again later" };
        }

      } catch (error) {
        console.log("error: ", error);
        return { success: false, message: error.message };
      }
    };

    postData();
    e.target.reset();
  };

  return (
    <div className="relative flex justify-self-center justify-center items-center h-screen z-0 w-full">
      {popup.visible && (
        <PopupMessage
          message={popup.message}
          className={
            popup.type === "success" ? "text-green-600" : "text-red-600"
          }
        />
      )}
      <form
        onSubmit={handler}
        className="flex flex-col bg-gray-950 h-[65%] p-5 rounded-md w-[90%]
      md:h-[54%] md:w-[70%] lg:h-[60%] lg:w-[35%] items-center justify-center"
      >
        <Input type="text" name="user_id" value={user_id} readOnly className="hidden" />
        <Input type="file" name="post" />
        <Input type="text" name="caption" placeholder="caption" />
        <button
          type="submit"
          className="font-bold bg-red-600 text-white p-2 m-1 rounded-md w-fit"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Post;
