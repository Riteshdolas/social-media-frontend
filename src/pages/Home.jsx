import NavigateBtn from "../components/NavigateBtn";

function Home() {
  const isLoggedIn = !!localStorage.getItem("token");
  NavigateBtn;
  return (
    <>
      <div className="text-white text-8xl">Home</div>
      {isLoggedIn ? (
        <NavigateBtn title="Log out" navigateTo="/login" token="token" />
      ) : (
        <>
          <NavigateBtn title="Log in" navigateTo="/login" />
          <NavigateBtn title="Sign up" navigateTo="/signup" />
        </>
      )}
    </>
  );
}

export default Home;
