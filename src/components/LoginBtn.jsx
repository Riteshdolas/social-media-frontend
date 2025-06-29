import { useNavigate } from "react-router"

function LoginBtn() {
    const navigate = useNavigate()
    const handler = () => navigate("/login")
    
    return <button className="p-2 bg-red-700 text-white" onClick={handler}>Log in</button>
}

export default LoginBtn