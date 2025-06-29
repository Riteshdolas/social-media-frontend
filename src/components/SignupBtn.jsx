import { useNavigate } from "react-router"

function SignupBtn() {
    const navigate = useNavigate()
    const handler = () => navigate("/signup")
    
    return <button className="p-2 bg-red-700 text-white" onClick={handler}>Sign up</button>
}

export default SignupBtn