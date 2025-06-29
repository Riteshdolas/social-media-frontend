import { useState } from "react";
import Auth from "../config/auth";
import PopupMessage from "../components/PopupMessage";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });
  const navigate = useNavigate();
  
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();
    const email = formData.get("email")?.trim();
    const bio = formData.get("bio")?.trim();
    const profile = formData.get("profile");

    if (!username || !password || !email || !bio || !profile) {
      showPopup("Please fill in all fields", "error");
      return;
    }
    const auth = new Auth();
    const result = await auth.Signup(formData);
    if (result.success) {
      showPopup(result.message, "success");
      navigate("/");
    } else {
      showPopup(result.message, "error");
    }

    e.target.reset();
  };
  return (
    <div className="relative rounded-md flex justify-center items-center bg-gray-950 h-[25rem] w-[25rem]">
      {popup.visible && (
        <PopupMessage
          message={popup.message}
          className={
            popup.type === "success" ? "text-green-600" : "text-red-600"
          }
        />
      )}

      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <h1 className="text-white text-4xl m-2 font-sans">Social Media</h1>
        <Input type="text" name="username" placeholder="username" />
        <Input type="text" name="password" placeholder="password" />
        <Input type="text" name="email" placeholder="email" />
        <Input type="text" name="bio" placeholder="bio" />
        <Input type="file" name="profile" />
        <button
          type="submit"
          className="font-bold bg-red-600 text-white p-2 m-1 rounded-md w-fit"
        >
          Sign In
        </button>
        <p className="text-white m-1 font-sans">
          Have an account?{" "}
          <Link to="/login" className="text-blue-400">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
