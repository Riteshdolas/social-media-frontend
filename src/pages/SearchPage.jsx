import React, { useState, useEffect } from "react";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() === "") {
        setResults([]);
        setError("");
        return;
      }
      searchUser(query.trim());
    }, 1000); // 500ms debounce delay

    return () => clearTimeout(delayDebounce); // cleanup on new keystroke
  }, [query]);

  const searchUser = async (input) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to search.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`https://social-media-backend-725o.onrender.com/api/user/${encodeURIComponent(input)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          setResults([]);
          setError("No user found.");
        } else {
          setError("Something went wrong.");
        }
        return;
      }

      const data = await res.json();
      setResults([data.user]);
    } catch (err) {
      setError("Failed to fetch user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-white p-4">
      <h2 className="text-2xl font-semibold mb-4">Search Users</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter username"
        className="w-full p-2 rounded-md border border-gray-400 mb-4"
      />

      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="space-y-3">
        {results.map(user => (
          <div key={user._id || user.id} className="flex items-center gap-4 p-2 bg-gray-800 rounded-md">
            <img src={user.profilePicture || "https://via.placeholder.com/40"} alt={user.username} className="w-10 h-10 rounded-full" />
            <span>{user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
