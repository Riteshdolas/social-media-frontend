import { Routes, Route } from "react-router"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App
