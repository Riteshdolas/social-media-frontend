import React from "react";
import NavigateBtn from "../components/NavigateBtn";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
function Profile() {
  const isLoggedIn = !!localStorage.getItem("token");
  NavigateBtn;
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto ">
        <div className="ml-auto w-full flex justify-end">
          {isLoggedIn ? (
            <NavigateBtn title="Log out" navigateTo="/login" token="token" />
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
        <img
          src="https://i.pinimg.com/736x/22/16/4a/22164af833bffcf2ff6a8e49a62973d3.jpg"
          alt="Post"
          className="rounded-lg object-cover h-40 w-full"
        />
      </div>
    </div>
  );
}

export default Profile;
