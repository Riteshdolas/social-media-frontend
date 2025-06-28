import { useState } from "react";
import Auth from "../config/auth";
import PopupMessage from "../components/PopupMessage";
import Input from "../components/Input";

function Signup() {
  const [popup, setPopup] = useState({ message: "", type: "", visible: false });

  const showPopup = (message, type) => {
    setPopup({ message, type, visible: true });
    setTimeout(() => {
      setPopup((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const auth = new Auth();
    auth.Signup(formData, showPopup);
    e.target.reset();
  };
  return (
    <div className="relative flex justify-center">
      {popup.visible && (<PopupMessage message={popup.message} className={popup.type === "success" ? "text-green-600" : "text-red-600"} />)}
      <form onSubmit={submitHandler} className="flex flex-col items-center">
        <Input type="text" name="username" placeholder="username" />
        <Input type="text" name="password" placeholder="password" />
        <Input type="text" name="email" placeholder="email" />
        <Input type="text" name="bio" placeholder="bio" />
        <Input type="file" name="profile"/>
        <button type="submit" className="font-bold bg-red-600 text-white p-2 rounded-md w-fit">Sign In</button>
      </form>
    </div>
  );
}

export default Signup;
