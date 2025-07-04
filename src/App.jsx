import { Routes, Route } from "react-router"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Profile from "./pages/Profile"
import Post from "./pages/Post"
import SearchPage from "./pages/SearchPage"
function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Layout/>}>
         <Route index element={<Home />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/post" element={<Post />} />
         <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
