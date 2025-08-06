import React from "react";
import NavigateBtn from "../components/NavigateBtn";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { usePosts } from "../context/PostContext";
import Form from "../components/form/Form";
import { FaEdit } from "react-icons/fa";
import PostCard from "../components/Card";
import { AiOutlineCloseCircle } from "react-icons/ai";

function Profile() {
  const isLoggedIn = !!localStorage.getItem("token");
  const { user, loading } = useUser();
  const { posts, postLoading } = usePosts();
  const [showForm, setShowForm] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto md:pl-32 ">
      <div className="ml-auto w-full flex justify-end">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <NavigateBtn title="Log out" navigateTo="/login" token="token" />
            <button
              onClick={() => setShowForm(true)}
              className="border-solid border-2 border-[#e1306c] cursor-pointer transition-transform duration-200 hover:scale-105 text-[#f5f5f5] p-3 rounded-4xl "
            >
              <FaEdit />
            </button>
          </div>
        ) : (
          <div className="m-1 flex gap-1">
            <NavigateBtn title="Log in" navigateTo="/login" />
            <NavigateBtn title="Sign up" navigateTo="/signup" />
          </div>
        )}
      </div>
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={
            user?.profilePicture ||
            "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-poppins font-bold text-[#f5f5f5]">
              {user?.username || "user101"}
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-10 text-[#f5f5f5] mb-6">
            <div>
              <span className="font-bold font-inter">1</span>
              <p className="text-sm font-rubik text-[#b0b0b0]">Posts</p>
            </div>
            <div>
              <span className="font-bold font-inter">10.3k</span>
              <p className="text-sm font-rubik text-[#b0b0b0]">Followers</p>
            </div>
            <div>
              <span className="font-bold font-inter">205</span>
              <p className="text-sm font-rubik text-[#b0b0b0]">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6 font-rubik font-medium text-[#f5f5f5]">
        <p>{user?.bio || "bio"}</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {postLoading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="col-span-full text-[#f5f5f5] text-center text-sm opacity-60">
            No posts yet.
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              onClick={() => setPreviewPost(post)}
              key={post._id}
              className="relative group"
            >
              <img
                src={post.post_url}
                alt={`Post ${index + 1}`}
                className="rounded-lg object-cover h-40 w-full"
              />
              <div className="absolute inset-0 font-inter font-light bg-[#1c1c1e] bg-opacity-50 opacity-0 group-hover:opacity-75 flex items-center justify-center text-[#f5f5f5] text-sm p-2 transition">
                {post.caption || "No caption"}
              </div>
            </div>
          ))
        )}
      </div>
      {showForm && <Form onClose={() => setShowForm(false)} />}
      {previewPost && (
        <div
          onClick={() => setPreviewPost(null)}
          className="fixed inset-0 h-screen bg-[#121212] bg-opacity-80 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-3 rounded-lg h-[80%] mt-[-40px] max-w-md w-full"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewPost(null)}
                className="m-1 text-[#f5f5f5] rounded text-2xl"
              >
                <AiOutlineCloseCircle />
              </button>
            </div>

          <PostCard
            key={previewPost._id}
            username={previewPost.user_id.username}
            avatar={
              previewPost.user_id?.profilePicture ||
              "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"
            }
            content={previewPost.caption}
            image={previewPost.post_url}
            time={previewPost.createdAt}
            postId={previewPost._id}
            likeCount={previewPost.likesCount}
            userHasLiked={previewPost.userHasLiked}
            initialLikeId={previewPost.likeId}  
            currentUser={user?._id || null}
          />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
