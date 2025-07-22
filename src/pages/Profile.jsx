import React from "react";
import NavigateBtn from "../components/NavigateBtn";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { usePosts } from "../context/PostContext";
import Form from "../components/form/Form";
import { FaEdit } from "react-icons/fa";
import PostCard from "../components/Card";

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
              className="bg-red-700 text-white p-3 rounded-4xl hover:bg-red-600"
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
            <h2 className="text-2xl font-bold text-white">
              {user?.username || "user101"}
            </h2>
          </div>

          {/* Stats */}
          <div className="flex gap-10 text-white mb-6">
            <div>
              <span className="font-bold">1</span>
              <p className="text-sm text-gray-400">Posts</p>
            </div>
            <div>
              <span className="font-bold">10.3k</span>
              <p className="text-sm text-gray-400">Followers</p>
            </div>
            <div>
              <span className="font-bold">205</span>
              <p className="text-sm text-gray-400">Following</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6 text-white">
        <p>{user?.bio || "bio"}</p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {postLoading ? (
          <div className="col-span-full flex justify-center items-center py-10">
            <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="col-span-full text-white text-center text-sm opacity-60">
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
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm p-2 transition">
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
          className="fixed inset-0 h-screen bg-gray-950 bg-opacity-80 flex justify-center items-center z-50"
        >
          <div className="p-3 rounded-lg h-[80%] mt-[-40px] max-w-md w-full">
            <div className="flex justify-end">
              <button
                onClick={() => setPreviewPost(null)}
                className="m-1 text-white rounded text-2xl"
              >
                x
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
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
