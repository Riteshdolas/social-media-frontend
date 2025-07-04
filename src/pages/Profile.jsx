import React from "react";
import NavigateBtn from "../components/NavigateBtn";
import { useState, useEffect } from "react";
function Profile() {
  const isLoggedIn = !!localStorage.getItem("token");
  NavigateBtn;  
  return (
    <div className="max-w-3xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src="https://i.pinimg.com/736x/bf/43/52/bf43520cd3fdac39fcc41509981b553d.jpg"
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Sadie Sink</h2>
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

        <div className="ml-auto">
          {isLoggedIn ? (
            <NavigateBtn title="Log out" navigateTo="/login" token="token" />
          ) : (
            <div className="m-1 flex flex-col gap-1">
              <NavigateBtn title="Log in" navigateTo="/login" />
              <NavigateBtn title="Sign up" navigateTo="/signup" />
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      <div className="mb-6 text-white">
        <p>
          Catching sunsets and feelings 🌙🍃 <br />
          Just not for people.
        </p>
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
