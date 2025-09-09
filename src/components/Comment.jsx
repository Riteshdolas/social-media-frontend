export default function UserComment({ profileImage, username, comment }) {
  return (
    <div className="w-full m-1 p-2 flex items-center">
      <div>
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={profileImage || "https://i.pinimg.com/1200x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg"}
          alt="profile"
        />
      </div>
      <div className="flex ml-2 gap-2">
        <p className="font-bold font-inter text-[#f5f5f5]">{username || "username101"}</p>
        <p className="font-rubik font-thin text-[#b0b0b0]">{comment || "this is comment by the user"}</p>
      </div>
    </div>
  );
}
