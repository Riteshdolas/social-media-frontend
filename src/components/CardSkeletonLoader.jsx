import React from "react";

const PostSkeleton = () => {
  return (
    <div className="p-4 w-full mt-4 md:w-[50%] xl:w-[30%] rounded-xl bg-[#1c1c1c] animate-pulse space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        {/* Avatar Skeleton */}
        <div className="w-12 h-12 rounded-full bg-[#2c2c2c]" />
        <div className="space-y-2">
          <div className="w-32 h-4 bg-[#2c2c2c] rounded" />
          <div className="w-24 h-3 bg-[#2c2c2c] rounded" />
        </div>
      </div>

      {/* Post Content */}
      <div className="space-y-2">
        <div className="w-full h-3 bg-[#2c2c2c] rounded" />
        <div className="w-5/6 h-3 bg-[#2c2c2c] rounded" />
        <div className="w-2/3 h-3 bg-[#2c2c2c] rounded" />
      </div>

      {/* Optional Image Skeleton */}
      <div className="w-full h-64 bg-[#2c2c2c] rounded-xl" />
    </div>
  );
};

export default PostSkeleton;
