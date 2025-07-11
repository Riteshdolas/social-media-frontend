import PostCard from "../components/Card";
import Stories from "../components/Stories";
import { usePosts } from "../context/PostContext";
import { useUser } from "../context/UserContext";

function Home() {
  const { allPosts, postLoading } = usePosts();
  
  return (
    <>
      <Stories />
      {postLoading ? (
        <div className="col-span-full flex justify-center items-center py-10">
          <div className="loader border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : allPosts.length === 0 ? (
        <div className="col-span-full text-white text-center text-sm opacity-60">
          No posts yet.
        </div>
      ) : (
        allPosts.map((post) => (
          <PostCard
            key={post._id}
            username={post.user_id.username}
            avatar={post.user_id?.profilePicture ||  "https://i.pinimg.com/736x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg"}
            content={post.caption}
            image={post.post_url}
            time={post.createdAt}
          />
        ))
      )}
    </>
  );
}

export default Home;
