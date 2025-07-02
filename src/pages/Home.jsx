import PostCard from "../components/Card";
import MobileNav from "../components/header/MobileNav";
import Sidebar from "../components/header/Nav";
import Stories from "../components/Stories";

function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <Stories />
        <PostCard
          username="Ritesh.dolas.948"
          avatar="https://i.pinimg.com/736x/97/a9/97/97a9973f7ce1a08c162d1f7636965de6.jpg"
          content="never give up"
          image="https://i.pinimg.com/736x/e7/0f/ff/e70fff87c3594a6db712e8763e1bff61.jpg"
          time="2-3-2025"
        />
        <PostCard
          username="Ritesh.dolas.948"
          avatar="https://i.pinimg.com/736x/97/a9/97/97a9973f7ce1a08c162d1f7636965de6.jpg"
          content="never give up"
          image="https://i.pinimg.com/736x/e7/0f/ff/e70fff87c3594a6db712e8763e1bff61.jpg"
          time="2-3-2025"
        />
        <PostCard
          username="Ritesh.dolas.948"
          avatar="https://i.pinimg.com/736x/97/a9/97/97a9973f7ce1a08c162d1f7636965de6.jpg"
          content="never give up"
          image="https://i.pinimg.com/736x/e7/0f/ff/e70fff87c3594a6db712e8763e1bff61.jpg"
          time="2-3-2025"
        />
        <PostCard
          username="Ritesh.dolas.948"
          avatar="https://i.pinimg.com/736x/97/a9/97/97a9973f7ce1a08c162d1f7636965de6.jpg"
          content="never give up"
          image="https://i.pinimg.com/736x/e7/0f/ff/e70fff87c3594a6db712e8763e1bff61.jpg"
          time="2-3-2025"
        />
      </div>
      <MobileNav />
    </div>
  );
}

export default Home;
