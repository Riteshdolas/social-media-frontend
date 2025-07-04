import React, { useState, useEffect, useRef } from "react";

const SearchDrawer = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setError("");
      clearTimeout(debounceRef.current);
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    const input = e.target.value.trim();
    setQuery(input);
    setError("");
    setResults([]);

    clearTimeout(debounceRef.current);

    if (input === "") return;

    debounceRef.current = setTimeout(() => {
      searchUser(input);
    }, 1000); // wait 500ms after typing stops
  };

  const searchUser = async (input) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to search.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`https://social-media-backend-725o.onrender.com/api/user/${encodeURIComponent(input)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 404) {
          setError("No user found.");
        } else {
          setError("Something went wrong.");
        }
        return;
      }

      const data = await res.json();
      setResults([data.user]);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white transform transition-transform duration-300 z-10 shadow-lg ${
        isOpen ? "translate-x-30" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">Search Users</h2>
        <button onClick={onClose} className="text-white text-xl">×</button>
      </div>
      <div className="p-4">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search by username..."
          className="w-full p-2 rounded-md border border-gray-600 bg-gray-800 text-white mb-4"
        />

        {loading && <p className="text-gray-400">Loading...</p>}
        {error && !loading && <p className="text-red-400">{error}</p>}

        <div className="space-y-3">
          {results.map((user) => (
            <div key={user._id || user.id} className="flex items-center gap-4 p-2 bg-gray-800 rounded-md">
              <img
                src={user.profilePicture || "https://via.placeholder.com/40"}
                alt={user.username}
                className="w-10 h-10 rounded-full"
              />
              <span>{user.username}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchDrawer;
