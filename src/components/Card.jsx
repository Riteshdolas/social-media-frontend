import React from "react";
import { FaRegHeart, FaRegComment, FaRegShareSquare } from "react-icons/fa";

const PostCard = ({ username, avatar, time, content, image }) => {
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
      <div className="flex justify-around mt-4 text-gray-600 text-xl">
        <button className="hover:text-red-500">
          <FaRegHeart />
        </button>
        <button className="hover:text-blue-500">
          <FaRegComment />
        </button>
        <button className="hover:text-green-500">
          <FaRegShareSquare />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
