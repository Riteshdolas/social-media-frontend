import { useState } from "react";
import Input from "../components/Input";
import Auth from "../config/auth";
import PopupMessage from "../components/PopupMessage";

function Login() {
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };
  const handler = (e) => {
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
    authConfig.Login(userData, showPopup);
  };
  return (
    <div className="relative flex justify-center">
      <form
        onSubmit={handler}
        className="flex flex-col items-center"
      >
        {popup.visible && (
          <PopupMessage
            message={popup.message}
            className={
              popup.type === "success" ? "text-green-600" : "text-red-600"
            }
          />
        )}
        <Input type="text" name="username" placeholder="username" />
        <Input type="text" name="password" placeholder="password" />
        <button
          type="submit"
          className="font-bold bg-red-600 text-white p-2 rounded-md w-fit"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
