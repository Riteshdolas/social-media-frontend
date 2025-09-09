import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbSend2 } from "react-icons/tb";
import Input from "../components/Input";
import UserComment from "../components/Comment";
import { usePosts } from "../context/PostContext";
import { useParams } from "react-router-dom";
import CommentLoader from "../components/CommentSkeletonLoader";

function Comment({
  isOpen,
  onClose,
  postId,
  username,
  image,
  avatar,
  onCommentUpdate,
}) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://social-media-backend-725o.onrender.com/api/user/comments/${postId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        setComments(data.comments || []); // store in state
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
    // Cleanup in case component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, postId, token]);

  if (!isOpen) return null;

  const commentSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("You need to login to comment");
      return;
    }

    if (!content.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(
        `https://social-media-backend-725o.onrender.com/api/user/comment/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ text: content }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Error adding comment");
        return;
      }

      setComments((prev) => [...prev, data]);
      setContent(""); // Clear after submit
      if (onCommentUpdate) onCommentAdded();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div
        onClick={onClose}
        className="z-50 fixed top-0 left-0 h-screen w-full md:w-screen bg-[#121212]/30 backdrop-blur-md p-5 md:p-10 pl-10 flex justify-center md:items-center xl:items-start"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col md:flex-row w-full md:h-[50%] lg:h-full md:w-[90%] lg:w-[70%]"
        >
          <div className="h-[45%] w-full overflow-hidden md:h-full md:w-[50%]">
            <img
              className="object-cover h-full w-full"
              src={
                image ||
                "https://i.pinimg.com/1200x/62/6e/e4/626ee4406c9115c76b59b07b84aa4619.jpg"
              }
              alt=""
            />
          </div>

          <div className="h-[45%] md:h-full flex flex-col justify-between w-full md:w-[50%] text-[#f5f5f5] bg-[#1c1c1e]">
            <div className="md:p-0 text-xl p-2">{username}</div>
            <div className="grow overflow-y-auto overflow-x-hidden no-scrollbar">
              {loading ? (
                <>
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                  <CommentLoader />
                </>
              ) : !comments || comments.length === 0 ? (
                <p className="text-center text-[#b0b0b0] font-inter mt-5">
                  No comments yet.
                </p>
              ) : (
                comments.map((c) => (
                  <UserComment
                    key={c._id}
                    username={c.user_id?.username}
                    comment={c.text}
                    profileImage={c.user_id?.profilePicture}
                  />
                ))
              )}
            </div>

            <div className="flex justify-center items-center p-5">
              <Input
                placeholder="Add a Comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                onClick={commentSubmitHandler}
                className="p-2 text-3xl text-[#f5f5f5]"
              >
                {submitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  <TbSend2 />
                )}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="justify-self-end xl:static md:absolute md:top-60 md:right-0 md:px-5 text-2xl text-[#f5f5f5] h-fit w-fit z-50"
        >
          <RxCross2 />
        </button>
      </div>
    </>
  );
}

export default Comment;
