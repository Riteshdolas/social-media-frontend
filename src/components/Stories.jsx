import React, { useState } from "react";

const otherUsers = [
  { id: 2, name: "Aditi", avatar: "https://randomuser.me/api/portraits/women/21.jpg", storyImage: "https://i.pinimg.com/736x/ce/e0/ac/cee0ac73f77e665b76820e70feacd520.jpg" },
  { id: 3, name: "Ravi", avatar: "https://randomuser.me/api/portraits/men/31.jpg", storyImage: "https://i.pinimg.com/736x/5c/56/32/5c563274dc0d04985d23f7d4ac0905ed.jpg" },
  { id: 4, name: "Sana", avatar: "https://randomuser.me/api/portraits/women/41.jpg", storyImage: "https://i.pinimg.com/736x/78/4a/7e/784a7e1baf0fb1b8f6a0095e82cd2c12.jpg" },
];

const Stories = () => {
  const [yourStory, setYourStory] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formImage, setFormImage] = useState("");
  const [previewStory, setPreviewStory] = useState(null); // { name, image }

  const handleAddStory = () => {
    if (!formImage) return;
    setYourStory({ name: "You", image: formImage });
    setFormImage("");
    setIsAddModalOpen(false);
  };

  return (
    <div className="relative md:justify-self-center md:w-[50%]">
      {/* Story Strip */}
    <div className="flex gap-4 whitespace-nowrap px-4 py-2 border-b overflow-x-auto no-scrollbar">
        {/* Your Story */}
        <div
          onClick={() =>
            yourStory
              ? setPreviewStory({ name: "Your Story", image: yourStory.image })
              : setIsAddModalOpen(true)
          }
          className="flex flex-col items-center min-w-[70px] cursor-pointer"
        >
          <div className="w-16 h-16 rounded-full border-2 border-blue-500 p-[2px]">
            {yourStory ? (
              <img
                src={yourStory.image}
                alt="Your Story"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-2xl text-white">
                +
              </div>
            )}
          </div>
          <span className="text-xs text-white mt-1 text-center">Your Story</span>
        </div>

        {/* Other Users' Stories */}
        {otherUsers.map((user) => (
          <div
            key={user.id}
            className="flex flex-col items-center min-w-[70px] cursor-pointer"
            onClick={() => setPreviewStory({ name: user.name, image: user.storyImage })}
          >
            <div className="w-16 h-16 rounded-full border-2 border-blue-500 p-[2px]">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-xs text-white mt-1 truncate w-16 text-center">
              {user.name}
            </span>
          </div>
        ))}
      </div>

      {/* Add Story Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Add Your Story</h2>
            <input
              type="text"
              placeholder="Image URL"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring"
              value={formImage}
              onChange={(e) => setFormImage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-sm bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddStory}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Preview Modal */}
      {previewStory && (
        <div
          onClick={() => setPreviewStory(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-pointer"
        >
          <div className="bg-white rounded-xl max-w-sm w-full p-4 shadow-xl">
            <h3 className="text-gray-800 font-semibold mb-2 text-center">
              {previewStory.name}
            </h3>
            <img
              src={previewStory.image}
              alt={previewStory.name}
              className="w-full max-h-[70vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;
