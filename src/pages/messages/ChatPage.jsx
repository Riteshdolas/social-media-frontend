import { useEffect, useRef, useState } from "react";
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { io } from "socket.io-client";
import Input from "../../components/Input";

export default function ChatPage() {
  const socket = io("https://social-media-backend-725o.onrender.com", {
    transports: ["websocket"],
  });
  const [message, setMessage] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessage((prev) => [...prev, msg]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <>
      <div className="text-white flex flex-col items-center text-center h-[80vh]">
        {message.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>

      <div className="justify-self-center md:mt-10 flex w-full md:w-[50%] justify-center">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="send message"
        />
        <button
          onClick={sendMessage}
          className="text-white rounded-full bg-[#2a2a2c] w-10 flex justify-center items-center"
        >
          <FaArrowUpFromBracket />
        </button>
      </div>
    </>
  );
}
