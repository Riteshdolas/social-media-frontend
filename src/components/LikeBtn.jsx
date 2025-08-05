import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

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

  const handleLikes = async () => {
    if (!userId || loading) return; // prevent spamming
    setLoading(true);

    try {
      if (liked) {
        // ✅ Unlike
        if (!likeId) {
          console.error("No likeId found for unlike");
          setLoading(false);
          return;
        }

        const res = await fetch(`https://social-media-backend-725o.onrender.com/api/user/like/${likeId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setLiked(false);
          setLikeId(null);
          setLikesCount((prev) => prev - 1); // decrement locally
        } else {
          console.error("Failed to unlike:", data);
        }
      } else {
        // ✅ Like
        // console.log("Liking post:", { post_id: postId });

        const res = await fetch(`https://social-media-backend-725o.onrender.com/api/user/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ post_id: postId }),
        });
// console.log("Sending token:", localStorage.getItem("token"));

        const data = await res.json();

        if (res.ok) {
          setLiked(true);
          setLikeId(data._id); // ✅ this is returned from backend
          setLikesCount((prev) => prev + 1); // increment locally
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
