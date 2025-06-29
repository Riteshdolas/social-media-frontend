import { useState } from "react";
import Input from "../components/Input";
import Auth from "../config/auth";
import PopupMessage from "../components/PopupMessage";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });
  const navigate = useNavigate();
  
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();

    if (!username || !password) {
      showPopup("Please fill in all fields", "error");
      return;
    }
    const authConfig = new Auth();
    const result = await authConfig.Login(userData);
   if (result.success) {
      showPopup(result.message, "success");
      navigate("/");
    } else {
      showPopup(result.message, "error");
    }
  };
  return (
    <div className="relative rounded-md flex justify-center items-center bg-gray-950 h-[20rem] w-[25rem]">
      {popup.visible && (
        <PopupMessage
          message={popup.message}
          className={
            popup.type === "success" ? "text-green-600" : "text-red-600"
          }
        />
      )}
      <form onSubmit={handler} className="flex flex-col items-center">
        <h1 className="text-white text-4xl m-2 font-sans">Social Media</h1>
        <Input type="text" name="username" placeholder="username" />
        <Input type="text" name="password" placeholder="password" />
        <button
          type="submit"
          className="font-bold bg-red-600 text-white m-1 p-2 rounded-md w-fit"
        >
          Login
        </button>
        <p className="text-white m-1 font-sans">
          Don't have and account?{" "}
          <Link to="/signup" className="text-blue-400">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
