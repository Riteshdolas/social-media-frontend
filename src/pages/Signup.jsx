import { useState } from "react";
import Auth from "../config/auth";
import PopupMessage from "../components/PopupMessage";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

function Signup() {
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);

    const formData = new FormData(e.target);
    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();
    const email = formData.get("email")?.trim();
    const bio = formData.get("bio")?.trim();
    const profile = formData.get("profile");

    if (!username || !password || !email || !bio || !profile) {
      showPopup("Please fill in all fields", "error");
      setLoadingBtn(false);
      return;
    }
    const auth = new Auth();
    const result = await auth.Signup(formData);

    if (result.success) {
      setUser(result.user);
      showPopup(result.message, "success");
      navigate("/");
    } else {
      showPopup(result.message, "error");
    }
    setLoadingBtn(false);
    e.target.reset();
  };
  return (
    <div className="relative flex justify-self-center justify-center items-center h-screen w-full">
      {popup.visible && (
        <PopupMessage
          message={popup.message}
          className={
            popup.type === "success" ? "text-green-600" : "text-red-600"
          }
        />
      )}

      <form
        onSubmit={submitHandler}
        className="flex flex-col bg-gray-950 h-[65%] p-5 rounded-md w-[90%]
      md:h-[54%] md:w-[70%] lg:h-[60%] lg:w-[35%] items-center justify-center"
      >
        <h1 className="text-white text-4xl m-2 font-sans">Social Media</h1>
        <Input type="text" name="username" placeholder="username" />
        <Input type="text" name="password" placeholder="password" />
        <Input type="text" name="email" placeholder="email" />
        <Input type="text" name="bio" placeholder="bio" />
        <Input type="file" name="profile" />
        <button
          type="submit"
          disabled={loadingBtn}
          className="font-bold bg-red-600 text-white p-2 m-1 rounded-md w-fit flex items-center justify-center min-w-[80px]"
        >
          {loadingBtn ? (
            <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
          ) : (
            "Sign In"
          )}
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
