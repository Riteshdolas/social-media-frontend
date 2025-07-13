import { useState } from "react";
import { useUser } from "../../context/UserContext";
import Input from "../Input";

function Form({ onClose }) {
  const { user, setUser } = useUser();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
    profilePicture: user?.profilePicture || "",
    profile: null,
  });

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0] || prev[name],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const token = localStorage.getItem("token");
    const formPayload = new FormData();
    formPayload.append("username", formData.username);
    formPayload.append("email", formData.email);
    formPayload.append("bio", formData.bio);

    if (formData.profile instanceof File) {
      formPayload.append("profile", formData.profile);
    }

    try {
      const res = await fetch(
        `https://social-media-backend-725o.onrender.com/api/user/register/${user._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formPayload,
        }
      );

      const result = await res.json();

      if (result?.updatedUser) {
        setUser(result.updatedUser); // update context
      }
      setLoadingBtn(false);
      onClose();
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-950 bg-opacity-50 flex justify-center p-2 items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg md:w-[50%] lg:w-[35%]">
        <h2 className="text-xl mb-4 font-bold">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            type="text"
            placeholder="Username"
            className="border p-2 mb-4"
          />

          <Input
            name="bio"
            type="text"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Update bio"
            className="border p-2 mb-4"
          />

          <Input
            name="email"
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
            className="border p-2 mb-4"
          />

          <Input
            name="profile"
            type="file"
            onChange={handleChange}
            className="border p-2 mb-4"
          />

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {loadingBtn ? (
                <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
