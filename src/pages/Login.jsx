import { useState } from "react";
import Input from "../components/Input";
import Auth from "../config/auth";
import PopupMessage from "../components/PopupMessage";
import { Link, useNavigate } from "react-router-dom";
function Login() {
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);
  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handler = async (e) => {
    e.preventDefault();
    setLoadingBtn(true);
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get("username"),
      password: formData.get("password"),
    };

    const username = formData.get("username")?.trim();
    const password = formData.get("password")?.trim();

    if (!username || !password) {
      showPopup("Please fill in all fields", "error");
      setLoadingBtn(false);
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
    setLoadingBtn(false);
  };
  return (
    <div className="relativ h-screen w-full flex justify-self-center justify-center items-center">
      {popup.visible && (
        <PopupMessage
          message={popup.message}
          className={
            popup.type === "success" ? "text-green-600" : "text-red-600"
          }
        />
      )}
      <form
        onSubmit={handler}
        className="flex bg-gray-950 h-[37%] p-5 rounded-md w-[90%] md:h-[25%] md:w-[50%] lg:h-[45%] lg:w-[30%] flex-col items-center"
      >
        <h1 className="text-white text-4xl m-2 font-sans">Social Media</h1>
        <Input type="text" name="username" placeholder="username" />
        <Input type="text" name="password" placeholder="password" />
        <button
          type="submit"
          disabled={loadingBtn}
          className="font-bold bg-red-600 text-white p-2 m-1 rounded-md w-fit flex items-center justify-center min-w-[80px]"
        >
          {loadingBtn ? (
            <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
          ) : (
            "Log In"
          )}
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
