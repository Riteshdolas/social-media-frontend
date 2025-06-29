import LogoutBtn from "../components/LogoutBtn";
import LoginBtn from "../components/LoginBtn";
import SignupBtn from "../components/SignupBtn";

function Home() {
  const isLoggedIn = !!localStorage.getItem("token");
  return (
    <>
      <div className="text-white text-8xl">Home</div>
      {isLoggedIn ? (
        <LogoutBtn />
      ) : (
        <>
          <LoginBtn />
          <SignupBtn />
        </>
      )}
    </>
  );
}

export default Home;
