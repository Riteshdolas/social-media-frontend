import { useNavigate } from "react-router"

function LogoutBtn() {
    const navigate = useNavigate()
    const handler = () =>{
      localStorage.removeItem("token")
      navigate("/login")
    }
    return <button className="p-2 bg-red-700 text-white" onClick={handler}>Log Out</button>
}

export default LogoutBtn