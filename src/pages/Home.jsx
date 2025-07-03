import PostCard from "../components/Card";
import Stories from "../components/Stories";

function Home() {
  return (
    <>
        <Stories />
        <PostCard
          username="millie"
          avatar="https://i.pinimg.com/736x/78/a2/a1/78a2a17a4c451597c30ecc900b4d61d5.jpg"
          content="I’m not perfect, but I’m proud of how far I’ve come.💗✨"
          image="https://i.pinimg.com/736x/b2/62/5e/b2625e56e7f5d8d27c74c880f05a7abf.jpg"
          time="2-3-2025"
        />
        <PostCard
          username="sadie sink"
          avatar="https://i.pinimg.com/736x/bf/43/52/bf43520cd3fdac39fcc41509981b553d.jpg"
          content="Catching sunsets and feelings 🌙🍃 just not for people."
          image="https://i.pinimg.com/736x/22/16/4a/22164af833bffcf2ff6a8e49a62973d3.jpg"
          time="2-3-2025"
        />
        <PostCard
          username="sydney sweeney"
          avatar="https://i.pinimg.com/736x/15/69/98/156998af993368d03b74704b4de5de9a.jpg"
          content="Not looking for the spotlight... just glowing on my own terms 🌸💫"
          image="https://i.pinimg.com/736x/c5/4e/7d/c54e7d9a1bf8b58b47f20b96793e345e.jpg"
          time="2-3-2025"
        />
        <PostCard
          username="margot robbie"
          avatar="https://i.pinimg.com/736x/97/28/99/972899f91557f1ecac73937cde8df031.jpg"
          content="I’m learning to be soft with myself... even on the days I don’t feel like blooming 🌸🤍"
          image="https://i.pinimg.com/736x/12/8c/97/128c9793be16830d5830973841ae9ce9.jpg"
          time="2-3-2025"
        />
    </>
  );
}

export default Home;
