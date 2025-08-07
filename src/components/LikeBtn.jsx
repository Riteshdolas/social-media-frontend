import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";

const LikeButton = ({
  initialLiked,
  initialLikes,
  postId,
  userId,
  initialLikeId,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(initialLikes || 0);
  const [likeId, setLikeId] = useState(initialLikeId || null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    setLiked(initialLiked);
    setLikesCount(initialLikes || 0);
    setLikeId(initialLikeId || null);
  }, [initialLiked, initialLikes, initialLikeId]);

  // const handleLikes = async () => {
  //   if (!userId || loading) return; // prevent spamming
  //   setLoading(true);

  //   try {
  //     if (liked) {
  //       // ✅ Unlike
  //       if (!likeId) {
  //         console.error("No likeId found for unlike");
  //         setLoading(false);
  //         return;
  //       }

  //       const res = await fetch(
  //         `https://social-media-backend-725o.onrender.com/api/user/like/${likeId}`,
  //         {
  //           method: "DELETE",
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       const data = await res.json();

  //       if (res.ok) {
  //         setLiked(data.userHasLiked);
  //         setLikeId(data._id || null);
  //         setLikesCount(data.likesCount);
  //       } else {
  //         console.error("Failed to unlike:", data);
  //       }
  //     } else {
  //       const res = await fetch(
  //         `https://social-media-backend-725o.onrender.com/api/user/like`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           body: JSON.stringify({ post_id: postId }),
  //         }
  //       );

  //       const data = await res.json();

  //       if (res.ok) {
  //         setLiked(data.userHasLiked);
  //         setLikeId(data._id || null);
  //         setLikesCount(data.likesCount);
  //       } else {
  //         console.error("Failed to like:", data);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error updating like:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLikes = async () => {
    if (!token) {
      alert("you need to login to like the post");
      return;
    }

    if (!userId || loading) return;
    setLoading(true);

    try {
      if (liked) {
        if (!likeId) {
          console.error("No likeId found for unlike");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `https://social-media-backend-725o.onrender.com/api/user/like/${likeId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (res.ok) {
          setLiked(false);
          setLikeId(null); // ✅ clear likeId
          setLikesCount(data.likesCount); // ✅ update from backend
        } else {
          console.error("Failed to unlike:", data);
        }
      } else {
        const res = await fetch(
          `https://social-media-backend-725o.onrender.com/api/user/like`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ post_id: postId }),
          }
        );

        const data = await res.json();

        if (res.ok) {
          setLiked(true);
          setLikeId(data._id || null);
          setLikesCount(data.likesCount);
        } else {
          console.error("Failed to like:", data);
        }
      }
    } catch (err) {
      console.error("Error updating like:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <span>{likesCount}</span>
      {liked ? (
        <FaHeart
          onClick={!loading ? handleLikes : undefined}
          className={`text-[#e1306c] cursor-pointer transition-transform duration-200 ${
            loading ? "opacity-50" : ""
          }`}
        />
      ) : (
        <FaRegHeart
          onClick={!loading ? handleLikes : undefined}
          className={`cursor-pointer transition-transform duration-200 ${
            loading ? "opacity-50" : ""
          }`}
        />
      )}
    </div>
  );
};

export default LikeButton;
