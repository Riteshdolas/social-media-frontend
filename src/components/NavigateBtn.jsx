import { useNavigate } from "react-router"
import { useUser } from "../context/UserContext"

function NavigateBtn({title, className='', navigateTo, token , ...props }) {
    const navigate = useNavigate()
    const {setUser} = useUser()
    const handler = () => {
        localStorage.removeItem(token)
        setUser(null)
        navigate(navigateTo)
    }
    return <button className={`p-2 bg-red-700 rounded-md text-white ${className}`} onClick={handler}>{title}</button>
}

export default NavigateBtn