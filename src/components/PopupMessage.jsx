import { useEffect, useState } from "react";

function PopupMessage({
    message,
    className="",
    ...props
}) {
    const [show, setShow] = useState(false);
 useEffect(() => {
    setShow(true);
  }, []);
 
    return (
        <div className={`${className} w-full h-[3rem] bg-white absolute font-bold text-2xl flex justify-center items-center transition-all duration-500 ease-in-out
        animate-popup ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-x-8"}`}>
            {message || "Something went wrong"}
        </div>
    )
}

export default PopupMessage

