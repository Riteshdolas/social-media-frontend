import React, { useState } from "react";
import {
  FaRegHeart,
  FaHeart,
  FaRegComment,
  FaRegShareSquare,
} from "react-icons/fa";

const PostCard = ({ username, avatar, time, content, image }) => {
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLikes = () => {
    if (liked) {
      setLike(like - 1);
    } else {
      setLike(like + 1);
    }
    setLiked(!liked);
  };

  function sharePost() {
  if (navigator.share) {
    navigator.share({
      title: 'Check this post!',
      text: 'I found this awesome post. Have a look:',
      url: window.location.href  // current page link
    })
    .then(() => console.log('Shared successfully'))
    .catch((error) => console.log('Error sharing:', error));
  } else {
    alert('Sharing not supported in your browser');
  }
}


  return (
    <div className="max-w-md mt-1 mx-auto bg-gray-800 shadow-lg rounded-2xl p-4 mb-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg text-white font-semibold">{username}</h2>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="mt-4 text-white">{content}</div>

      {/* Optional Image */}
      {image && (
        <div className="w-full aspect-square overflow-hidden rounded-xl mt-4">
          <img src={image} alt="Post" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-end justify-around mt-4 text-gray-600 text-xl">
        <button className="hover:text-red-500 transition-colors duration-200">
          {like}
          {liked === true ? (
            <FaHeart onClick={handleLikes} className="text-red-500 cursor-pointer transition-transform duration-200 hover:scale-110" />
          ) : (
            <FaRegHeart onClick={handleLikes} className="cursor-pointer transition-transform duration-200 hover:scale-110" />
          )}
        </button>
        <button className="hover:text-blue-500">
          {12}
          <FaRegComment onClick={() => console.log("add comment")} />
        </button>
        <button className="hover:text-green-500">
          {2}
          <FaRegShareSquare onClick={() => sharePost()} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
