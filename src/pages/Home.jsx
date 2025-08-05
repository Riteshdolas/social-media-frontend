import PostCard from "../components/Card";
import Stories from "../components/Stories";
import { usePosts } from "../context/PostContext";
import { useUser } from "../context/UserContext";
import { FaRegHeart } from "react-icons/fa";

function Home() {
  const { allPosts, postLoading } = usePosts();
  const { user } = useUser();
  
  return (
    <>
      <div className="flex md:hidden justify-end text-2xl text-[#b0b0b0]">
        <button className="hover:text-blue-500">
          <FaRegHeart />
        </button>
      </div>
      <Stories />
      {postLoading ? (
        <div className="col-span-full flex justify-center items-center py-10">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="col-span-full text-[#f5f5f5] text-center text-sm opacity-60">
          No posts yet.
        </div>
      ) : (
        allPosts.map((post) => (
          // <PostCard
          //   key={post._id}
          //   username={post.user_id.username}
          //   avatar={
          //     post.user_id?.profilePicture ||
          //     "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"
          //   }
          //   content={post.caption}
          //   image={post.post_url}
          //   time={post.createdAt}
          //   postId={post._id}
          //   likeCount={post.likesCount}
          //   userHasLiked={post.userHasLiked}
          //   likeId={post.likeId} // ✅ new
          //   currentUser={user?._id || null}
          // />
          <PostCard
            key={post._id}
            username={post.user_id.username}
            avatar={
              post.user_id?.profilePicture ||
              "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"
            }
            content={post.caption}
            image={post.post_url}
            time={post.createdAt}
            postId={post._id}
            likeCount={post.likesCount}
            userHasLiked={post.userHasLiked}
            initialLikeId={post.likeId} // ✅ FIXED
            currentUser={user?._id || null}
          />
        ))
      )}
    </>
  );
}

export default Home;
